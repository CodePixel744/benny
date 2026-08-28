# Benny — Practice Issues

This file records the full back-catalogue of practice issues for **benny**.
Each entry is written like a real GitHub issue. Open them in the GitHub
"New issue" UI and copy the text across. The `good first issue` label is
suggested for the beginner-friendly ones.

The repository contains a number of **intentional bugs**. Fixing each one is a
genuine open-source task: reproduce → fix → add a failing test → PR. Some bugs
are entangled, so read carefully.

---

## Confirmed intentional bugs (map to these issues)

| # | Area | File / line (approx) | Issue |
|---|------|----------------------|-------|
| B1 | `totalPowers` | `src/game.js` | #2 (off-by-one) |
| B2 | `buildHint` | `src/game.js` | #4 (wrong field gates powers) |
| B3 | `searchAliens` | `src/game.js` | #7 (prefix-only search) |
| B4 | `normalizeGuess` | `src/game.js` | #9 (whitespace collapse) |
| B5 | CLI prompt | `src/index.js` | #11 (shows alien id, not a hint) |

Tests that currently fail: `totalPowers counts every power entry`,
`buildHint respects the requested hint level`,
`searchAliens finds aliens by name substring, not only prefix`.

---

## Issue #1 — [Meta] Set up the issue labels (good first issue)

**Type:** meta / contributor onboarding

We want contributors to be able to find beginner-friendly tasks. Add the
standard GitHub labels to this repository:

- `good first issue`
- `help wanted`
- `bug`
- `enhancement`
- `documentation`
- `dependencies`
- `ci`

**Acceptance criteria**
- [ ] The labels above are visible in the repo's label list.
- [ ] Link the labels in `README.md` and `CONTRIBUTING.md`.

---

## Issue #2 — `totalPowers()` over-counts by one (bug, good first issue)

**File:** `src/game.js`

`totalPowers()` is supposed to return the total number of power entries across
the whole roster, but it always reports one more than reality.

**Reproduce**

```bash
npm test
```

The test `totalPowers counts every power entry` fails:

```
35 !== 34
```

**Root cause hint**

Look at the `reduce` — what is the initial accumulator value, and what should it
be? A single-character bug.

**Acceptance criteria**
- [ ] `npm test` passes for the `totalPowers` test.
- [ ] Add or adjust a test that locks in the correct count.

---

## Issue #3 — `buildHint()` should keep aliens' powers secret at hint level 1 (bug, good first issue)

**File:** `src/game.js`

At hint level 1, the player should only learn the alien's **species**. Instead,
some aliens immediately leak their first power.

**Reproduce**

The test `buildHint respects the requested hint level` fails:

```
level 1 revealed a power
```

The example alien in the test is **Way Big** (a season 2 alien).

**Root cause hint**

`buildHint` decides whether to append a power by checking `alien.debut >= 2`
instead of the `hintLevel` argument. Because of this, the escalation logic
downstream is effectively dead.

**Acceptance criteria**
- [ ] Level-1 hints reveal only species.
- [ ] Level-3 hints reveal the full power list.
- [ ] `buildHint respects the requested hint level` passes.

---

## Issue #4 — Unicode / emoji handling in `normalizeGuess()` (bug, good first issue)

**File:** `src/game.js`

`normalizeGuess` uses `/\s/` for whitespace. This works for ASCII spaces but is
inconsistent for other whitespace and control characters, and it can mis-handle
some input.

**Reproduce**

```js
const { normalizeGuess } = require('./src/game');
normalizeGuess('Four\u00a0Arms'); // non-breaking space
```

**Acceptance criteria**
- [ ] Whitespace of any kind is collapsed to a single space.
- [ ] Leading/trailing whitespace is trimmed.
- [ ] Add tests covering tabs (`\t`), newlines (`\n`), and non-breaking spaces
      (`\u00a0`).

---

## Issue #5 — Add a `--hard-mode` flag (enhancement, good first issue)

**Files:** `bin/benny.js`, `src/index.js`, `test/index.test.js`

Add an optional `--hard-mode` flag that reduces `MAX_ATTEMPTS` to 1.

**Behaviour**
- `benny --hard-mode` → one attempt, then reveal.
- `benny` (no flag) → default 3 attempts.

**Acceptance criteria**
- [ ] The flag changes the attempt count.
- [ ] `MAX_ATTEMPTS` stays at 3 by default for the normal path.
- [ ] Tests cover both modes.

---

## Issue #6 — `similarityScore` gives misleading feedback (bug)

**File:** `src/game.js`

The fuzzy score is asymmetric and biased: it only counts characters of the
guess that appear in the target name in order, then divides by the target's
length. Short or partially-matching guesses can score higher than genuinely
closer ones.

**Reproduce**

```js
const { similarityScore } = require('./src/game');
const { ALIENS } = require('./src/aliens');
const a = ALIENS.find((x) => x.name === 'Heatblast');
similarityScore(a, 'has'); // arguably too high vs 'heatb'
```

**Acceptance criteria**
- [ ] The score is symmetric: `score(a->b)` equals `score(b->a)`.
- [ ] The score is bounded 0–100.
- [ ] Long, correct substrings score higher than short coincidental matches.
- [ ] Tests cover symmetry and ordering.

---

## Issue #7 — Searching by a power doesn't work (bug, good first issue)

**File:** `src/game.js`

`searchAliens` is documented as able to find aliens by name *or* species, but
the implementation only matches a **prefix**. Searching for a word that appears
mid-name — or that is a power — finds nothing.

**Reproduce**

The test `searchAliens finds aliens by name substring, not only prefix` fails.

**Root cause hint**

`.startsWith(q)` only matches at index 0. A substring match (`includes`) is
needed, and "powers" should also be searchable per the documentation.

**Acceptance criteria**
- [ ] Searching `arms` finds `Four Arms`.
- [ ] Searching a power like `flight` returns all aliens that can fly.
- [ ] Tests cover mid-word matches.

---

## Issue #8 — Add a README "quick start" GIF or ASCII demo (docs, good first issue)

**File:** `README.md`

The README would benefit from a visual demo of the game. Add a short ASCII
art demo or a recorded GIF in the "Usage" section.

**Acceptance criteria**
- [ ] A visual demo is present in the README.
- [ ] The demo reflects current CLI output.

---

## Issue #9 — `normalizeGuess` doesn't collapse repeated whitespace (bug, good first issue)

**File:** `src/game.js`

`normalizeGuess` should turn any run of whitespace into a single space.
Currently `'Four   Arms'` (three spaces) does **not** become `'four arms'`.

**Reproduce**

The test `normalizeGuess collapses whitespace and normalizes hyphens` fails:

```js
assert.strictEqual(game.normalizeGuess('  Four   Arms  '), 'four arms');
```

**Root cause hint**

The regex `/\s+/` is correct, but note the code uses `.replace(/\s+/, ...)`
**without the global flag**, replacing only the first occurrence.

**Acceptance criteria**
- [ ] Arbitrary runs of whitespace collapse to one space.
- [ ] Existing hyphen and trim behaviour is preserved.

---

## Issue #10 — Add a high-score / scoreboard (enhancement, help wanted)

Store the player's best results (fewest attempts) in a JSON file and print a
scoreboard.

**Acceptance criteria**
- [ ] Results persist between runs.
- [ ] A `--scoreboard` flag prints stored results.
- [ ] Tests cover the persistence layer.

---

## Issue #11 — CLI prompt leaks the alien's internal id (bug, good first issue)

**File:** `src/index.js`

The guess prompt currently prints `(alien id 5)` instead of a useful hint.
Internal ids are meaningless to players and make the game trivial or confusing.

**Reproduce**

Run `npm start` and look at the prompt line.

**Acceptance criteria**
- [ ] The prompt does not expose internal ids.
- [ ] The prompt gives a player-friendly instruction.
- [ ] Update the README example session to match.

---

## Issue #12 — Ensure hint escalation actually escalates (bug, help wanted)

**File:** `src/game.js`, `src/index.js`

The game increases `hintLevel` each failed attempt, but because `buildHint`
gates powers on `alien.debut` (see issue #3), the escalation is dead for many
aliens. After fixing #3, verify that hints actually *do* escalate across
attempts and add a test proving it.

**Acceptance criteria**
- [ ] Hints grow more specific with each failed attempt for all aliens.
- [ ] A test simulates several attempts and asserts increasing hint detail.

---

## Issue #13 — Add CI status badge to README (CI, good first issue)

**File:** `README.md`

Add a GitHub Actions status badge for the `CI` workflow to the top of the
README.

**Acceptance criteria**
- [ ] A badge appears that reflects the current run status.

---

## Issue #14 — `isCorrectGuess` should accept abbreviations (enhancement, help wanted)

**File:** `src/game.js`

Allow common abbreviations: e.g. `XLR8` should match `XLR8`, and `Four Arms`
should match `four arms` (already works) — but also consider matching without
hyphens and trimming. The real goal is a robust, documented matching rule.

**Acceptance criteria**
- [ ] Document the matching rule in the function's JSDoc.
- [ ] Cover edge cases with tests.

---

## Issue #15 — Refactor `game.js` into smaller modules (refactor, help wanted)

**Files:** `src/`

`src/game.js` mixes several responsibilities (random picking, hints, matching,
similarity, search, counting). Split into focused modules (e.g. `hints.js`,
`matching.js`, `search.js`) without changing public behaviour.

**Acceptance criteria**
- [ ] Public exports behave identically (all tests pass).
- [ ] Each new module has a single responsibility.
- [ ] Lint passes.

---

## Issue #16 — Ignore OS-specific lockfiles / normalize `.gitignore` (chore, good first issue)

**File:** `.gitignore`

Ensure `.gitignore` covers common tooling artifacts (coverage, editor
directories, OS cruft) and doesn't accidentally ignore meaningful files.

**Acceptance criteria**
- [ ] `.gitignore` covers common editor/OS/tool artifacts.
- [ ] No intended project files are excluded.
