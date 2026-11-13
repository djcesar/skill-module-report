# skill-analizar-modulo

**English** · [Español](README.es.md)

A Claude Code skill that analyzes a flow, module, function or process in the project you are working on by reading the actual code, and delivers a report with eight sections.

The report is written in the user's language (Spanish by default). The section names below are given in English with the original Spanish heading in parentheses.

## What the report contains

Every report opens with a **Scope** line: what was reviewed and what was left out, so you know how far the analysis goes. The eight sections follow, always in this order. If one does not apply, the report says so in one line; none is skipped.

### 1. Description *(Descripción)*
What it is, why it exists and how it works, in one or two paragraphs, followed by the end-to-end walkthrough step by step.
- **Technical:** input → validation → logic → data → response, with a link to each file.
- **Business:** the steps as the user experiences them ("on the **Sign in** screen, tap **Forgot your password?**…").
- **From scratch:** purpose, actors, glossary, and the lifecycle of the main object as a state machine.

### 2. Use cases *(Casos de uso)*
Who uses it, what for and what triggers it, including alternate and error paths, not just the happy path.
- **Technical:** actor, goal and trigger.
- **Business:** "As a… I want… so that…" user stories with Given/When/Then acceptance criteria and the message the user sees on each error.
- **From scratch:** the cases it *should* have, including the ones missing today, and without the ones that only exist because of a workaround.

### 3. Required features *(Features o características requeridas)*
What the flow needs to do or have in order to work. It comes from what the code actually requires; it is not a wishlist.
- **Technical:** inputs and outputs, validations, rules, permissions, tables, environment variables and integrations.
- **Business:** one table per screen with every field and button (visible text, whether it is required, rules, and the message when it fails), business rules, and the emails or text messages that are sent.
- **From scratch:** numbered functional and non-functional requirements (security, privacy, auditing, accessibility…), data model, API contracts and permission matrix.

### 4. Things to keep in mind *(Cosas importantes a tener en cuenta)*
What you need to know before touching or using it: side effects, hidden rules, coupling, order of operations, differences between environments or channels (web, mobile app, admin panel), and what breaks if it is changed carelessly.

### 5. Issues to fix *(Cosas a resolver)*
What is **wrong today**: bugs, missing validations, security risks, inconsistencies between layers or channels. Each item includes evidence and a severity (🔴 high, 🟡 medium, 🟢 low).
- **Business:** described by its impact on the user or the organization, not by its mechanism.
- **From scratch:** since there is no system yet, this becomes **open decisions** for business or legal, with options and a recommendation.

### 6. Nice to have *(Cosas que sería bueno incluir)*
Improvements on what already exists: tests, logging, clearer messages, accessibility, reports, neighboring features. These are wishes, not defects (defects go in section 5).
- **From scratch:** what can wait for a phase 2, with the reason it can wait.

### 7. What I would do differently *(Qué haría diferente)*
How it should have been designed from the start, aiming for what is right rather than what is quick. It does not repeat the defects from section 5; it proposes the design that would have prevented them at the root. Each item has three parts:
- **Today:** how it is built.
- **I would do it like this:** the concrete design.
- **Why:** the principle behind it and the cost of the change.

The technical version looks at security by design, layering, contracts, data model, tests and logic duplicated across channels. The business version looks at flow, error prevention, messaging, consistency, accessibility and privacy.
- **From scratch:** this becomes the project's **design decisions**: the decision, the alternatives that were rejected, and why.

### 8. Related *(Relacionados)*
A table of what this flow touches or what touches it, and how they relate.
- **Technical:** modules, functions, endpoints, screens, tables, jobs and external services, with their location.
- **Business:** related processes and screens, and who uses them.
- **From scratch:** modules and integrations the new module needs or feeds, with the contract between them.

### Closing
If something is urgent, a final line points it out. In "from scratch" mode, critical risks found in the current system are reported in the chat, never inside the document, so the document can be handed over as is.

## Versions

| Version | For whom | How to ask for it |
|---|---|---|
| **Technical** (default) | Whoever will build or change the code: files, services, data, permissions, technical debt, with `file:line` references. | "explain the X flow", "analyze module Y, I'm going to change it" |
| **Business** | Product, QA, support, the client: user stories with acceptance criteria, screens, buttons, fields and messages. Technical details only when critical, described by their impact. | "in business terms", "user stories for X", "what buttons and fields does X have", "no technical details" |
| **From scratch** | A team that will build the module in a new project: a clean baseline specification with the right design, requirements, open decisions and design decisions (ADR). No code references, no bugs from the current system and no organization name. | "from scratch", "as baseline documentation for a new project", "specification for X" |

They can be combined: "explain X in technical and business mode", "X from scratch, functional part only". Requests also work in Spanish ("explícame el módulo X", "en modo negocio", "desde cero").

## Installation

```bash
git clone https://github.com/djcesar/skill-analizar-modulo.git ~/.claude/skills/skill-analizar-modulo
```

Claude Code loads it automatically. It activates when you ask it to explain, analyze or document something in the code, without naming it. You can also invoke it directly with `/skill-analizar-modulo`.

## Structure

```
SKILL.md                 workflow and version selection
references/tecnico.md    technical template
references/negocio.md    business template and how to extract the user's view from the code
references/desde-cero.md how to turn the analysis into a specification for a new project
```

It is read-only: it does not modify code or deploy anything.
