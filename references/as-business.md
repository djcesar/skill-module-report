# Mode `as-business`

For product, business, QA, support or the client: people who know the process but not the code. The report tells **what each person sees and does**: screens, buttons, fields, messages, emails and rules. The code is used to find all of that precisely, but it barely appears in the report.

## How to get the user's view from the code

What the user sees lives in the frontends, not in the backend. Look for:

- **Screens**: routes and the visible title of each page (not the component name).
- **Buttons, links and fields**: the literal text in the templates (HTML/JSX), `label`, `placeholder`, select options, translation files.
- **Visible validations**: `required`, `pattern`, `minlength`/`maxlength`, form validators, disabled buttons and the condition that enables them.
- **Messages**: texts of toasts, alerts, errors under fields, empty screens; and those that come from the backend and are shown as they are.
- **What happens off screen**: emails, SMS, notifications, generated PDFs, with their content and recipient.
- **Who can do what**: roles, menus that appear or not, separate apps (web, mobile, admin).

Before writing, run the **risk review** from SKILL.md on the backend for the process's key actions (view, download, create, change). A screen hiding a button does not mean the system prevents the action. It is the critical risk most often missed when looking only at screens, and exactly the one the business needs to know about.

Quote UI texts exactly as they appear, in bold and in their original language (**Guardar**, **Forgot your password?**), even if the report is in another language. That way readers recognize them on screen. If a text is built dynamically or you could not confirm it, say so.

## Language

Write for someone who does not code. Terms like endpoint, service, DTO, guard, token, query, Firestore or S3 are translated into what they mean for the business ("the system checks that…", "the file is stored in the cloud") or left out. A practical rule: if a product lead would not understand the word, translate it.

**Technical details come in only when critical**, that is, when they affect:
- the security or privacy of personal data (data protection law, other people's data exposed);
- loss or corruption of information;
- legal or regulatory compliance, or money;
- the process being blocked or not working for a group of users.

Even then, describe them by their **impact** ("⚠️ anyone with the link can download another member's form without signing in"), not by their mechanism (`@Public()` on the controller). Non-critical technical details (refactors, dead code, logging) are left out: they are not for this audience.

## Template

```markdown
# <Name of the process, as the business would call it>

> **Scope:** which apps/screens were reviewed and what could not be confirmed.
> **Who takes part:** roles (member, visitor without an account, administrator, operator…).

## Summary
5–8 lines without jargon: what need it meets and for whom, the 🔴 problems by their impact,
and the most important deep improvement. It is the same text shown in the chat.

## Description
What need it meets and for whom, in 1–2 paragraphs without jargon. Then the typical walkthrough
as user steps:
1. On the **<Title>** screen (<app>), the <role> taps **<Button>**.
2. They type <data> in the **<Field>** field and tap **<Button>**.
3. They receive <email/SMS/message> with…

If the process has decisions or alternate paths (approved/rejected, with or without an account),
add a Mermaid `flowchart` with the user's steps and those branches, using the names of the
screens and buttons, with no technical names.

## Use cases
One story per distinct user goal, including those of other roles (e.g. the admin).

### US-1 · <Short title>
**As a** <role> **I want** <action> **so that** <benefit>.
**Where:** <app> → <screen> → **<button or menu>**
**Acceptance criteria:**
- **Given** <situation> **when** <action> **then** <visible result>.
- Alternate and error paths with the message the user sees
  (invalid data, does not exist, no permission, no connection…).

## Required features
What the process must have in order to work, per screen:

**Screen: <Title>** (<app>)
| Element | Type | Required | Visible rules | Message on failure |
|---|---|---|---|---|
| **<Field>** | Text / number / list / file / button… | Yes/No | e.g. "digits only, 6–10" | "<literal text>" |

**Business rules**
- BR-1: <rule> (e.g. "the link to change the password expires in 1 hour").
- **Communications**: which email/SMS/PDF is sent, to whom and what it contains.

## Things to keep in mind
Rules that are not obvious, differences between channels (web, mobile app, admin),
dependencies on other processes, timings and expirations, data that gets overwritten,
and what the user does not see but affects them.

## Issues to fix
Problems from the user's experience or the risk to the organization: confusing steps,
misleading or missing messages, dead ends, rules that differ between channels,
plus critical technical issues described by their impact. Each with a severity
(🔴 high / 🟡 medium / 🟢 low) and where it shows (screen/button). If you found nothing, say so.

## Nice to have
Product and experience improvements: confirmations, clearer messages, shortcuts, accessibility,
useful information for the user or for whoever supports them, reports.

## What I would do differently
How you would have designed the experience and the process from scratch, aiming for what is
right and not what is quick. Each point in three parts:
- **Today:** how the user experiences it (screen, steps, messages).
- **I would do it like this:** the concrete redesign (steps, screens, texts, rules).
- **Why:** the benefit for the user or the organization (fewer errors, less support,
  more trust, compliance), in business language.

## Related
| Process or screen | Relationship | Who uses it |
|---|---|---|
| <e.g. Sign in> | The process starts here | Member |

---
<sub>**Technical references** (to locate it in the code): 3–6 key files as links.</sub>
```

- The final references line exists so a technical person can trace the report without everyone else having to read code. Keep it short.
- **"What I would do differently" in `as-business`** considers axes like these (use the ones that apply):
  - Flow: fewer steps, no dead ends, the user always knows what state they are in and what comes next.
  - Error prevention: validate while typing, confirm irreversible actions, allow undoing or correcting.
  - Messages: say what happened and what to do, without blaming or revealing other people's data.
  - Consistency: the same process and the same texts on web, app and admin.
  - Accessibility and mobile: contrast, touch target sizes, screen readers, the right keyboard for each field type.
  - Trust and privacy: ask only for what is needed, explain what the data is used for, keep a record of who did what.
- "Required features" comes from what the screen actually asks for and validates today. What it should ask for and does not goes in "Issues to fix" (if it is a defect) or "Nice to have" (if it is an improvement).
