#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const COLUMN_ALIASES = {
  id: ['id', 'id da operação', 'id da operacao', 'operation_id', 'payment_id'],
  date: ['date', 'data', 'data de criação', 'data de criacao', 'created_at', 'date_created', 'release_date'],
  description: ['description', 'descrição', 'descricao', 'detail', 'details'],
  type: ['type', 'tipo', 'transaction_type'],
  status: ['status', 'situação', 'situacao'],
  grossAmount: ['gross_amount', 'valor bruto', 'amount', 'valor', 'transaction amount', 'transaction_amount'],
  netAmount: ['net_amount', 'valor líquido', 'valor liquido', 'net', 'net received', 'valor recebido'],
  feeAmount: ['fee_amount', 'tarifa', 'taxa', 'fee', 'mercado pago fee'],
  paymentMethod: ['payment_method', 'meio de pagamento', 'medio de pagamento', 'payment method'],
  customer: ['customer', 'buyer', 'comprador', 'pagador'],
  externalReference: ['external_reference', 'external reference', 'referência externa', 'referencia externa', 'pedido', 'order id'],
  installments: ['installments', 'parcelas']
};

function normalizeKey(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

function detectDelimiter(input) {
  const firstLine = input.split(/\r?\n/, 1)[0] || '';
  const delimiters = [',', ';', '\t'];
  let best = ',';
  let bestCount = -1;
  for (const delimiter of delimiters) {
    const count = firstLine.split(delimiter).length;
    if (count > bestCount) {
      best = delimiter;
      bestCount = count;
    }
  }
  return best;
}

function parseCsv(input, delimiter = detectDelimiter(input)) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const next = input[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        field += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && char === delimiter) {
      row.push(field);
      field = '';
      continue;
    }

    if (!inQuotes && (char === '\n' || char === '\r')) {
      if (char === '\r' && next === '\n') i++;
      row.push(field);
      if (row.some(cell => String(cell).trim() !== '')) rows.push(row);
      row = [];
      field = '';
      continue;
    }

    field += char;
  }

  if (field.length || row.length) {
    row.push(field);
    if (row.some(cell => String(cell).trim() !== '')) rows.push(row);
  }

  return rows;
}

function parseMoney(value) {
  if (value == null || value === '') return 0;
  const raw = String(value).trim();
  if (!raw) return 0;

  let normalized = raw
    .replace(/R\$/gi, '')
    .replace(/\s+/g, '')
    .replace(/[^0-9,.-]/g, '');

  if (!normalized) return 0;

  const hasComma = normalized.includes(',');
  const hasDot = normalized.includes('.');

  if (hasComma && hasDot) {
    normalized = normalized.replace(/\./g, '').replace(',', '.');
  } else if (hasComma) {
    normalized = normalized.replace(',', '.');
  }

  const number = Number(normalized);
  return Number.isFinite(number) ? number : 0;
}

function parseDate(value) {
  if (!value) return null;
  const raw = String(value).trim();
  if (!raw) return null;

  const brMatch = raw.match(/^(\d{2})\/(\d{2})\/(\d{4})(?:\s+(\d{2}):(\d{2})(?::(\d{2}))?)?$/);
  if (brMatch) {
    const [, dd, mm, yyyy, hh = '00', min = '00', ss = '00'] = brMatch;
    return new Date(`${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}Z`).toISOString();
  }

  const iso = new Date(raw);
  return Number.isNaN(iso.getTime()) ? null : iso.toISOString();
}

function mapColumns(headers) {
  const index = {};
  const normalizedHeaders = headers.map(normalizeKey);

  for (const [target, aliases] of Object.entries(COLUMN_ALIASES)) {
    const foundIndex = normalizedHeaders.findIndex(header => aliases.includes(header));
    if (foundIndex >= 0) index[target] = foundIndex;
  }

  return index;
}

function getCell(row, indexMap, key) {
  const index = indexMap[key];
  return index == null ? '' : (row[index] || '').trim();
}

function classifyRecord(record) {
  const haystack = [record.type, record.status, record.description].map(normalizeKey).join(' ');
  const isRefund = /refund|refunded|estorno|devolucao|devolução/.test(haystack);
  const isChargeback = /chargeback|charged_back|dispute|contestacao|contestação|mediacao|mediação/.test(haystack);
  const isApproved = /approved|accredited|paid|completed|credited/.test(normalizeKey(record.status));
  const isPending = /pending|in_process|inprocess|waiting|authorized/.test(normalizeKey(record.status));

  return {
    isRefund,
    isChargeback,
    isApproved,
    isPending,
    kind: isChargeback ? 'chargeback' : isRefund ? 'refund' : 'payment'
  };
}

function round2(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function summarize(records) {
  const summary = {
    totalRecords: records.length,
    approvedCount: 0,
    pendingCount: 0,
    refundedCount: 0,
    disputedCount: 0,
    approvedGrossTotal: 0,
    approvedNetTotal: 0,
    pendingGrossTotal: 0,
    refundsTotal: 0,
    disputesTotal: 0,
    feesTotal: 0,
    paymentMethodBreakdown: {},
    collectionFollowUps: [],
    customerSignals: []
  };

  for (const record of records) {
    const classification = classifyRecord(record);
    const method = record.paymentMethod || 'unknown';
    summary.paymentMethodBreakdown[method] ||= { approvedGrossTotal: 0, approvedNetTotal: 0, count: 0 };

    if (classification.isApproved && !classification.isRefund && !classification.isChargeback) {
      summary.approvedCount += 1;
      summary.approvedGrossTotal += record.grossAmount;
      summary.approvedNetTotal += record.netAmount;
      summary.feesTotal += Math.max(0, record.feeAmount);
      summary.paymentMethodBreakdown[method].approvedGrossTotal += record.grossAmount;
      summary.paymentMethodBreakdown[method].approvedNetTotal += record.netAmount;
      summary.paymentMethodBreakdown[method].count += 1;
    }

    if (classification.isPending) {
      summary.pendingCount += 1;
      summary.pendingGrossTotal += record.grossAmount;
      summary.collectionFollowUps.push({
        customer: record.customer || 'unknown',
        externalReference: record.externalReference || null,
        grossAmount: record.grossAmount,
        paymentMethod: record.paymentMethod || null,
        status: record.status || null,
        date: record.date || null,
        description: record.description || null
      });
    }

    if (classification.isRefund) {
      summary.refundedCount += 1;
      summary.refundsTotal += Math.abs(record.netAmount || record.grossAmount);
      summary.customerSignals.push({
        kind: 'refund',
        customer: record.customer || 'unknown',
        externalReference: record.externalReference || null,
        amount: Math.abs(record.netAmount || record.grossAmount),
        status: record.status || null,
        date: record.date || null,
        description: record.description || null
      });
    }

    if (classification.isChargeback) {
      summary.disputedCount += 1;
      summary.disputesTotal += Math.abs(record.netAmount || record.grossAmount);
      summary.customerSignals.push({
        kind: 'chargeback',
        customer: record.customer || 'unknown',
        externalReference: record.externalReference || null,
        amount: Math.abs(record.netAmount || record.grossAmount),
        status: record.status || null,
        date: record.date || null,
        description: record.description || null
      });
    }
  }

  for (const key of ['approvedGrossTotal', 'approvedNetTotal', 'pendingGrossTotal', 'refundsTotal', 'disputesTotal', 'feesTotal']) {
    summary[key] = round2(summary[key]);
  }
  for (const method of Object.keys(summary.paymentMethodBreakdown)) {
    summary.paymentMethodBreakdown[method].approvedGrossTotal = round2(summary.paymentMethodBreakdown[method].approvedGrossTotal);
    summary.paymentMethodBreakdown[method].approvedNetTotal = round2(summary.paymentMethodBreakdown[method].approvedNetTotal);
  }

  summary.cashFlowSnapshot = {
    settledNetInflow: summary.approvedNetTotal,
    pendingInflow: summary.pendingGrossTotal,
    refundsOutflow: summary.refundsTotal,
    disputesOutflow: summary.disputesTotal,
    feesTotal: summary.feesTotal
  };

  return summary;
}

function normalizeMercadoPagoCsv(input) {
  const delimiter = detectDelimiter(input);
  const rows = parseCsv(input, delimiter);
  if (!rows.length) throw new Error('CSV appears to be empty');

  const [headers, ...dataRows] = rows;
  const indexMap = mapColumns(headers);
  const records = dataRows.map((row) => ({
    id: getCell(row, indexMap, 'id') || null,
    date: parseDate(getCell(row, indexMap, 'date')),
    description: getCell(row, indexMap, 'description') || null,
    type: getCell(row, indexMap, 'type') || null,
    status: getCell(row, indexMap, 'status') || null,
    grossAmount: parseMoney(getCell(row, indexMap, 'grossAmount')),
    netAmount: parseMoney(getCell(row, indexMap, 'netAmount')),
    feeAmount: Math.abs(parseMoney(getCell(row, indexMap, 'feeAmount'))),
    paymentMethod: normalizeKey(getCell(row, indexMap, 'paymentMethod')) || null,
    customer: getCell(row, indexMap, 'customer') || null,
    externalReference: getCell(row, indexMap, 'externalReference') || null,
    installments: Number(getCell(row, indexMap, 'installments')) || null
  }));

  return {
    source: 'mercado-pago-csv',
    delimiter,
    detectedColumns: Object.keys(indexMap),
    records,
    summary: summarize(records)
  };
}

function printUsage() {
  const script = path.relative(process.cwd(), __filename);
  console.error(`Usage: node ${script} <mercado-pago-export.csv> [--include-records] [--pretty]`);
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const csvPath = args.find(arg => !arg.startsWith('--'));
  const includeRecords = args.includes('--include-records');
  const pretty = args.includes('--pretty') || true;

  if (!csvPath) {
    printUsage();
    process.exit(1);
  }

  const input = fs.readFileSync(csvPath, 'utf8');
  const result = normalizeMercadoPagoCsv(input);
  const payload = includeRecords ? result : { ...result, records: undefined };
  process.stdout.write(JSON.stringify(payload, null, pretty ? 2 : 0) + '\n');
}

module.exports = {
  normalizeMercadoPagoCsv,
  parseCsv,
  parseMoney,
  parseDate,
  detectDelimiter,
  summarize
};
