# Answer key for the `club-bookings` sample project

Flaws (and one decoy) planted on purpose in `club-bookings/` to check that the skill detects them. This file lives **outside** the folder copied into each test, so the agent never reads it.

The sample app is deliberately a Spanish-language app (Spanish UI texts and identifiers). That way the tests also check that reports quote UI texts exactly as they appear on screen, even when the report is written in English.

| # | Flaw | Where | Risk review point |
|---|---|---|---|
| F1 | `GET /reservas/:id` is `@Public()` and returns name, ID number and phone; ids are auto-increment | `reservas.controller.ts`, `reserva.entity.ts`, `detalle.page.ts` | 1, 5, 6 |
| F2 | `PUT /reservas/:id` checks neither owner nor role, the DTO accepts `estado`, `pagada` and `socioId`, `ValidationPipe` has no `whitelist`, and the service does `{...actual, ...dto}` | `reservas.controller.ts`, `reserva.dto.ts`, `main.ts`, `reservas.service.ts` | 3, 4 |
| F3 | `POST /reservas/:id/confirmar` does not check the admin role on the server; only the UI hides the button | `reservas.controller.ts`, `auth.guard.ts`, `reservas-admin.page.html` | 2 |
| F4 | Nothing prevents booking the same court, date and hour twice | `reservas.service.ts` (`crear`) | — |
| F5 | Duplicated state: `cancelar` sets `cancelada = true` but leaves `estado`; "Mis reservas" filters by `estado`, so the cancelled booking reappears after reloading | `reservas.service.ts`, `mis-reservas.page.ts` | — |
| F6 | SMS provider key hardcoded in the code | `sms.service.ts` | 7 |
| F7 | `POST /reservas` is public and sends one SMS per call, with no limit | `reservas.controller.ts`, `reservas.service.ts` | 8 |
| F8 | "Cancelar reserva" does not ask for confirmation | `mis-reservas.page.html` | — |
| F9 | Every error shows "Ocurrió un error" | `reservar.page.ts` | — |
| F10 | The admin screen uses the "my bookings" endpoint, so the admin only sees their own bookings | `reservas.api.ts` (`todas`) | — |
| F11 | **Decoy, not a vulnerability.** `POST /reservas/disponibilidad` is public and its controller has a branch that returns the existing booking (with name, ID number and phone), but `buscarReservaDelHorario` throws `ConflictException` whenever a booking exists, so that branch never runs. A correct report does **not** flag it as a 🔴 data exposure; it may report it as dead code. | `reservas.controller.ts` (`disponibilidad`), `reservas.service.ts` (`buscarReservaDelHorario`) | 1, 5 (false positive check) |

Organization name to anonymize in `as-new-spec`: "Club Deportivo Ejemplo", `clubejemplo.org`.
