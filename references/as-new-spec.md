# Mode `as-new-spec`: specification to build it anew

The user does not want to know how it is built today: they want the **baseline documentation to build this module, flow or function in a new project, done right from the start**. The current system is your source of domain knowledge (what it does, for whom, what rules it has, what went wrong), but the final document describes **what must be built**, not what exists.

Think of who will read it: a team starting a clean project that will use this document as the starting point to estimate, design and build. They do not know the old system and gain nothing from hearing about it; they need to know what to build, how and why.

## How what you found is transformed

- **"What I would do differently" stops being an opinion and becomes the design.** The redesigns you would propose become the architecture, the flow and the rules of the specification.
- **Defects are not described, they are prevented.** Every bug or risk you saw in the current system becomes a requirement, rule or acceptance criterion that makes it impossible. For example, "the update-user endpoint was public and accepted the role" becomes "RNF-SEC-2: no endpoint accepts role or status fields from the client; changing a role is an audited admin action". Do not tell the story of the bug.
- **Use cases are the ones it should have, not only the ones it has.** If the current system lacks an obvious case (correcting data, resending a link, viewing history), include it. If a current case exists only because of a workaround, leave it out.
- **What you cannot decide goes in as an open decision**, with options and your recommendation. Do not invent legal or business rules the code does not support.

## Keeping the document clean

The specification must be deliverable to another organization or team without changes (the traceability file, below, is the exception):

- **No references to the current code.** No file paths, old class or endpoint names, or line numbers. The "Technical references" line at the end is left out too.
- **No proper names of the organization.** Replace the organization's name with its generic role, and do the same with everything derived from it: acronyms, domains, app and repository names, email addresses.
  - A political party ("Example Party", acronym "EP") → "the Party"; a clinic → "the Clinic"; a company → "the Company"; a university → "the University". In Spanish: "el Partido", "la Clínica", "la Empresa", "la Universidad".
  - Domains and email addresses (`exampleparty.org`, `ep+…@…`) → `<domain>`, `<system-email>`.
  - Apps and repositories → by their function: user portal, admin panel, mobile app, API.
  - Search the code for the organization's name (UI texts, email templates, domains, repository names) to know exactly what to replace.
- **No real data**: no people's names, ID numbers, emails or ids that appear in the code, seeds or examples.
- **Technology is a recommendation, not an inheritance.** If the project has an architecture proposal or a defined stack, align with it and say so. If not, recommend one with its justification and express the design in concepts (states, contracts, permissions) that survive a change of stack.

## The eight sections in this mode

Keep the same headings so it can be compared with the analysis report, but fill them like this:

```markdown
# <Module name> — Baseline specification

> **Purpose of this document:** what will be built and for whom, in one or two lines.
> **Out of scope:** what this module does not do (and which module does).

## Summary
5–8 lines: what is being built, the 3–4 design decisions that define it and the open decisions
that block the start. It is the same text shown in the chat.

## Description
What problem it solves, actors, and a **glossary** of the domain's terms and states
(e.g. "Member", "Former member", "Re-enrollment"). Include the main object's **lifecycle**
as a state machine: states, transitions, who triggers each one.
Always draw it as a Mermaid `stateDiagram-v2`: in this mode it is the core of the design
and the piece the team will implement.

## Use cases
Complete and correct (see above). With `as-business`: stories with Given/when/then criteria.
With `as-technical`: case, actor, preconditions, main flow, alternate and error paths, postconditions.

## Required features
- **Functional requirements** numbered (RF-1…), each traceable to a use case.
- **Non-functional requirements** (RNF-SEC, RNF-PRIV, RNF-AUD, RNF-PERF, RNF-ACC…):
  security, privacy and personal data, auditing, performance, accessibility, availability.
- With `as-business`: screens with their fields and buttons (table), messages and communications.
- With `as-technical`: data model (entities, key fields, constraints; with a Mermaid
  `erDiagram`), a `sequenceDiagram` of the main use case, API contracts per use case
  (method, route, who may call it, input, output, errors), **permission matrix**
  (role × action, by record owner), events and integrations.

## Things to keep in mind
Business rules and invariants (what must never happen), legal or regulatory constraints,
mandatory order of steps, consistency across channels, data migration if an existing system
is being replaced.

## Issues to fix
**Open decisions** before building: questions for business, legal or operations.
Each one with options, impact and your recommendation. They are not bugs: there is no system yet.

## Nice to have
What is left for a **later phase** (v2): valuable but not needed for the first delivery.
Say why it can wait.

## What I would do differently
Here it becomes the key **design decisions**, in a short ADR format:
- **Decision:** what is done.
- **Rejected alternatives:** the other reasonable options, including the one the previous
  system used, described generically ("state split across several flags"), without naming it.
- **Why:** the principle, the risk it avoids and the cost that is accepted.

## Related
Modules and integrations the new module needs or feeds, with the contract between them
(what it asks of or delivers to each one). Generic names, not those of the current system.
```

## Combining with `as-technical` and `as-business`

- **`as-new-spec as-business`**: functional specification (stories, screens, rules, open decisions for the business).
- **`as-new-spec as-technical`**: technical specification (model, contracts, permissions, architecture decisions).
- **`as-new-spec` alone**: deliver both, functional first and then technical, because baseline project documentation needs both. They must not contradict each other: RFs and stories should share the same numbering or a correspondence table.

## Traceability file

Besides the specification, always write a second, internal file: `<topic>-as-new-spec-traceability.md`, in the same folder. Only one, even if the specification comes in two files (functional and technical).

Why it exists: the specification is clean on purpose, so on its own it does not say **where each requirement came from**. When someone asks "why is this RNF-SEC here?" or "is this rule necessary?", the answer has to be written somewhere. And the current system's risks cannot live only in the chat, because they are lost when the conversation ends. You already have all this information when you write the specification; here you just record it.

This file is **not delivered** with the specification and is the exception to the cleanliness rules: file paths, endpoints and the organization's real name do go here.

```markdown
# <Topic> — as-new-spec · traceability

> **Internal document.** Explains where each requirement and decision in the specification
> `<specification file(s)>` comes from. It contains references to the current system: it is not
> delivered with it.

## Requirements and decisions → origin
| Requirement or decision | What motivated it | Evidence in the current system |
|---|---|---|
| RNF-SEC-4 Strict contracts | Today the client can set status, payment and owner | `bookings.controller.ts:29`, `booking.dto.ts:10` |
| RF-3 Cancel booking | Current case, kept | `my-bookings.page.html:9` |
| RF-9 Resend link | Missing today (domain) | — |

Classify each row by its origin: **defect it prevents** (with evidence), **current case that is
kept** (with evidence), **missing today** or **domain practice** (no code evidence; say where you
take it from). Not everything needs an origin in the code, but everything needs an origin.

## Critical risks in the current system
The 🔴 you saw, with their certainty label and evidence, as in `as-technical`. They are what the
specification prevents, but they are still open in production and should not wait for the new project.

## Other defects in the current system
Medium or low severity ones, one line each.
```

Before delivering, check the specification (not the traceability file) for the organization's name, file paths and current class or endpoint names. If you find any, replace them.
