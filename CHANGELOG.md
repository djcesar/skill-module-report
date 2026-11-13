# Changelog

All notable changes to this skill. The version lives in `SKILL.md` (`metadata.version`) and follows [semantic versioning](https://semver.org/): a new mode or section is a minor change; renaming modes or changing where the report goes is a major one.

## 1.2.0 — 2026-11-12

- **English is the source language.** `SKILL.md`, the references and the tests are now in English; reports keep following the language of the request (Spanish heading mapping included). A Spanish translation of the instructions is kept in `docs/es/` for reading only.
- **Tests reorganized in English**: `booking-as-technical`, `booking-as-business`, `booking-as-new-spec`, `booking-git-local` and a new `booking-spanish` case that checks a Spanish request produces a fully Spanish report. The sample project moves to `evals/fixtures/club-bookings/` and its answer key to `club-bookings.answer-key.md`.

- **Reports stay out of git unless you say otherwise.** The first time the skill writes a report in a git repository, it asks whether reports should travel with the repo or stay local, because they can contain security findings with exact code locations. Local (recommended) adds `docs/reports/` to `.gitignore`, or to `.git/info/exclude` for this machine only. If reports go to the repo, traceability files are still ignored and it warns before writing security findings into a public repository. It warns when reports were already committed and gives the command to untrack them, but never commits or untracks anything itself. Without a way to ask, it defaults to `.gitignore`.

## 1.1.0 — 2026-11-12

- **Traceability file in `as-new-spec`.** Next to the clean specification it now always writes an internal `<topic>-as-new-spec-traceability.md` that maps every requirement and design decision to its origin (defect it prevents, current case it keeps, missing today, or domain practice) with `file:line` evidence, and records the current system's critical risks and other defects. Before, the reason behind each requirement was not written anywhere and the risks only appeared in the chat, so they were lost when the conversation ended.

## 1.0.0 — 2026-11-12

First version intended to be shared.

- **Report always saved to a file.** The full report goes to `docs/reports/<topic>-<mode>.md` (one file per mode, never overwritten); the chat shows only a 5–8 line summary and the link. Falls back to the chat when the tool cannot write files.
- **Summary section** at the top of every template.
- **Critical findings are verified** before being reported, and labeled *(verified in code)* or *(inferred)*, plus *not tested live*.
- **Security checklist in every mode** (8 fixed points: unauthenticated actions, server-side role and ownership checks, sensitive fields from the client, personal data, guessable IDs/links, secrets, abuse).
- **Mermaid diagrams**: sequence and state diagrams in `as-technical`, user flow in `as-business`, state machine, data model and sequence in `as-new-spec`.
- **Headings follow the user's language**, with an English mapping; mode names are never translated.
- **Parallel investigation** with subagents for large, multi-repo modules, when the tool supports it.
- **Public test suite** in `evals/`, built on a fictional sample project.
- `compatibility` and `metadata.version` in the frontmatter.
- **Frontmatter is now valid for strict YAML parsers** (values are quoted) and the description fits the 1024-character limit of the Agent Skills spec. Before, some tools could reject the skill.

## 0.6.0 — 2026-11-12

- Modes renamed to fixed identifiers: `as-technical`, `as-business`, `as-new-spec` (were "técnica", "negocio", "desde cero"). Reference files renamed to match.
- README in English by default, Spanish in `README.es.md`; tool-neutral wording and a requirements section.
- Skill renamed to `skill-analizar-modulo` (was `analizar-flujo`).

## 0.5.0 — 2026-11-12

- "From scratch" mode (now `as-new-spec`): turns the analysis into a clean baseline specification for a new project, without code references, current bugs or the organization's name.
- Report files named after the request instead of a generic name.

## 0.4.0 — 2026-11-12

- New section 7, "What I would do differently": the right design from the start, with Today / I would do it like this / Why.

## 0.3.0 — 2026-11-11

- The business version now checks backend permissions, so critical risks are not missed when looking only at screens.

## 0.2.0 — 2026-11-11

- Business version (now `as-business`): user stories with acceptance criteria, screens, fields, buttons and messages, without jargon.

## 0.1.0 — 2026-11-11

- First version: technical report with seven sections, built from the actual code.
