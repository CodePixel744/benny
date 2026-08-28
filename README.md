# 💚 benny — a Ben 10 Guessing Game

A simple command-line guessing game where you try to identify the alien hidden
inside the Omnitrix using cryptic hints.

> **Heads up:** This repository is designed as a **playground for learning
> open-source contribution workflows**. It intentionally contains a handful of
> subtle bugs and issues so that contributors can practise the full
> fix → test → PR cycle. See [Issue #1](#) and the
> [`good first issue`](https://github.com/benny/benny/labels/good%20first%20issue)
> label to get started.

## Features

- Guess one of **16 aliens** from across the Ben 10 seasons
- Progression-based textual hints
- Case-insensitive, whitespace-tolerant matching
- A fuzzy "similarity" score for near-misses
- Human-searchable roster (meant to include powers — currently partial!)

## Requirements

- Node.js **18+** (CI tests against 18, 20, and 22)

## Installation

```bash
git clone https://github.com/benny/benny.git
cd benny
npm install
```

## Usage

Run the interactive game:

```bash
npm start
```

Or run it directly:

```bash
node bin/benny.js
```

### Example session

```text
========================================
   WELCOME TO THE BEN 10 GUESSING GAME
========================================
I have picked an alien from the Omnitrix.
You have 3 attempts to guess it. Good luck!

--- Attempt 1 of 3 ---
Hint: This alien is a Pyronite.
Your guess (alien id 5): upgrade
Not quite. Similarity: 33%
...
```

> Note: the prompt currently shows the alien's internal id instead of a useful
> hint. That's a known rough edge — see the issues list.

## Available scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm start`     | Run the interactive game             |
| `npm test`      | Run the test suite (Node test runner)|
| `npm run lint`  | Lint the source with ESLint          |
| `npm run docs`  | Generate JSDoc HTML docs             |

## Project layout

```
benny/
├── bin/benny.js          # CLI entry point
├── src/
│   ├── aliens.js         # Alien roster data
│   ├── game.js           # Core game logic (pure, testable)
│   └── index.js          # Interactive CLI loop
├── test/                 # Node test runner suites
├── docs/                 # Additional documentation
└── .github/workflows/    # CI configuration
```

## Contributing

Please read **[CONTRIBUTING.md](CONTRIBUTING.md)** — it walks you through
forking, branching, commit conventions, testing, and the PR flow.

Looking for a place to start? Check the
[issues](https://github.com/benny/benny/issues) with the
[`good first issue`](https://github.com/benny/benny/labels/good%20first%20issue)
label.

## Code of conduct

Participation is governed by our
[Code of Conduct](CODE_OF_CONDUCT.md). Be kind, be respectful, and have fun.

## License

[MIT](LICENSE) © benny
