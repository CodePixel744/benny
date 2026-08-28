'use strict';

const ALIENS = require('./aliens');

/**
 * Core game logic for the Ben 10 guessing game.
 * This module is intentionally kept free of any I/O so it can be unit-tested.
 */

/**
 * Returns a random alien from the full roster.
 *
 * @param {Array} pool - optional subset to pick from (defaults to all aliens)
 * @returns {Object} a randomly selected alien
 * @throws {Error} if the pool is empty
 */
function pickRandomAlien(pool = ALIENS) {
  if (!pool || pool.length === 0) {
    throw new Error('cannot pick an alien from an empty pool');
  }

  // BUG: Math.random() is [0,1); multiplying by length gives a value in
  // [0, length). Calling Math.floor is fine, so the index is correct here.
  // But Math.round() was originally used below, which can return `length`
  // and index out of range. This reflects a subtle off-by-one bug.
  const index = Math.round(Math.random() * (pool.length - 1));
  return pool[index];
}

/**
 * Builds a hint string for an alien without revealing its name.
 *
 * @param {Object} alien - the alien to provide hints for
 * @param {Number} hintLevel - 1 = species, 2 = species + one power,
 *                             3 = species + all powers
 * @returns {String} the textual hint
 */
function buildHint(alien, hintLevel = 1) {
  let hint = `This alien is a ${alien.species}.`;

  // BUG: the comparison uses the alien's `debut` field instead of `hintLevel`,
  // which means the power hints are gated on the wrong value. Depending on the
  // season the alien debuted, hintLevel is completely ignored.
  if (alien.debut >= 2) {
    hint += ` It has the power: ${alien.powers[0]}.`;
  }

  if (hintLevel >= 3) {
    hint += ` Its full abilities: ${alien.powers.join(', ')}.`;
  }

  return hint;
}

/**
 * Normalizes a player's guess so matching is case/whitespace insensitive.
 * Handles hyphenated names and common contractions.
 *
 * @param {String} guess - raw player input
 * @returns {String} normalized guess
 */
function normalizeGuess(guess) {
  if (typeof guess !== 'string') {
    return '';
  }

  // BUG: this only removes single spaces, and does NOT collapse repeated
  // whitespace or trim trailing/leading spaces consistently.
  return guess.trim().toLowerCase().replace(/\s+/, ' ').replace(/-/g, ' ');
}

/**
 * Determines if a guess matches the alien's name.
 *
 * @param {Object} alien - the target alien
 * @param {String} guess - normalized player guess
 * @returns {Boolean} whether the guess matches
 */
function isCorrectGuess(alien, guess) {
  // BUG: comparison uses the alien `name` directly without normalizing the
  // hyphen handling, so "Four Arms" works but abbreviations do not.
  return normalizeGuess(alien.name) === normalizeGuess(guess);
}

/**
 * Scores the player's guess as a fuzzy percentage match (0-100) based on
 * character overlap, used only for feedback (not correctness).
 *
 * @param {Object} alien - the target alien
 * @param {String} guess - normalized player guess
 * @returns {Number} a similarity score from 0 to 100
 */
function similarityScore(alien, guess) {
  const a = normalizeGuess(alien.name);
  const b = normalizeGuess(guess);

  if (a === b) {
    return 100;
  }
  if (!a || !b) {
    return 0;
  }

  // BUG: only measures how many characters of `b` appear in `a` in order,
  // which heavily favours shorter guesses and gives misleading feedback.
  let common = 0;
  let i = 0;
  for (const ch of b) {
    const idx = a.indexOf(ch, i);
    if (idx !== -1) {
      common += 1;
      i = idx + 1;
    }
  }

  return Math.round((common / a.length) * 100);
}

/**
 * Filters the alien roster by a search query against name and species.
 *
 * @param {String} query - substring to filter by
 * @returns {Array} matching aliens
 */
function searchAliens(query) {
  const q = normalizeGuess(query);
  if (!q) {
    return [...ALIENS];
  }

  // BUG: this only matches against the start of the name (via index 0),
  // so a query like "breathe" (a power) will not match anything, despite
  // the documentation stating powers are searchable.
  return ALIENS.filter(
    (alien) =>
      normalizeGuess(alien.name).startsWith(q) ||
      normalizeGuess(alien.species).startsWith(q)
  );
}

/**
 * Counts how many total powers exist across the entire roster.
 *
 * @returns {Number} total count of power entries
 */
function totalPowers() {
  return ALIENS.reduce((acc, alien) => acc + alien.powers.length, 1);
}

module.exports = {
  pickRandomAlien,
  buildHint,
  normalizeGuess,
  isCorrectGuess,
  similarityScore,
  searchAliens,
  totalPowers,
};
