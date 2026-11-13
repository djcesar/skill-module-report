# Contributing to module-report

Thanks for wanting to improve module-report! Every report it produces is only as good as its instructions, so bug reports, ideas and pull requests all help.

## Ways to help

- **⭐ Star the repository.** It helps other people find it.
- **Report a problem.** Open an issue with what you asked, what the report did, and what you expected (a report that missed a flaw, a section that came out wrong, a mode chosen incorrectly, mixed languages…). Leave out real code, credentials or personal data from private projects.
- **Suggest an improvement.** Open an issue describing the use case before a large change, so we can agree on the approach.
- **Add a test case.** New cases in `evals/` are one of the most valuable contributions: they keep future changes from breaking what works.
- **Improve a translation.** `docs/es/` and `README.es.md` are Spanish translations; other languages are welcome too.

## How the repository is organized

| Path | What it is |
|---|---|
| `SKILL.md`, `references/` | The instructions the agent reads. **English is the source language.** |
| `docs/es/` | Spanish translation of the instructions, for reading only. |
| `evals/` | Test cases and the fictional sample project with planted flaws. |
| `README.md`, `README.es.md` | Documentation in English and Spanish. |
| `CHANGELOG.md` | Version history. |

## Pull request checklist

1. **Change the English instructions** (`SKILL.md`, `references/`). If the change affects behavior, **update the Spanish translation** in `docs/es/` too, or say in the pull request that it still needs it.
2. **Explain the why, not just the what.** The skill works best when each instruction says why it matters; prefer that over rigid ALWAYS/NEVER rules.
3. **Keep the frontmatter valid:** values quoted, `description` within 1024 characters and without `<` or `>`.
4. **Run the affected test cases** in `evals/` and mention the results. If you change behavior, add or update a case and its graders. Never put the answer key inside `evals/fixtures/club-bookings/`, where the agent can read it.
5. **Update the README** (both languages) if users will notice the change, and add an entry to `CHANGELOG.md` under a new version (a new mode or section is a minor version; renaming modes or changing where reports go is a major one).
6. **Write commit messages in English**, explaining what changed and why.
7. **No real data:** no code, names, credentials, domains or findings from real private projects in examples, tests or issues.

## License

By contributing, you agree that your contributions are licensed under the [Apache License 2.0](LICENSE), the same license as the project.
