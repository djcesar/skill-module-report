# Clave del proyecto de prueba `club-reservas`

Fallas plantadas a propósito en `club-reservas/` para comprobar que el skill las detecta. Este archivo
queda **fuera** de la carpeta que se copia a cada prueba, para que el agente no lo lea.

| # | Falla | Dónde | Revisión de riesgos |
|---|---|---|---|
| F1 | `GET /reservas/:id` es `@Public()` y devuelve nombre, documento y celular; los ids son autoincrementales | `reservas.controller.ts`, `reserva.entity.ts`, `detalle.page.ts` | 1, 5, 6 |
| F2 | `PUT /reservas/:id` no verifica dueño ni rol, el DTO acepta `estado`, `pagada` y `socioId`, `ValidationPipe` sin `whitelist` y el servicio hace `{...actual, ...dto}` | `reservas.controller.ts`, `reserva.dto.ts`, `main.ts`, `reservas.service.ts` | 3, 4 |
| F3 | `POST /reservas/:id/confirmar` no verifica rol admin en el servidor; solo la UI esconde el botón | `reservas.controller.ts`, `auth.guard.ts`, `reservas-admin.page.html` | 2 |
| F4 | No se impide reservar dos veces la misma cancha, fecha y hora | `reservas.service.ts` (`crear`) | — |
| F5 | Estado duplicado: `cancelar` marca `cancelada = true` pero deja `estado`; "Mis reservas" filtra por `estado`, así que la cancelada reaparece al recargar | `reservas.service.ts`, `mis-reservas.page.ts` | — |
| F6 | Llave del proveedor de SMS escrita en el código | `sms.service.ts` | 7 |
| F7 | `POST /reservas` es público y envía un SMS por cada llamada, sin límite | `reservas.controller.ts`, `reservas.service.ts` | 8 |
| F8 | "Cancelar reserva" no pide confirmación | `mis-reservas.page.html` | — |
| F9 | Cualquier error muestra "Ocurrió un error" | `reservar.page.ts` | — |
| F10 | La pantalla de administración usa el endpoint de "mis reservas", así que el admin solo ve las suyas | `reservas.api.ts` (`todas`) | — |

Nombre de la organización a anonimizar en `as-new-spec`: "Club Deportivo Ejemplo", `clubejemplo.org`.
