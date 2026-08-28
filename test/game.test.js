'use strict';

const test = require('node:test');
const assert = require('node:assert');

const game = require('../src/game');
const ALIENS = require('../src/aliens');

test('roster contains exactly 16 aliens', () => {
  assert.strictEqual(ALIENS.length, 16);
});

test('every alien has unique id and non-empty name', () => {
  const ids = new Set(ALIENS.map((a) => a.id));
  assert.strictEqual(ids.size, ALIENS.length);
  for (const alien of ALIENS) {
    assert.ok(alien.name.length > 0);
  }
});

test('totalPowers counts every power entry', () => {
  const expected = ALIENS.reduce((acc, a) => acc + a.powers.length, 0);
  assert.strictEqual(game.totalPowers(), expected);
});

test('pickRandomAlien returns a valid alien from the pool', () => {
  const alien = game.pickRandomAlien(ALIENS.slice(0, 5));
  assert.ok(ALIENS.slice(0, 5).includes(alien));
});

test('pickRandomAlien throws on an empty pool', () => {
  assert.throws(() => game.pickRandomAlien([]), /empty pool/);
});

test('pickRandomAlien never returns an out-of-range alien (deterministic stub)', () => {
  const original = Math.random;
  try {
    // Force Math.random to return the maximum possible 0.999...
    Math.random = () => 0.9999999999999999;
    for (let i = 0; i < 100; i++) {
      const alien = game.pickRandomAlien(ALIENS.slice(0, 10));
      assert.ok(ALIENS.slice(0, 10).includes(alien), 'returned out-of-range alien');
    }
  } finally {
    Math.random = original;
  }
});

test('normalizeGuess collapses whitespace and normalizes hyphens', () => {
  assert.strictEqual(game.normalizeGuess('  Four   Arms  '), 'four arms');
  assert.strictEqual(game.normalizeGuess('Four-Arms'), 'four arms');
  assert.strictEqual(game.normalizeGuess('  xlr8  '), 'xlr8');
});

test('isCorrectGuess matches case-insensitively', () => {
  const alien = ALIENS.find((a) => a.name === 'Four Arms');
  assert.ok(game.isCorrectGuess(alien, 'FOUR ARMS'));
  assert.ok(game.isCorrectGuess(alien, 'four  arms'));
});

test('isCorrectGuess returns false for different alien', () => {
  const alien = ALIENS.find((a) => a.name === 'Heatblast');
  assert.strictEqual(game.isCorrectGuess(alien, 'wildmutt'), false);
});

test('buildHint respects the requested hint level', () => {
  const waybig = ALIENS.find((a) => a.name === 'Way Big');

  // level 1 should only reveal species
  const level1 = game.buildHint(waybig, 1);
  assert.ok(level1.includes(waybig.species));
  // the debut bug means powers leak in at level 1 for season >= 2 aliens
  assert.ok(!level1.includes(waybig.powers[0]), 'level 1 revealed a power');

  // full hints at level 3 should include all powers
  const level3 = game.buildHint(waybig, 3);
  for (const power of waybig.powers) {
    assert.ok(level3.includes(power), `missing power: ${power}`);
  }
});

test('similarityScore is 100 for exact match', () => {
  const alien = ALIENS.find((a) => a.name === 'Heatblast');
  assert.strictEqual(game.similarityScore(alien, 'heatblast'), 100);
});

test('similarityScore is symmetric and reasonable for partial guesses', () => {
  const alien = ALIENS.find((a) => a.name === 'Diamondhead');
  const s1 = game.similarityScore(alien, 'diamond');
  const s2 = game.similarityScore(alien, 'diamondhead');
  assert.ok(s1 >= 0 && s1 <= 100);
  assert.strictEqual(s2, 100);
});

test('searchAliens finds aliens by name substring, not only prefix', () => {
  // searching "ar" should find both Four Arms and Cannonb... actually
  // "ar" appears mid-name in several; the bug restricts to prefix
  const results = game.searchAliens('arms');
  assert.ok(results.some((a) => a.name === 'Four Arms'));
});

test('searchAliens with empty query returns entire roster', () => {
  assert.strictEqual(game.searchAliens('').length, ALIENS.length);
});
