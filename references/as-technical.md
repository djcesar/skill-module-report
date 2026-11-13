# Modo `as-technical`

Para quien va a desarrollar, revisar o tocar el código. Cita archivos como enlaces markdown relativos con línea (`[users.service.ts:120](src/users/users.service.ts:120)`).

```markdown
# <Nombre del flujo/módulo>

> **Alcance:** qué revisaste (repos/carpetas/archivos clave) y qué quedó fuera.

## Descripción
Qué es, para qué existe y cómo funciona, en 1–2 párrafos. Luego el recorrido en pasos numerados
(entrada → validación → lógica → datos → respuesta/efectos), con enlaces a los archivos.

## Casos de uso
Lista de "**Actor** quiere/necesita **objetivo**" con el disparador. Incluye los caminos alternos
y de error relevantes (dato inválido, sin permiso, recurso inexistente), no solo el feliz.

## Features o características requeridas
Lo que el flujo necesita hacer/tener para funcionar: entradas y salidas, validaciones, reglas
de negocio, permisos, dependencias (servicios, tablas, variables de entorno, integraciones).
Si conviene, agrúpalas (Funcionales / Datos / Configuración / Seguridad).

## Cosas importantes a tener en cuenta
Lo que alguien debe saber antes de tocarlo o usarlo: efectos secundarios, invariantes,
acoplamientos, orden de operaciones, diferencias entre ambientes, trampas conocidas,
rendimiento, seguridad. Lo que rompe algo si se cambia sin cuidado.

## Cosas a resolver
Defectos y deudas concretas encontradas: bugs, validaciones faltantes, TODO/FIXME, código
muerto, inconsistencias entre capas, riesgos de seguridad. Cada uno con evidencia (archivo:línea)
y una severidad (🔴 alta / 🟡 media / 🟢 baja). Si no hallaste nada, dilo.

## Cosas que sería bueno incluir
Mejoras opcionales que aportarían valor (tests, logs, métricas, UX, documentación,
refactors, funcionalidades vecinas). Esto es lo deseable; lo que está roto va arriba.

## Qué haría diferente
Cómo lo habría diseñado desde cero con lo que ahora sabes del flujo, buscando lo correcto
y no lo rápido. Cada punto con tres partes:
- **Hoy:** cómo está hecho (con evidencia).
- **Lo haría así:** el diseño concreto (patrón, estructura, contrato, modelo de datos).
- **Por qué:** el principio o la consecuencia que lo justifica, y el costo de cambiarlo.

## Relacionados
| Elemento | Tipo | Relación | Ubicación |
(módulo, función, endpoint, pantalla, tabla, job, servicio externo…; relación: "lo llama",
"es llamado por", "escribe en", "comparte entidad", "flujo hermano"…)
```

- **"Features requeridas" describe lo que el flujo necesita, no un wishlist**: deriva de lo que el código hace y exige (validaciones, config, permisos). Las ideas nuevas van en "Sería bueno incluir".
- **"Qué haría diferente" en `as-technical`** piensa en ejes como estos (usa los que apliquen):
  - Seguridad por diseño: denegar por defecto, autorización en el servidor por rol y por dueño del registro, secretos fuera del código, mínimo privilegio.
  - Capas y responsabilidades: controladores delgados, lógica de negocio en un solo lugar, sin reglas duplicadas entre front y back.
  - Contratos: DTOs validados, errores con el código HTTP correcto, idempotencia, versionado.
  - Datos: integridad en la base (claves, restricciones, transacciones), identificadores no adivinables, sin estado partido entre sistemas.
  - Operación: pruebas automatizadas del flujo, logs estructurados sin datos sensibles, observabilidad.
  - Consistencia entre canales: un solo lugar para la lógica que hoy está copiada en web y móvil.
