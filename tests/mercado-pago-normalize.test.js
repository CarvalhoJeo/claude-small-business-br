'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { normalizeMercadoPagoCsv, parseMoney, detectDelimiter } = require('../scripts/mercado-pago-normalize');

const fixturePath = path.join(__dirname, 'fixtures', 'mercado-pago-sample.csv');
const fixture = fs.readFileSync(fixturePath, 'utf8');

test('detects semicolon-delimited Mercado Pago exports', () => {
  assert.equal(detectDelimiter(fixture), ';');
});

test('parses BRL money formats reliably', () => {
  assert.equal(parseMoney('R$ 1.234,56'), 1234.56);
  assert.equal(parseMoney('R$ -80,00'), -80);
  assert.equal(parseMoney('300.50'), 300.5);
});

test('normalizes Mercado Pago CSV into finance/customer-support friendly summaries', () => {
  const result = normalizeMercadoPagoCsv(fixture);

  assert.equal(result.source, 'mercado-pago-csv');
  assert.equal(result.records.length, 5);
  assert.deepEqual(result.detectedColumns.sort(), [
    'customer',
    'date',
    'description',
    'externalReference',
    'grossAmount',
    'id',
    'netAmount',
    'paymentMethod',
    'status',
    'type',
    'feeAmount'
  ].sort());

  assert.equal(result.summary.approvedCount, 2);
  assert.equal(result.summary.pendingCount, 1);
  assert.equal(result.summary.refundedCount, 1);
  assert.equal(result.summary.disputedCount, 1);
  assert.equal(result.summary.approvedGrossTotal, 450.5);
  assert.equal(result.summary.approvedNetTotal, 435.2);
  assert.equal(result.summary.pendingGrossTotal, 220);
  assert.equal(result.summary.refundsTotal, 80);
  assert.equal(result.summary.disputesTotal, 99.9);
  assert.equal(result.summary.feesTotal, 15.3);

  assert.deepEqual(result.summary.cashFlowSnapshot, {
    settledNetInflow: 435.2,
    pendingInflow: 220,
    refundsOutflow: 80,
    disputesOutflow: 99.9,
    feesTotal: 15.3
  });

  assert.equal(result.summary.collectionFollowUps.length, 1);
  assert.equal(result.summary.collectionFollowUps[0].customer, 'Carlos Lima');
  assert.equal(result.summary.collectionFollowUps[0].paymentMethod, 'boleto');
  assert.equal(result.summary.collectionFollowUps[0].grossAmount, 220);

  assert.equal(result.summary.customerSignals.length, 2);
  assert.deepEqual(result.summary.customerSignals.map(signal => signal.kind).sort(), ['chargeback', 'refund']);

  assert.equal(result.summary.paymentMethodBreakdown.pix.approvedNetTotal, 145.2);
  assert.equal(result.summary.paymentMethodBreakdown.credit_card.approvedNetTotal, 290);
});
