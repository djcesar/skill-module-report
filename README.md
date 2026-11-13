# skill-analizar-modulo

**English** · [Español](README.es.md)

An agent skill that analyzes a flow, module, function or process in the project you are working on by reading the actual code, and delivers a report with eight sections.

It follows the open [Agent Skills](https://agentskills.io) format (a folder with a `SKILL.md` plus reference files), so it is not tied to a single AI tool or model. See [Requirements](#requirements) and [Installation](#installation).

The report is written in the user's language (Spanish by default). The section names below are given in English with the original Spanish heading in parentheses.

## Where the report goes

The full report is always saved as a Markdown file in `docs/fichas/` at the root of the working directory, named after the request and the mode (e.g. `docs/fichas/user-registration-as-business.md`, one file per mode). The chat only shows a 5–8 line summary and a link to the file, so long reports are never cut off and can be shared, versioned and compared over time.

- If a file with that name already exists, it is kept and the new one gets a date suffix (`…-YYYY-MM-DD.md`).
- The file is not committed; that is up to you.
- If the tool cannot write files (e.g. a plain chat), the full report is delivered in the chat instead.

## What the report contains

Every report opens with a **Scope** line (what was reviewed and what was left out, so you know how far the analysis goes) and a **Summary** of 5–8 lines (what it is, the high-severity findings and the most important change). The eight sections follow, always in this order. If one does not apply, the report says so in one line; none is skipped.

### 1. Description *(Descripción)*
What it is, why it exists and how it works, in one or two paragraphs, followed by the end-to-end walkthrough step by step.
- **`as-technical`:** input → validation → logic → data → response, with a link to each file.
- **`as-business`:** the steps as the user experiences them ("on the **Sign in** screen, tap **Forgot your password?**…").
- **`as-new-spec`:** purpose, actors, glossary, and the lifecycle of the main object as a state machine.

### 2. Use cases *(Casos de uso)*
Who uses it, what for and what triggers it, including alternate and error paths, not just the happy path.
- **`as-technical`:** actor, goal and trigger.
- **`as-business`:** "As a… I want… so that…" user stories with Given/When/Then acceptance criteria and the message the user sees on each error.
- **`as-new-spec`:** the cases it *should* have, including the ones missing today, and without the ones that only exist because of a workaround.

### 3. Required features *(Features o características requeridas)*
What the flow needs to do or have in order to work. It comes from what the code actually requires; it is not a wishlist.
- **`as-technical`:** inputs and outputs, validations, rules, permissions, tables, environment variables and integrations.
- **`as-business`:** one table per screen with every field and button (visible text, whether it is required, rules, and the message when it fails), business rules, and the emails or text messages that are sent.
- **`as-new-spec`:** numbered functional and non-functional requirements (security, privacy, auditing, accessibility…), data model, API contracts and permission matrix.

### 4. Things to keep in mind *(Cosas importantes a tener en cuenta)*
What you need to know before touching or using it: side effects, hidden rules, coupling, order of operations, differences between environments or channels (web, mobile app, admin panel), and what breaks if it is changed carelessly.

### 5. Issues to fix *(Cosas a resolver)*
What is **wrong today**: bugs, missing validations, security risks, inconsistencies between layers or channels. Each item includes evidence and a severity (🔴 high, 🟡 medium, 🟢 low).
- **`as-business`:** described by its impact on the user or the organization, not by its mechanism.
- **`as-new-spec`:** since there is no system yet, this becomes **open decisions** for business or legal, with options and a recommendation.

### 6. Nice to have *(Cosas que sería bueno incluir)*
Improvements on what already exists: tests, logging, clearer messages, accessibility, reports, neighboring features. These are wishes, not defects (defects go in section 5).
- **`as-new-spec`:** what can wait for a phase 2, with the reason it can wait.

### 7. What I would do differently *(Qué haría diferente)*
How it should have been designed from the start, aiming for what is right rather than what is quick. It does not repeat the defects from section 5; it proposes the design that would have prevented them at the root. Each item has three parts:
- **Today:** how it is built.
- **I would do it like this:** the concrete design.
- **Why:** the principle behind it and the cost of the change.

In `as-technical` it looks at security by design, layering, contracts, data model, tests and logic duplicated across channels. In `as-business` it looks at flow, error prevention, messaging, consistency, accessibility and privacy.
- **`as-new-spec`:** this becomes the project's **design decisions**: the decision, the alternatives that were rejected, and why.

### 8. Related *(Relacionados)*
A table of what this flow touches or what touches it, and how they relate.
- **`as-technical`:** modules, functions, endpoints, screens, tables, jobs and external services, with their location.
- **`as-business`:** related processes and screens, and who uses them.
- **`as-new-spec`:** modules and integrations the new module needs or feeds, with the contract between them.

### Closing
If something is urgent, a final line points it out. In `as-new-spec`, critical risks found in the current system are reported in the chat, never inside the document or its file, so the document can be handed over as is.

## Modes

The three modes are fixed identifiers: they are written the same way in any language.

| Mode | For whom | How to ask for it |
|---|---|---|
| **`as-technical`** (default) | Whoever will build or change the code: files, services, data, permissions, technical debt, with `file:line` references. | `as-technical`, or "explain the X flow", "analyze module Y, I'm going to change it" |
| **`as-business`** | Product, QA, support, the client: user stories with acceptance criteria, screens, buttons, fields and messages. Technical details only when critical, described by their impact. | `as-business`, or "in business terms", "user stories for X", "what buttons and fields does X have", "no technical details" |
| **`as-new-spec`** | A team that will build the module in a new project: a clean baseline specification with the right design, requirements, open decisions and design decisions (ADR). No code references, no bugs from the current system and no organization name. | `as-new-spec`, or "from scratch", "as baseline documentation for a new project", "specification for X" |

Modes can be combined: `as-technical as-business` delivers both reports (business first); `as-new-spec as-business` delivers only the functional specification. `as-new-spec` on its own delivers both the functional and the technical specification.

Examples: `/skill-analizar-modulo user registration as-business`, "explain the payments module as-technical as-business", "password reset as-new-spec". Plain requests also work, in English or Spanish ("explícame el módulo X en modo negocio", "desde cero").

## Requirements

The skill is instructions in Markdown; what it needs is an assistant that can work inside your project:

| Requirement | Why |
|---|---|
| **Read access to the repository** (search files, open them, list folders) | The whole report is built from the actual code: entry points, validations, data, permissions and UI texts. Without it, it can only analyze what you paste into the chat. |
| **All related repositories within reach** (e.g. backend and frontends in sibling folders) | A flow usually crosses repos: the endpoint lives in the API and the screen that calls it in a frontend. Cross-repo traceability and the "Related" section depend on it. |
| **Write access to `docs/fichas/`** *(recommended)* | To save the report as a file. Without it, the full report is delivered in the chat. |
| **Ability to run read-only commands** *(recommended)* | Used for `git log` on key files, to understand why something is the way it is. Optional. |
| **Support for the Agent Skills format** *(recommended)* | Lets the assistant activate the skill on its own when you ask to explain or analyze something, and load the reference files only when needed. Without it, you have to provide the instructions manually (see below). |
| **A capable model with a large context window** | Analyzing a full module means reading many files across repos and writing a long, structured report. |

It never writes code, runs migrations or deploys anything. The only file it writes is the report in `docs/fichas/`, and it needs no network access.

## Installation

Clone the repository into the skills folder of the tool you use:

```bash
git clone https://github.com/djcesar/skill-analizar-modulo.git <skills-folder>/skill-analizar-modulo
```

- **Tools that support Agent Skills** (agentic coding assistants and IDE agents): each one looks for skills in its own folder, either per user or per project. Check your tool's documentation for the exact path. Once installed, it activates when you ask to explain, analyze or document something in the code, without naming it; tools with slash commands also let you invoke it as `/skill-analizar-modulo`.
- **Tools without skill support** (or a plain chat): give the assistant the contents of `SKILL.md` as instructions, plus the reference file for the mode you want (`references/as-technical.md` or `references/as-business.md`, and also `references/as-new-spec.md` for a new-project spec). Then ask for the analysis normally.

Results are best in agent-style tools that work directly inside the repository; in a chat without file access the report loses its `file:line` references and its cross-repo view.

## Structure

```
SKILL.md                    workflow and mode selection
references/as-technical.md  as-technical template
references/as-business.md   as-business template and how to extract the user's view from the code
references/as-new-spec.md   how to turn the analysis into a specification for a new project
```

It does not modify code or deploy anything; the only thing it writes is the report in `docs/fichas/`.
