# Changelog

All notable changes to this skill. The version lives in `SKILL.md` (`metadata.version`) and follows [semantic versioning](https://semver.org/): a new mode or section is a minor change; renaming modes or changing where the report goes is a major one.

## 2.1.1 — 2026-11-13

- **Licensed under Apache 2.0.** Adds the official `LICENSE` text, a `NOTICE` file with the attribution, the `license: Apache-2.0` field in the `SKILL.md` frontmatter, and a License section in both READMEs. Before, the repository had no license, which legally meant all rights reserved.

## 2.1.0 — 2026-11-13

- **`as-new-spec` now carries the lessons from the current system.** A new "Mistakes this specification prevents" subsection lists every risk and significant defect found, written as a generic pattern (what goes wrong and why), each linked to the requirement that prevents it and an acceptance test that would catch it if it came back. Before, mistakes only became bare requirements, which do not say why they exist and are the first to be relaxed "to go faster". Exact locations in the current code still stay out of the specification and only go in the traceability file, which now links each risk to its generic entry.
- **`as-new-spec` is technology-neutral by default.** The skill can only read the current project, so it no longer aligns with the current stack or picks one on its own. Requirements are written as capabilities, a new "What the chosen stack must support" checklist turns the lessons into criteria to evaluate stacks, and pitfalls of the current stack go to a new "Lessons specific to the current stack" section of the traceability file. Technology is named only when the user gives the target stack in the request; a recommendation, if asked, comes as an open decision comparing candidates.
- **README:** sections 4 to 7 now describe all three modes, like the other sections. Before they only described the modes that differed, so `as-technical` looked missing and the `as-business` part of "Issues to fix" undersold what it covers.
- **Fixed file names for `as-new-spec`:** `<topic>-as-new-spec-as-business.md` and `<topic>-as-new-spec-as-technical.md`. Before, runs varied between `-functional`/`-technical` and `-as-business`/`-as-technical`.

## 2.0.1 — 2026-11-13

- **`as-new-spec` now states the "right, not easy" premise explicitly.** Its design decisions must pick the correct option over the quicker or cheaper one, list that shortcut among the rejected alternatives with the reason, and state the accepted cost plainly. Before, the premise only lived in a general rule worded for the analysis modes, so `as-new-spec` could skip it.

## 2.0.0 — 2026-11-13

- **Renamed to `module-report`** (was `skill-analizar-modulo`) so the name works in any language. It is now invoked as `/module-report` and installed in a `module-report` folder; the repository is `skill-module-report` (GitHub redirects the old URL). This is a breaking change for anyone invoking the skill by its old name or with the old install path.
- The comment added to `.gitignore` now reads `# module-report reports: may contain security findings`.

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
