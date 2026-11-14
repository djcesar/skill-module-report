# skill-module-report

**English** · [Español](README.es.md) · [Privacy](#privacy-and-data) · [Changelog](CHANGELOG.md) · [Contributing](CONTRIBUTING.md) · [License](LICENSE)

An agent skill that analyzes a flow, module, function or process in the project you are working on by reading the actual code, and delivers a report with eight sections.

It follows the open [Agent Skills](https://agentskills.io) format (a folder with a `SKILL.md` plus reference files), so it is not tied to a single AI tool or model. See [Requirements](#requirements) and [Installation](#installation).

> ⭐ **If module-report saves you time, please [star the repository](https://github.com/djcesar/skill-module-report)**: it helps other developers find it. Ideas, bug reports and pull requests are very welcome, see [Contributing](#contributing).

The report is written in the language of the request: ask in English and everything comes out in English, ask in Spanish and it comes out in Spanish, headings included.

## Where the report goes

The full report is always saved as a Markdown file in `docs/module-reports/` at the root of the working directory, named after the request and the mode (e.g. `docs/module-reports/user-registration-as-business.md`, one file per mode). The chat only shows a 5–8 line summary and a link to the file, so long reports are never cut off and can be shared, versioned and compared over time.

- If a file with that name already exists, it is kept and the new one gets a date suffix (`…-YYYY-MM-DD.md`).
- The file is not committed; that is up to you.
- **Repo or local only?** Reports can contain security findings with their exact location in the code, so the first time the skill writes a report in a git repository it asks whether reports should travel with the repo or stay local. Staying local (recommended) adds `docs/module-reports/` to `.gitignore`, or to `.git/info/exclude` if you prefer not to touch versioned files. If you choose the repo, traceability files are still ignored, and it warns before writing security findings into a public repository. It never commits or removes anything from git by itself.
- `as-new-spec` also writes an internal traceability file next to the specification (see below).
- If the tool cannot write files (e.g. a plain chat), the full report is delivered in the chat instead.

## How it works

- **Built from the code, not assumptions.** It follows the flow end to end (entry points, logic, data, integrations, configuration, permissions) across sibling repositories, and marks anything it deduces as *(inferred)*.
- **Security checklist in every mode.** It always checks unauthenticated actions, server-side role and ownership checks, sensitive fields accepted from the client, exposed personal data, guessable IDs or links, secrets, and abuse (unlimited emails/SMS). Each mode reports them its own way: mechanism, business impact, or a requirement that prevents them.
- **Critical findings are double-checked.** Before reporting a 🔴, it re-reads the exact code and confirms the whole chain: that the cited line is actually reachable (following every call down to its `return` or `throw`), the exact route and handler, each link of a multi-step attack on its own, every endpoint that can leak the same secret, and what an attacker really needs. Unreachable branches are reported as dead code, not as vulnerabilities. Each one is labeled *(verified in code)* or *(inferred)*, plus *not tested live* unless it was actually reproduced.
- **Mermaid diagrams where they help.** A sequence diagram of the main path and a state diagram in `as-technical`, a user-flow chart in `as-business`, and a state machine plus data model in `as-new-spec`. They render on GitHub and most editors.

## Privacy and data

module-report is a set of instructions and templates in Markdown: no code, no scripts, no network calls, no telemetry. On its own it cannot send anything anywhere. When an agent follows it:

- **Nothing is sent to external services.** The skill tells the agent not to send code, findings or reports to any URL, API or service, and not to call live systems (production, staging or third-party APIs), not even to confirm a finding. That is why findings say *not tested live*.
- **Reports stay on your machine.** They are written to `docs/module-reports/` in your project and nowhere else. They are never committed: the first time in a git repository the skill asks whether they should stay local (recommended) and adds the ignore rule if so.
- **Secrets are never copied into reports.** Keys, passwords, tokens or personal data found in the code are described with their location and a masked value (`sk_live_…`), so a report can be shared without leaking them.
- **Specifications meant to be handed over are cleaned.** `as-new-spec` for a new project removes the organization's name, code references and real data; exact locations of live flaws stay only in the internal traceability file.
- **It reads, it does not change.** It does not modify your code, run migrations or deploy anything.
- **The tests use fictional data.** The sample project in `evals/` is invented, and its keys are obviously fake.

**One thing outside the skill's control:** the AI tool you run it with (Claude Code, Codex, Copilot…) sends the code it reads to its model provider to work, as it does for any task. How that data is handled depends on that tool's and provider's own privacy policy and your account settings, not on this skill. If your code is confidential, check that policy first.

## Modes

The three modes are fixed identifiers: they are written the same way in any language.

| Mode | For whom | How to ask for it |
|---|---|---|
| **`as-technical`** (default) | Whoever will build or change the code: files, services, data, permissions, technical debt, with `file:line` references. | `as-technical`, or "explain the X flow", "analyze module Y, I'm going to change it" |
| **`as-business`** | Product, QA, support, the client: user stories with acceptance criteria, screens, buttons, fields and messages. Technical details only when critical, described by their impact. | `as-business`, or "in business terms", "user stories for X", "what buttons and fields does X have", "no technical details" |
| **`as-new-spec`** | A team that will build something done right: a baseline specification with the right design, requirements, open decisions and design decisions (ADR). Works for a module that **exists** (rebuild or extension) or **does not exist yet** (a new module), built **in this project** (aligned with its stack, integrated by name) or **in a new project** (technology-neutral and anonymized). It asks which one first, unless you say it. | `as-new-spec`, or "from scratch", "as baseline documentation for a new project", "specification for X", "I want to create a document management module" |

Modes can be combined: `as-technical as-business` delivers both reports (business first); `as-new-spec as-business` delivers only the functional specification. `as-new-spec` on its own delivers a single file with both parts, functional and technical.

Examples: `/module-report user registration as-business`, "explain the payments module as-technical as-business", "password reset as-new-spec". Plain requests also work, in English or Spanish ("explícame el módulo X en modo negocio", "desde cero").

## What the report contains

Every report opens with a **Scope** line (what was reviewed and what was left out, so you know how far the analysis goes) and a **Summary** of 5–8 lines (what it is, the high-severity findings and the most important change). The eight sections follow, always in this order. If one does not apply, the report says so in one line; none is skipped.

### 1. Description
What it is, why it exists and how it works, in one or two paragraphs, followed by the end-to-end walkthrough step by step.
- **`as-technical`:** input → validation → logic → data → response, with a link to each file.
- **`as-business`:** the steps as the user experiences them ("on the **Sign in** screen, tap **Forgot your password?**…").
- **`as-new-spec`:** purpose, actors, glossary, and the lifecycle of the main object as a state machine.

### 2. Use cases
Who uses it, what for and what triggers it, including alternate and error paths, not just the happy path.
- **`as-technical`:** actor, goal and trigger.
- **`as-business`:** "As a… I want… so that…" user stories with Given/When/Then acceptance criteria and the message the user sees on each error.
- **`as-new-spec`:** the cases it *should* have, including the ones missing today, and without the ones that only exist because of a workaround.

### 3. Required features
What the flow needs to do or have in order to work. It comes from what the code actually requires; it is not a wishlist.
- **`as-technical`:** inputs and outputs, validations, rules, permissions, tables, environment variables and integrations.
- **`as-business`:** one table per screen with every field and button (visible text, whether it is required, rules, and the message when it fails), business rules, and the emails or text messages that are sent.
- **`as-new-spec`:** numbered functional and non-functional requirements (security, privacy, auditing, accessibility…), data model, API contracts and permission matrix.

### 4. Things to keep in mind
What you need to know before touching or using it: what is not obvious and what breaks if it is changed carelessly.
- **`as-technical`:** side effects, invariants, coupling, order of operations, differences between environments, known pitfalls, performance and security.
- **`as-business`:** rules that are not visible on screen, differences between channels (web, mobile app, admin panel), dependencies on other processes, timings and expirations, data that gets overwritten, and what the user does not see but affects them.
- **`as-new-spec`:** business rules and invariants (what must never happen), legal or regulatory constraints, mandatory order of steps and data migration, plus **"Mistakes this specification prevents"**: each mistake from the current system as a generic pattern, with the requirement that prevents it and an acceptance test.

### 5. Issues to fix
What is **wrong today**, with a severity for each item (🔴 high, 🟡 medium, 🟢 low).
- **`as-technical`:** bugs, missing validations, security risks, dead code and inconsistencies between layers or channels, each with its mechanism and `file:line` evidence. Every 🔴 is labeled *(verified in code)* or *(inferred)*, plus *not tested live*.
- **`as-business`:** problems from the user's point of view: confusing steps, misleading or missing messages, dead ends, rules that differ between channels, plus critical technical issues described by their impact on the user or the organization. Each one says where it shows (screen or button).
- **`as-new-spec`:** since there is no system yet, this becomes **open decisions** for business or legal, with options, impact and a recommendation.

### 6. Nice to have
Improvements on what already exists. These are wishes, not defects (defects go in section 5).
- **`as-technical`:** tests, logging, metrics, documentation, refactors and neighboring features.
- **`as-business`:** product and experience improvements: confirmations, clearer messages, shortcuts, accessibility, useful information for the user or whoever supports them, reports.
- **`as-new-spec`:** what can wait for a phase 2, with the reason it can wait.

### 7. What I would do differently
How it should have been designed from the start, aiming for **what is right rather than what is quick**, even if it costs more. It does not repeat the defects from section 5; it proposes the design that would have prevented them at the root. Each item has three parts: **Today** (how it is built), **I would do it like this** (the concrete design) and **Why** (the principle behind it and the cost of the change).
- **`as-technical`:** security by design, layering, contracts, data model, tests and logic duplicated across channels.
- **`as-business`:** flow, error prevention, messages, consistency between channels, accessibility and privacy.
- **`as-new-spec`:** becomes the project's **design decisions**: the decision, the rejected alternatives (including any quicker shortcut and why it was rejected) and the accepted cost.

### 8. Related
A table of what this flow touches or what touches it, and how they relate.
- **`as-technical`:** modules, functions, endpoints, screens, tables, jobs and external services, with their location.
- **`as-business`:** related processes and screens, and who uses them.
- **`as-new-spec`:** modules and integrations the new module needs or feeds, with the contract between them.

### Closing
If something is urgent, a final line points it out. In `as-new-spec`, the mistakes found in the current system go into the specification as generic lessons ("Mistakes this specification prevents": the pattern, why it matters, the requirement that prevents it and an acceptance test), so the new team knows why each rule exists and does not repeat them. Their exact location in the current code never goes into the specification, because they are still open in production and the document is meant to be handed over; it is named briefly in the chat and recorded in full in the traceability file.

### Traceability file (`as-new-spec` only)
Next to the specification, `as-new-spec` always writes an internal `<topic>-as-new-spec-traceability.md`. It maps every requirement and design decision to what motivated it (a defect it prevents, a current case it keeps, something missing today, or domain practice), with `file:line` evidence from the current system, and records the critical risks and other defects of the current system. It is the one file allowed to mention the current code and the organization's real name, and it is not meant to be handed over.

### New or existing, here or elsewhere (`as-new-spec` only)
`as-new-spec` covers four situations along two questions. **Does it exist?** If it does, the current implementation is the source of knowledge and its defects become requirements; if not, the knowledge comes from the project around it (users, roles, storage, conventions) and from the domain's usual practices, with scope choices left as open decisions. **Where will it be built?** In this project (aligned with its stack, integrating by name with the existing modules) or in a new project (technology-neutral and anonymized). Before the long investigation it does a quick search and asks one question, showing what it found, unless your request already says the destination explicitly ("in this project", "for a new project"); "create" or "from scratch" alone do not:

> *I did not find a document management module. There is a file storage service I would build on. Where is this specification for? a. A new module in this project (recommended) · b. A new project.*

### Technology (`as-new-spec` only)
When the specification is for **this project**, it uses the current stack. When it is for **a new project**, the skill cannot know the target stack, so by default the specification is **technology-neutral**: it neither inherits the current stack nor picks one.
- **Requirements are written as capabilities, not products**: "the database must guarantee that no two active bookings share a time slot, even under concurrent requests", not "use a PostgreSQL exclusion constraint". What was learned survives any stack.
- **"What the chosen stack must support"**: a checklist of capabilities derived from what was learned, to evaluate candidate stacks without choosing one.
- **Pitfalls of the current stack** (framework defaults, library settings) go in the traceability file, useful if the new project keeps that technology.
- **To target a stack, name it in the request**: `/module-report bookings as-new-spec for Go and PostgreSQL`. The design is then aligned with it and each capability says how that stack provides it.
- **To get a recommendation, ask for it**: it comes as an open decision comparing two or three stacks against the checklist, never baked into the design.

## Requirements

The skill is instructions in Markdown; what it needs is an assistant that can work inside your project:

| Requirement | Why |
|---|---|
| **Read access to the repository** (search files, open them, list folders) | The whole report is built from the actual code: entry points, validations, data, permissions and UI texts. Without it, it can only analyze what you paste into the chat. |
| **All related repositories within reach** (e.g. backend and frontends in sibling folders) | A flow usually crosses repos: the endpoint lives in the API and the screen that calls it in a frontend. Cross-repo traceability and the "Related" section depend on it. |
| **Write access to `docs/module-reports/`** *(recommended)* | To save the report as a file, and the first time in a project to add the ignore rule if you choose to keep reports local. Without it, the full report is delivered in the chat. |
| **Ability to run read-only commands** *(recommended)* | Used for `git log` on key files, to understand why something is the way it is. Optional. |
| **Support for the Agent Skills format** *(recommended)* | Lets the assistant activate the skill on its own when you ask to explain or analyze something, and load the reference files only when needed. Without it, you have to provide the instructions manually (see below). |
| **A capable model with a large context window** | Analyzing a full module means reading many files across repos and writing a long, structured report. |

It never writes code, runs migrations or deploys anything. The only files it writes are the reports in `docs/module-reports/` and, once per project and only if you choose it, an ignore rule. It needs no network access.

## Installation

Clone the repository into the skills folder of the tool you use:

```bash
git clone https://github.com/djcesar/skill-module-report.git <skills-folder>/module-report
```

- **Tools that support Agent Skills** (agentic coding assistants and IDE agents): each one looks for skills in its own folder, either per user or per project. Check your tool's documentation for the exact path. Once installed, it activates when you ask to explain, analyze or document something in the code, without naming it; tools with slash commands also let you invoke it as `/module-report`.
- **Tools without skill support** (or a plain chat): give the assistant the contents of `SKILL.md` as instructions, plus the reference file for the mode you want (`references/as-technical.md` or `references/as-business.md`, and also `references/as-new-spec.md` for a new-project spec). Then ask for the analysis normally.

Results are best in agent-style tools that work directly inside the repository; in a chat without file access the report loses its `file:line` references and its cross-repo view.

## Tests

`evals/` contains test cases built on a fictional project, `evals/fixtures/club-bookings/`: a court-booking system for a sports club, with an API and a web portal, that has ten deliberate flaws. The sample app is a Spanish-language app on purpose, so the tests also check that UI texts are quoted exactly as they appear even when the report is in English. The answer key is in `evals/fixtures/club-bookings.answer-key.md`, outside the folder the agent sees.

| Case | What it checks |
|---|---|
| `booking-as-technical` | Report location and summary, sections, which flaws are detected, certainty labels, sequence diagram, and that a decoy (an unreachable branch that looks like a data leak) is not reported as a vulnerability |
| `booking-as-business` | User stories, literal UI texts, risks by impact, flowchart, no jargon, English headings |
| `booking-as-new-spec` | Anonymization, state machine and data model, requirements that prevent the flaws, traceability file |
| `booking-git-local` | First report in a git repository: asks repo or local, adds the ignore rule without touching existing ones, does not commit |
| `booking-new-module` | `as-new-spec` for a module that does not exist yet: asks the destination first, aligns with the current stack, integrates with existing pieces and leaves scope choices as open decisions |
| `booking-spanish` | A request in Spanish produces a report fully in Spanish |

The cases follow the `claude plugin eval` layout (`prompt.md`, `case.yaml`, `graders/`), but the graders are plain sentences, so any agent or person can grade a run by reading them.

## Languages

The skill's instructions are in English. Reports are written in the language of the request, with every heading translated; mode names are never translated. A Spanish translation of the instructions is available in [`docs/es/`](docs/es/) for reading only; if it differs from the English version, the English version wins.

## Structure

```
SKILL.md                    workflow and mode selection (what the agent reads)
references/as-technical.md  as-technical template
references/as-business.md   as-business template and how to extract the user's view from the code
references/as-new-spec.md   how to turn the analysis into a specification for a new project
evals/                      test cases and the fictional sample project
docs/es/                    Spanish translation of SKILL.md and references, for reading only
CHANGELOG.md                version history
LICENSE, NOTICE             Apache 2.0 license and attribution notice
CONTRIBUTING.md             how to contribute
README.es.md                this README in Spanish
```

It does not modify code or deploy anything. The only files it writes are the reports in `docs/module-reports/` and, once per project and only if you choose it, an ignore rule.

## Contributing

module-report gets better with every real project it meets, and contributions of any size are welcome:

- ⭐ **Star the repository** so more people can find it.
- 🐛 **[Open an issue](https://github.com/djcesar/skill-module-report/issues)** when a report misses a flaw, picks the wrong mode or comes out in mixed languages, or to propose an idea.
- 🧪 **Add a test case** in `evals/`: it is the best way to make sure an improvement stays working.
- 🌍 **Improve or add a translation.**
- 🔧 **Send a pull request.** Read [CONTRIBUTING.md](CONTRIBUTING.md) first: it explains how the repository is organized and the short checklist every change follows.

If you use it at work or in a project, sharing it or telling us how it went also helps a lot.

## License

Licensed under the [Apache License 2.0](LICENSE). You may use, modify and redistribute it, including commercially, as long as you keep the license and the [NOTICE](NOTICE) file and mark the files you changed. Copyright 2026 Cesar Vasquez.
