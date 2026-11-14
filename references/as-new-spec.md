# Mode `as-new-spec`: specification to build something done right

The user wants the **baseline documentation to build a module, flow or function done right from the start**: what must be built, how and why. It covers four situations, along two questions:

- **Does it exist already?** If it does, the current implementation is your source of domain knowledge (what it does, for whom, what rules it has, what went wrong). If it does not, the knowledge comes from the project around it (users, roles, storage, notifications, conventions it must integrate with) and from the domain's usual practices. If something partial or similar exists, treat it as an **extension**: what exists is the current system, what is missing comes from the domain.
- **Where will it be built?** In **this project** (a new module, or a redesign in place) or in **a new project** (a rebuild elsewhere, a deliverable for another team).

Either way, the document describes **what must be built**, not what exists. Think of who will read it: a team that will use it to estimate, design and build, and that gains nothing from a tour of the old code; they need to know what to build, how and why.

## Before starting: what exists and where it will be built

The destination is the one thing you cannot learn from the code, and it changes the whole document, so settle it before the long investigation.

1. **Quick search first (seconds, not the full analysis).** Look for the target in the code by its name and synonyms. Note what you found: the module, something partial or similar, or nothing.
2. **Ask one question, unless the request states the destination explicitly.** "For a new project", "for another team", "to build it elsewhere" → new project. "In this project", "add it to this system", "a new module for this platform" → this project. Words like "create", "design" or "from scratch" do **not** settle it on their own: a module can be created here or elsewhere. When the destination is not explicit, ask, saying what the quick search found so the user can correct it if you picked the wrong thing:

   > *I did not find a document management module. There is a file storage service (`storage`) I would build on.*
   > *Where is this specification for?*
   > *a. A new module in this project (recommended): aligned with the current stack and integrated by name with the existing modules.*
   > *b. A new project: technology-neutral and without the organization's name, ready to hand over to another team.*

   Recommend **this project** when the target does not exist (new things are usually built where they are needed) and **a new project** when it exists and the user asked for it "from scratch" (that is usually a rebuild elsewhere). For an existing target built in this project, option a reads "Redesign it within this project".
3. **If you cannot ask** (an automated run), take the recommended option and say so.
4. **Record the case in the scope line** of the document: whether the target existed (and what was found) and the destination.

## What changes in each case

| | Built in a new project | Built in this project |
|---|---|---|
| **Technology** | Neutral (see "Technology") | Aligned with the current stack; name the frameworks and services the project already uses |
| **Names** | Anonymized: no organization name, no current code references (see "Keeping the document clean") | Existing modules, entities and services are named, because the new part integrates with them; still no exploitable details of live flaws |
| **Integration** | Described as contracts with generic modules | Concrete: which existing modules, entities and endpoints it uses or feeds, and what has to change in them |
| **Migration** | Only if it replaces a system | Coexistence plan with what exists today (feature flags, data migration, order of rollout) |

| | It exists (rebuild or extension) | It does not exist (new) |
|---|---|---|
| **Use cases and rules** | From the current behavior, corrected and completed | From the request, the project context and domain practice, marked as such; scope questions become open decisions |
| **Mistakes this specification prevents** | Defects and risks found in the current implementation | Risks already present in the pieces it will reuse (e.g. a public storage URL) plus the domain's typical mistakes |
| **Traceability origins** | Defect it prevents, current case kept, missing today, domain practice | User request, project integration, risk in a reused piece, domain practice |

For something that does not exist, do not invent business rules as if they were facts: propose them as domain practice and let the scope-defining choices (which document types, volumes, retention rules, who approves) be **open decisions** with your recommendation.

## How what you found is transformed

When the target does not exist, read "the current system" below as the pieces of the project it will
reuse (authentication, roles, storage, notifications…) and the domain's usual practices.

- **"What I would do differently" stops being an opinion and becomes the design.** The redesigns you would propose become the architecture, the flow and the rules of the specification.
- **Defects are not described, they are prevented.** Every bug or risk you saw in the current system becomes a requirement, rule or acceptance criterion that makes it impossible. For example, "the update-user endpoint was public and accepted the role" becomes "RNF-SEC-2: no endpoint accepts role or status fields from the client; changing a role is an audited admin action". Do not tell the story of the bug in the current system; record the lesson as a generic pattern in "Mistakes this specification prevents".
- **Use cases are the ones it should have, not only the ones it has.** If the current system lacks an obvious case (correcting data, resending a link, viewing history), include it. If a current case exists only because of a workaround, leave it out.
- **What you cannot decide goes in as an open decision**, with options and your recommendation. Do not invent legal or business rules the code does not support.

## Keeping the document clean

When the destination is **a new project**, the specification must be deliverable to another organization or team without changes (the traceability file, below, is the exception). When it is built in **this project**, the anonymization and no-code-references rules do not apply (see "What changes in each case"), but lessons-not-exploits and no-real-data still do:

- **Lessons yes, exploitable details no.** The mistakes found in the current system do go into the specification, as generic patterns (see "Mistakes this specification prevents"), because a requirement without its reason is the first one to be relaxed "to go faster". What stays out are the details that would let someone attack the live system: where each flaw is today, its paths, endpoints and ids. Those go only in the traceability file.
- **No references to the current code.** No file paths, old class or endpoint names, or line numbers. The "Technical references" line at the end is left out too.
- **No proper names of the organization.** Replace the organization's name with its generic role, and do the same with everything derived from it: acronyms, domains, app and repository names, email addresses.
  - A political party ("Example Party", acronym "EP") → "the Party"; a clinic → "the Clinic"; a company → "the Company"; a university → "the University". In Spanish: "el Partido", "la Clínica", "la Empresa", "la Universidad".
  - Domains and email addresses (`exampleparty.org`, `ep+…@…`) → `<domain>`, `<system-email>`.
  - Apps and repositories → by their function: user portal, admin panel, mobile app, API.
  - Search the code for the organization's name (UI texts, email templates, domains, repository names) to know exactly what to replace.
- **No real data**: no people's names, ID numbers, emails or ids that appear in the code, seeds or examples.
- **Technology-neutral for a new project.** You can only read the current project, not the one this specification is for, so its stack is unknown. Do not inherit the current stack (it may be exactly what the new project wants to change) and do not pick one on your own (it would bias a document meant to serve any decision). See "Technology" below for how to keep what was learned without naming products.

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
  (role × action, by record owner), events and integrations. All of it in concepts, not products
  (see "Technology").

### What the chosen stack must support
Only in the technical specification. A checklist of capabilities derived from what was learned,
to evaluate candidate stacks without choosing one: e.g. schema validation that rejects undeclared
fields, server-side authorization by role and by record owner, transactions or uniqueness/exclusion
constraints, a secrets manager, a queue with retries. Each item says which requirement or
mistake (M-n) it serves.

## Things to keep in mind
Business rules and invariants (what must never happen), legal or regulatory constraints,
mandatory order of steps, consistency across channels, data migration if an existing system
is being replaced.

### Mistakes this specification prevents
One entry per mistake found in the current system (every risk and every significant defect),
written as a **generic pattern**: what goes wrong and why, with no paths, endpoints, class names
or organization name. Each one links to the requirement that prevents it and to an acceptance
test that would catch it if it came back.

| # | Mistake (generic pattern) | Why it matters | Prevented by | Acceptance test |
|---|---|---|---|---|
| M-1 | Mass assignment: an endpoint accepts the whole object from the client, so the client can set fields it should not (role, status, payment, owner) | Privilege escalation, fake payments | RNF-SEC-4 | Sending `role` or `status` in a sign-up body returns 400 and changes nothing |

## Issues to fix
**Open decisions** before building: questions for business, legal or operations.
Each one with options, impact and your recommendation. They are not bugs: there is no system yet.

## Nice to have
What is left for a **later phase** (v2): valuable but not needed for the first delivery.
Say why it can wait.

## What I would do differently
Here it becomes the key **design decisions**, in a short ADR format. Choose what is right,
not what is easy or quick: the correct design even if it costs more to build, and say so.
- **Decision:** what is done.
- **Rejected alternatives:** the other reasonable options, including the one the previous
  system used, described generically ("state split across several flags"), without naming it.
  When there is a quicker or cheaper shortcut, list it here and say why it was rejected.
- **Why:** the principle, the risk it avoids and the cost that is accepted (effort, time,
  complexity), stated plainly instead of hidden.

## Related
Modules and integrations the new module needs or feeds, with the contract between them
(what it asks of or delivers to each one). Generic names, not those of the current system.
```

## Technology

**Built in this project:** align with the current stack. Name the frameworks, database and services
the project already uses, write each requirement in terms of how that stack provides it, and turn
"What the chosen stack must support" into **"How the current stack covers it"**: each capability, how
the stack provides it, and any gap that needs a new piece (with the gap as an open decision).
Pitfalls of the current stack go straight into the specification as rules, because the team will
build with it.

**Built in a new project:** the rest of this section applies. The specification has to stay useful
whatever stack the new project ends up using, without losing what the current system taught.

- **Write requirements as capabilities, not products.** Not "use a PostgreSQL `EXCLUDE`
  constraint" but "the database must guarantee atomically that no two active bookings share a time
  slot, even under concurrent requests". The lesson survives any stack.
- **Turn the lessons into the stack checklist** ("What the chosen stack must support"), so the
  team can evaluate candidates against it.
- **Pitfalls specific to the current stack go in the traceability file** ("Lessons specific to the
  current stack"), e.g. "in NestJS, a global `ValidationPipe` without `whitelist` lets extra fields
  through". Valuable if the new team keeps that technology, without constraining a team that does not.
- **Name technology only if the user gave the target stack** in the request (e.g. "as-new-spec for Go
  and PostgreSQL"). Then align the design with it, say so in the scope, and for each capability state
  how that stack provides it.
- **If the user asks for a recommendation**, it goes in "Issues to fix" as an open decision: two or
  three candidate stacks compared against the checklist, with your recommendation. Never baked into
  the design.

## Combining with `as-technical` and `as-business`

- **`as-new-spec as-business`**: functional specification (stories, screens, rules, open decisions for the business).
- **`as-new-spec as-technical`**: technical specification (model, contracts, permissions, architecture decisions).
- **`as-new-spec` alone**: deliver both in **one file**, `<topic>-as-new-spec.md`, because baseline project documentation needs both and is handed over as a single piece. Inside, a short index and two clear parts: "Part 1 · Functional specification" and "Part 2 · Technical specification", each with the eight sections. They must not contradict each other: RFs and stories share the same numbering, and "Mistakes this specification prevents" appears once (in Part 1, referenced from Part 2).

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
The 🔴 you saw, with their certainty label and evidence, as in `as-technical`, each linked to its
generic entry in the specification (M-1, M-2…). They are what the specification prevents, but they
are still open in production and should not wait for the new project.

## Other defects in the current system
Medium or low severity ones, one line each.

## Lessons specific to the current stack
Pitfalls of the current technology behind the mistakes above, and how to avoid them if the new
project keeps it (e.g. framework defaults, library settings). Each one linked to its M-n.
```

Before delivering, check the specification (not the traceability file) for the organization's name, file paths and current class or endpoint names. If you find any, replace them.
