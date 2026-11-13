---
name: module-report
description: 'Analysis report on a flow, module, function, endpoint, screen or process of the current project, built from the real code, with eight sections (description, use cases, required features, things to keep in mind, issues to fix, nice to have, what I would do differently, related). Three combinable modes - as-technical (for whoever changes the code), as-business (user stories, screens, fields and messages, no jargon) and as-new-spec (clean specification to rebuild it in a new project). Use it whenever someone asks to explain, analyze, document or audit how something works, even without saying report - walk me through the X flow, analyze module Y, overview before changing it, what is missing, what you would change, user stories for X, in business terms or for the PO, what buttons and fields it has, X from scratch or as baseline docs for a new project, or a mode by name. Also in Spanish (cómo funciona el flujo de X, analízame el módulo Y, historias de usuario, en forma de negocio, desde cero, documentación base).'
compatibility: 'Requires an agent with read access to the repository (search and open files). Recommended - write access to docs/reports/, read-only commands (git log) and subagents for large modules.'
metadata:
  version: "2.1.0"
---

# Analyze module

The goal is that whoever asked ends up understanding **what it is, how it works, what it lacks and what it touches**, without having to read the code. That is why the report is built from the project's actual code, not from assumptions: every important claim should be traceable to a file. (In `as-new-spec` the code is used the same way to understand the domain, but the final document does not cite it.)

This is a reading job. Do not modify code, run migrations or deploy anything; if something deserves fixing, it goes in "Issues to fix". The only things you write are the report files and, the first time in a project, the `.gitignore` rule if the user chooses it (see step 4).

## 0. Choose the mode

There are three modes. Their names are fixed identifiers: use them as they are in any language, never translated.

- **`as-technical`** → [references/as-technical.md](references/as-technical.md). For whoever will build or change the code: files, services, data, configuration, technical debt.
- **`as-business`** → [references/as-business.md](references/as-business.md). For product, business, QA, support or the client: user stories, screens, buttons, fields, messages and rules; technical details only when critical, described by their impact.
- **`as-new-spec`** → also read [references/as-new-spec.md](references/as-new-spec.md). It is no longer a report on how the system is: it is the specification to build it right in a clean project. "What I would do differently" becomes the design, defects become requirements that prevent them, and the document has no references to the current code or the organization's name. It combines with `as-technical` or `as-business`, which give the content of each section; `as-new-spec` says how to transform it. If the user does not say which, deliver both.

Choose like this:
- If the user names one or more modes (`as-business`, `as-technical as-business`…), use exactly those.
- Otherwise, infer from how they asked:
  - `as-business` if they mention business, functional, user stories, acceptance criteria, product/PO/client/QA, "no technical details", "buttons and fields", "how the user uses it".
  - `as-new-spec` if they ask "from scratch", "as if it were new", "for a new project", "specification", "baseline documentation" or "how it should be built".
  - `as-technical` if they mention code, implementation, "I'm going to change/refactor it", or give no hint.
- If they ask for technical and business, deliver `as-business` first and then `as-technical`, as two separate reports.
- In `as-new-spec`, if the request names the target stack ("as-new-spec for Go and PostgreSQL"), use it; otherwise the specification stays technology-neutral (see its reference).

Read the matching reference before writing; it has the template and how to fill it.

## 1. Locate the target

Interpret the request (it may come as a business name — "the password reset" — or a technical one — `UsersService.update`). Search the code for names, routes, UI texts, table names and synonyms in both languages (e.g. "afiliación", "affiliation", "affiliate").

- If there are several candidates and one is clearly the most likely, take it and say so in the scope line.
- Ask only if the ambiguity completely changes the analysis (two different modules with the same name).
- If it does not exist, say so and propose the closest thing you found.

## 2. Investigate

Follow the flow end to end instead of reading loose files. In general:

1. **Entry points**: routes/controllers, screens or components, commands, jobs/cron, triggers, queue consumers, webhooks.
2. **Logic**: services, helpers, validations (DTOs, pipes, guards, schemas), business rules, error handling.
3. **Data**: entities/models, tables, collections, migrations, what is read and what is written.
4. **Integrations**: external APIs, storage, email/SMS, queues, other databases.
5. **Configuration**: environment variables, flags, secrets it needs, differences between environments.
6. **Permissions**: who can run it (roles, guards, security rules).
7. **Context**: existing tests, README, AGENTS.md/CLAUDE.md or other agent notes, docs, TODO/FIXME/HACK comments, and if there is git, recent `git log` of the key files (it helps understand why things are the way they are).

In `as-business` the weight shifts to the frontends (templates, texts, form validations, messages); the backend is used to confirm rules, communications and risks. Its reference says what to look for.

If the working directory contains several sibling repositories (e.g. a backend and its frontends), search them too: the backend endpoint usually has a screen that calls it, and that is part of the flow and of "Related".

If the project has previous notes or memory on the topic, use them as hints, but confirm them against the code: they may be outdated.

### Risk review (in every mode)

Always run this list over the flow's actions, even when the mode is `as-business` or `as-new-spec` and the focus is on screens or design. These are the risks that do the most damage and the ones most often missed when looking only at screens or only at the happy path, because a screen that hides a button does not stop the system from accepting the action.

1. **Unauthenticated actions**: which routes, functions or rules can run without signing in? If it is intentional (sign-up, password recovery), what does it expose or allow?
2. **Server-side role authorization**: does the backend check the role, or only the UI?
3. **Record-ownership authorization**: can someone see or change another person's record by changing an id in the URL or the body?
4. **Sensitive fields from the client**: does it accept role, status, approval, owner, prices or other fields the client should not set? (mass assignment, validation that does not strip extra fields).
5. **Exposed personal data**: in responses, logs, URLs, PDFs, or error messages that reveal whether a person exists.
6. **Guessable identifiers and links**: sequential ids as the only protection, links or tokens that never expire or can be reused.
7. **Secrets**: keys or credentials in the code, in the client or in the repository.
8. **Abuse and cost**: emails/SMS, file uploads or heavy processes that can be triggered without limit.

How each risk is reported depends on the mode: in `as-technical` with its mechanism and evidence; in `as-business` by its impact; in `as-new-spec` as a requirement that prevents it (RNF-SEC) plus a generic entry in "Mistakes this specification prevents" with its acceptance test, and, if it exists in the current system, with its exact location in the traceability file. If a point does not apply to the flow, do not mention it.

### Split the investigation (if your tool allows it)

A full module across several repositories can take many minutes if you walk it alone. If your tool can delegate to subagents and the target spans two or more repositories or large components, split the exploration: one subagent per repository or component (e.g. API, web portal, mobile app), all at once.

- Give each one a concrete brief: which flow to follow, what to look for (entry points, validations, data, permissions, screen texts depending on the mode), and to return **facts with `file:line`**, not prose or conclusions.
- Include the risk review in the backend brief.
- You merge the results, connect the repositories (which screen calls which endpoint), **verify every 🔴 yourself** (see step 3) and write the report. Verification and writing are not delegated: they are what give the report coherence and trustworthiness.

For a function or a small flow, do it yourself: splitting costs more than it saves.

Scale the depth to the size of the target: a function needs a few files; a full module needs its main entry points walked. If something was left out (because of size or because it lives in another system you cannot see), say so in the scope instead of filling the gap.

## 3. Separate fact from inference

The report is only as useful as it is trustworthy. What you saw in the code is stated; what is deduced (business intent, production behavior, real usage) is marked "(inferred)" or "probably". Do not invent use cases, fields, messages or requirements the code does not support.

**Verify every 🔴 finding before writing it.** A false high-severity risk discredits the whole report, and a false security one can make someone act in vain or in alarm. Before reporting it, reopen the exact code and confirm the whole chain, not just one piece. For example, a route being public is not enough: confirm the decorator applies to that route (and not the one next to it), that there is no other protection further on (a global guard, a middleware, a database rule), and that the dangerous field really reaches the write.

Label each 🔴 with its certainty:
- **(verified in code)**: you confirmed the whole chain by reading the code.
- **(inferred)**: you deduce it, but a piece you could not see is missing (another system, production configuration).

And unless you ran it, add **"not tested live"**: reading the code is not the same as reproducing it. If after checking it does not hold, lower its severity or turn it into a question in "Issues to fix".

## 4. Deliver the report

**Write the report in the user's language**: the language they wrote the request in. The templates are in English; if the report goes in another language, translate **every** heading and label so nothing is left mixed. Mode names (`as-technical`, `as-business`, `as-new-spec`) are never translated. In Spanish use these:

| English | Español |
|---|---|
| Scope / Summary | Alcance / Resumen |
| Description | Descripción |
| Use cases | Casos de uso |
| Required features | Features o características requeridas |
| Things to keep in mind | Cosas importantes a tener en cuenta |
| Issues to fix | Cosas a resolver |
| Nice to have | Cosas que sería bueno incluir |
| What I would do differently (Today / I would do it like this / Why) | Qué haría diferente (Hoy / Lo haría así / Por qué) |
| Related | Relacionados |
| As a… I want… so that… / Given… when… then… | Como… quiero… para… / Dado… cuando… entonces… |
| (verified in code) / (inferred) / not tested live | (verificado en código) / (inferido) / no probado en vivo |
| Traceability | Trazabilidad |

For any other language, translate with the same criteria. The title must name what was requested and the mode (e.g. "Membership and members — as-business"), so it can be recognized among several.

**The full report always goes to a file; the chat gets only the summary.** Reports on a full module easily exceed 300 lines: in the chat they get cut off, cannot be shared and are lost. In a file they read well, can be versioned and compared over time.

- **Where:** `docs/reports/` at the root of the working directory (create it if missing). If the working directory groups several sibling repositories, it goes in that common root, not inside one of them.
- **Name:** `<topic>-<mode>.md` in lowercase with hyphens, using the user's own words (e.g. `membership-as-new-spec.md`, `reset-contrasena-as-business.md`); never a generic name like `report.md`. If several modes were requested, one file per mode. `as-new-spec` uses the mode it is combined with as a suffix (`<topic>-as-new-spec-as-business.md`, `<topic>-as-new-spec-as-technical.md`; both when it goes alone) and always adds `<topic>-as-new-spec-traceability.md` (see its reference).
- **If a file with that name already exists**, do not overwrite it: it is the previous report and is useful for comparison. Use `<topic>-<mode>-YYYY-MM-DD.md`.
- **Do not commit** the file; say it was created and that committing is the user's call. Before creating the folder for the first time, see the next section.
- **If you cannot write files** (tool without write access, chat without a file system), deliver the full report in the chat, as the only exception.

### First report in a project: repo or local only?

Reports can contain security findings with their exact location in the code ("this endpoint is public and lets anyone change the role, `file:line`"). In a public repository that is a guide to attacking the system, and even in a private one not everyone with access should see it. That is why the decision is made once per project, before writing the first report, and the user makes it.

**When to ask:** only if `docs/reports/` does not exist yet **and** the folder where it would go is inside a git repository. If the folder already exists, the decision was already made: respect it and do not ask again. If there is no git repository (e.g. a folder grouping sibling repositories), there is nothing to version and you do not ask.

**What to ask**, before creating the folder, with these options and the first one as recommended:
1. **Local only, for the whole team** (recommended): add `docs/reports/` to the repository's `.gitignore`. It also protects whoever clones the repository, but it changes a versioned file: say it needs to be committed.
2. **Local only, this machine only**: add `docs/reports/` to `.git/info/exclude`. It touches nothing versioned, but does not protect others.
3. **Keep them in the repository**: reports can be committed like any other document.

If the tool cannot ask questions (e.g. an automated run), apply option 1 and say so in the chat.

**When adding the rule**, add a comment explaining why (`# module-report reports: may contain security findings`). If the file does not exist, create it. Never delete or reorder what is already there.

**If the user chose to keep them in the repository**, keep two protections:
- `as-new-spec` traceability files always contain paths into the current code and its risks: add `docs/reports/*-traceability.md` to `.gitignore` anyway, and say so.
- If you can tell the repository is **public** (with the platform's CLI or the remote's configuration) and the report has 🔴 security findings, warn before writing it and offer to keep that report out of the repository.

**If reports were already committed** (`git ls-files docs/reports` returns something) and the user chose to keep them local, `.gitignore` does not remove them from the repository: say so and give the command (`git rm -r --cached docs/reports`), but do not run it yourself. Do not commit the `.gitignore` either: that is the user's decision.

In the chat, reply with:
1. The report's **summary** (the same one that opens it, see the templates): 5–8 lines.
2. The link to each file created.
3. The closing line (below), if it applies.

Common to all modes:

- **"Issues to fix", "Nice to have" and "What I would do differently" answer different questions.** "Issues to fix": what is wrong today? (defects). "Nice to have": what would I add to what exists? (improvements on the current design). "What I would do differently": how should it have been designed? (a different approach, from scratch). Mixing them hides the real problems among suggestions. If a defect comes from a design decision, it goes in "Issues to fix" with its specific fix, and "What I would do differently" explains the design that would have prevented it at the root, without describing the defect again.
- **"What I would do differently" aims for what is right, not what is easy.** Propose the well-built design even if it costs more or means rebuilding parts, and say so clearly (cost, what it touches). Do not water it down to a patch because it is quicker; the patch is already in "Issues to fix". Each point must come from what you saw in this flow, not from a generic list of best practices: if you cannot point to a concrete "Today", the point does not belong. Prioritize: a few deep changes are worth more than many cosmetic ones. This applies in every mode, including `as-new-spec`, where the section becomes the design decisions: each one picks the right option over the shortcut, and the shortcut appears among the rejected alternatives with the reason it was rejected.
- **Proportion**: a small function can have two-line sections; do not pad. No section is skipped: if it does not apply, write one line saying why.
- **Write the summary last**, once you know the whole analysis, even though it goes at the top of the file.
- **Mermaid diagrams** (each template says which): a good diagram explains at a glance what takes several paragraphs, and GitHub and most editors render it. So that they help instead of confusing:
  - They must say the same as the text: if the text changes, the diagram changes too.
  - Small: up to about 12 nodes or participants. If it does not fit, split it or keep only the main path.
  - Labels in the report's language; in `as-business` and `as-new-spec`, no file or class names.
  - Valid syntax: quote labels with spaces, accents, parentheses or colons (`A["Review (admin)"]`), node ids without spaces or accents. A diagram that does not render is worse than none.
  - Only when they add something: a simple function without states or several components does not need a diagram.

Close in the chat with an optional next-step line if something in "Issues to fix" is clearly urgent, without summarizing the report again. In `as-new-spec`, name the current system's critical risks in the chat, one line each, with the link to the traceability file where they are recorded in full; their exact location in the current code never goes inside the specification, only their generic lesson (see the reference). If you chose the mode without the user naming it, mention in that line that the other modes exist and how to ask for them (`as-technical`, `as-business`, `as-new-spec`).
