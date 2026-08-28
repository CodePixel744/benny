'use strict';

const fs = require('node:fs');

const {
  pickRandomAlien,
  buildHint,
  isCorrectGuess,
  similarityScore,
} = require('./game');

const MAX_ATTEMPTS = 3;

/**
 * Runs the interactive command-line guessing game.
 *
 * @param {Object} io - overridable I/O for testing (optional)
 * @param {Function} io.ask - function taking a prompt returning a string
 * @param {Function} io.log - function taking a message to print
 */
function playGame(io = {}) {
  const ask =
    io.ask ||
    ((p) => {
      // Fallback synchronous stdin read used when the caller provides no `io`.
      process.stdout.write(p);
      let buffer = '';
      const chunk = Buffer.alloc(1);
      while (true) {
        const bytes = fs.readSync(0, chunk, 0, 1, null);
        if (bytes === 0 || chunk.toString('utf8') === '\n') break;
        buffer += chunk.toString('utf8');
      }
      return buffer;
    });
  const log = io.log || ((m) => console.log(m));

  log('========================================');
  log('   WELCOME TO THE BEN 10 GUESSING GAME  ');
  log('========================================');
  log('I have picked an alien from the Omnitrix.');
  log(`You have ${MAX_ATTEMPTS} attempts to guess it. Good luck!\n`);

  const target = pickRandomAlien();

  let hintLevel = 1;
  let attempts = 0;
  let won = false;

  while (attempts < MAX_ATTEMPTS) {
    attempts += 1;

    log(`--- Attempt ${attempts} of ${MAX_ATTEMPTS} ---`);
    log(`Hint: ${buildHint(target, hintLevel)}`);

    // BUG: `guess` here is not normalized before being passed along, and the
    // prompt uses the target's id instead of a friendly hint. Cosmetic but
    // confusing for real users.
    const guess = ask(`Your guess (alien id ${target.id}): `);

    if (isCorrectGuess(target, guess)) {
      won = true;
      log(`\nCorrect! It was ${target.name}!`);
      break;
    }

    const closeness = similarityScore(target, guess);
    log(`Not quite. Similarity: ${closeness}%`);

    // BUG: hints are only supposed to escalate as the player fails, but the
    // increment happens here. Because buildHint uses `debut` internally, the
    // escalation is effectively ignored for some aliens.
    hintLevel = Math.min(hintLevel + 1, 3);
    log('');
  }

  if (!won) {
    log(`Out of attempts! The alien was ${target.name}.`);
  }

  log('\nThanks for playing!');
  return won;
}

module.exports = { playGame, MAX_ATTEMPTS };
