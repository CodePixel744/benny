# Contributing to benny

Welcome! This project exists specifically as a *learning playground* for
practising real-world open-source contribution workflows. Whether you are a
first-timer or a veteran, your help is appreciated.

Please take a moment to read the sections below. By participating you agree to
abide by the [Code of Conduct](CODE_OF_CONDUCT.md).

## Table of contents

- [How to contribute](#how-to-contribute)
- [Getting started](#getting-started)
- [Finding something to work on](#finding-something-to-work-on)
- [Branches & workflow](#branches--workflow)
- [Commit message conventions](#commit-message-conventions)
- [Style guide](#style-guide)
- [Testing](#testing)
- [Opening a pull request](#opening-a-pull-request)
- [Review process](#review-process)
- [Getting help](#getting-help)

## How to contribute

1. Fork the repository.
2. Clone your fork and add the upstream remote.
3. Create a feature branch.
4. Make your changes.
5. Add or update tests.
6. Run lint and all tests locally.
7. Push and open a pull request.
8. Respond to review feedback.

## Getting started

```bash
# 1. Fork on GitHub, then:
git clone https://github.com/<your-name>/benny.git
cd benny
git remote add upstream https://github.com/benny/benny.git

# 2. Install dependencies
npm install

# 3. Run the game
npm start

# 4. Run tests and lint
npm test
npm run lint
```

> **Note:** This repo uses Node 18+. If you are behind, the CI matrix runs
> 18/20/22 and will flag issues.

## Finding something to work on

Start with the [`good first issue`](https://github.com/benny/benny/labels/good%20first%20issue)
and [`help wanted`](https://github.com/benny/benny/labels/help%20wanted) labels.

- **`good first issue`** — small, well-scoped, low-risk. Great for first PRs.
- **`help wanted`** — larger or more nuanced, good when you have a bit of
  experience.
- **`bug`** — something is broken; the issue should include reproduction steps.
- **`enhancement`** — a new feature or improvement.

Always comment on the issue that you intend to pick it up so nobody ends up
working on the same thing. If you take it, assign yourself (or ask a
maintainer to).

### A note on "gotcha" issues

Some issues describe subtle bugs that are entangled (fixing one may break
another or reveal a test that was "wrong"). Read the issue carefully, run the
tests, and if the fix invalidates an existing test, explain *why* in your PR
description — don't just delete the test silently.

## Branches & workflow

- Never commit directly to `main`.
- Create short, descriptive branch names: `fix/total-powers-off-by-one`,
  `feature/add-scoreboard`, `docs/expand-contributing`.
- Keep branches focused on a single issue. One issue → one branch → one PR.
- Rebase frequently against `upstream/main` to avoid conflicts.

```bash
git fetch upstream
git checkout -b fix/my-branch upstream/main
```

## Commit message conventions

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

- `type`: `fix`, `feat`, `docs`, `test`, `refactor`, `chore`, `style`, `ci`.
- `scope`: optional, e.g. `game`, `aliens`, `cli`, `ci`.
- Always write the description in the **imperative** ("fix bug", not "fixed
  bug").
- Keep the first line under 72 characters.
- Reference the issue in the body: `Closes #12`.

Examples:

```
fix(game): correct totalPowers count off-by-one

The reduce started the accumulator at 1 instead of 0, over-counting by 1.

Closes #12
```

```
feat(cli): add a --hard-mode flag
```

## Style guide

We use [ESLint](https://eslint.org/) with the config in `eslint.config.js`.

- 2-space indentation.
- Single quotes for strings.
- Semicolons required.
- CommonJS (`require`/`module.exports`), not ES modules.
- Aim for clear, self-documenting code. Prefer small, focused functions over
  long ones.
- Document exported functions with JSDoc.

```bash
npm run lint
```

## Testing

We use the built-in Node test runner:

```bash
npm test   # runs node --test
```

- New behaviour must ship with tests.
- Bug fixes must add a test that fails on the old code and passes on the fix.
- Keep tests deterministic: avoid relying on randomness where possible.

## Opening a pull request

1. Push your branch to your fork: `git push -u origin my-branch`.
2. Open a PR against `benny:main` from your fork.
3. Give it a clear title matching your single concern.
4. In the description:
   - Link the issue it resolves (`Closes #12`).
   - Summarise what you changed and why.
   - Note any tests you added/changed and the results.
5. Make sure CI passes (lint + test across the Node matrix).

### PR checklist

Before submitting, confirm:

- [ ] Tests pass locally (`npm test`).
- [ ] Lint passes locally (`npm run lint`).
- [ ] New code is covered by tests.
- [ ] No unrelated changes are bundled in.

## Review process

- Maintainers will review promptly but may be busy — be patient.
- Address review comments by pushing new commits; do **not** squash during
  review (it makes diffs hard to follow).
- If a reviewer requests changes, treat it as collaborative, not criticism.
- After approval your PR may be squashed and merged by a maintainer.

## Getting help

- Open a discussion for non-code questions.
- Tag a maintainer in a PR/issue if stuck.
- Refer to the [GitHub docs](https://docs.github.com/en/get-started) for help
  with forking, PRs, and git.

Thank you for contributing!
