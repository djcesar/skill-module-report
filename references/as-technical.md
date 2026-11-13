# Mode `as-technical`

For whoever will build, review or change the code. Cite files as relative Markdown links with the line (`[users.service.ts:120](src/users/users.service.ts:120)`).

```markdown
# <Name of the flow/module>

> **Scope:** what you reviewed (key repositories/folders/files) and what was left out.

## Summary
5–8 lines for someone who reads only this: what it is and how it works in one sentence, the 🔴
findings with one line each, and the most important deep change from "What I would do differently".
It is the same text shown in the chat.

## Description
What it is, why it exists and how it works, in 1–2 paragraphs. Then the walkthrough in numbered steps
(entry → validation → logic → data → response/effects), with links to the files.
If the walkthrough crosses two or more components (frontend, API, database, external services),
add a Mermaid `sequenceDiagram` of the main path. If the object has states (pending, approved…),
also add a `stateDiagram-v2` with the states as they are today, including the odd combinations
you found.

## Use cases
List of "**Actor** wants/needs **goal**" with the trigger. Include the relevant alternate and
error paths (invalid data, no permission, missing resource), not just the happy path.

## Required features
What the flow needs to do/have in order to work: inputs and outputs, validations, business rules,
permissions, dependencies (services, tables, environment variables, integrations).
Group them if it helps (Functional / Data / Configuration / Security).

## Things to keep in mind
What someone must know before changing or using it: side effects, invariants, coupling,
order of operations, differences between environments, known pitfalls, performance, security.
What breaks if it is changed carelessly.

## Issues to fix
Concrete defects and debt found: bugs, missing validations, TODO/FIXME, dead code,
inconsistencies between layers, security risks. Each one with evidence (file:line)
and a severity (🔴 high / 🟡 medium / 🟢 low). If you found nothing, say so.

## Nice to have
Optional improvements that would add value (tests, logging, metrics, UX, documentation,
refactors, neighboring features). These are wishes; what is broken goes above.

## What I would do differently
How you would have designed it from scratch with what you now know about the flow, aiming for
what is right and not what is quick. Each point in three parts:
- **Today:** how it is built (with evidence).
- **I would do it like this:** the concrete design (pattern, structure, contract, data model).
- **Why:** the principle or consequence that justifies it, and the cost of changing it.

## Related
| Item | Type | Relationship | Location |
(module, function, endpoint, screen, table, job, external service…; relationship: "calls it",
"is called by", "writes to", "shares entity", "sibling flow"…)
```

- **"Required features" describes what the flow needs, not a wishlist**: it comes from what the code does and requires (validations, config, permissions). New ideas go in "Nice to have".
- **"What I would do differently" in `as-technical`** considers axes like these (use the ones that apply):
  - Security by design: deny by default, server-side authorization by role and by record owner, secrets out of the code, least privilege.
  - Layers and responsibilities: thin controllers, business logic in one place, no rules duplicated between frontend and backend.
  - Contracts: validated DTOs, errors with the right HTTP status, idempotency, versioning.
  - Data: integrity in the database (keys, constraints, transactions), non-guessable identifiers, no state split across systems.
  - Operations: automated tests for the flow, structured logs without sensitive data, observability.
  - Consistency across channels: one place for the logic that today is copied in web and mobile.
