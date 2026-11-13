# Modo `as-business`

> **Traducción de referencia, solo para leer.** El agente usa la versión en inglés ([references/as-business.md](../../../references/as-business.md)). Si hay diferencias, manda la versión en inglés.

Para producto, negocio, QA, soporte o el cliente: gente que conoce el proceso pero no el código. La ficha cuenta **qué ve y qué hace cada persona**: pantallas, botones, campos, mensajes, correos y reglas. El código se usa para averiguar todo eso con precisión, pero casi no aparece en la ficha.

## Cómo sacar la vista de usuario del código

Lo que el usuario ve está en los fronts, no en el backend. Busca:

- **Pantallas**: rutas y el título visible de cada página (no el nombre del componente).
- **Botones, enlaces y campos**: el texto literal de las plantillas (HTML/JSX), `label`, `placeholder`, opciones de selects, archivos de traducción.
- **Validaciones visibles**: `required`, `pattern`, `minlength`/`maxlength`, validadores del formulario, botones deshabilitados y la condición que los habilita.
- **Mensajes**: textos de toasts, alerts, errores debajo de los campos, pantallas vacías; y los que vienen del backend y se muestran tal cual.
- **Lo que pasa fuera de la pantalla**: correos, SMS, notificaciones, PDFs generados, y su contenido y destinatario.
- **Quién puede hacer qué**: roles, menús que aparecen o no, apps distintas (web, móvil, administración).

Antes de escribir, aplica en el backend la **revisión de riesgos** de SKILL.md a las acciones clave del proceso (ver, descargar, crear, cambiar). Que la pantalla esconda un botón no significa que el sistema lo impida. Es el riesgo crítico que más se escapa cuando se miran solo pantallas, y justamente el que el negocio necesita conocer.

Escribe los textos de la interfaz tal como aparecen, en negrita (**Guardar**, **¿Olvidaste tu contraseña?**). Así quien lea la ficha los reconoce en la pantalla. Si un texto se arma dinámicamente o no lo pudiste confirmar, dilo.

## Lenguaje

Escribe para alguien que no programa. Términos como endpoint, servicio, DTO, guard, token, query, Firestore o S3 se traducen a lo que significan para el negocio ("el sistema verifica que…", "el archivo queda guardado en la nube") o se omiten. Una regla práctica: si un líder de producto no entendería la palabra, tradúcela.

**Lo técnico entra solo si es crítico**, es decir, si afecta:
- la seguridad o privacidad de datos personales (habeas data, datos de otros afiliados expuestos);
- pérdida o corrupción de información;
- cumplimiento legal o normativo, o dinero;
- que el proceso quede bloqueado o no funcione para un grupo de usuarios.

Aun así, se cuenta por su **impacto** ("⚠️ cualquiera que tenga el enlace puede descargar el formato de otro afiliado, sin iniciar sesión"), no por su mecanismo (`@Public()` en el controlador). Lo técnico no crítico (refactors, código muerto, logs) se deja fuera: no es para este público.

## Plantilla

```markdown
# <Nombre del proceso, como lo llamaría el negocio>

> **Alcance:** qué apps/pantallas se revisaron y qué no se pudo confirmar.
> **Quiénes participan:** roles (afiliado, ciudadano sin cuenta, administrador, operador…).

## Resumen
5–8 líneas sin jerga: qué necesidad resuelve y para quién, los problemas 🔴 por su impacto,
y la mejora de fondo más importante. Es lo mismo que se muestra en el chat.

## Descripción
Qué necesidad resuelve y para quién, en 1–2 párrafos sin jerga. Luego el recorrido típico
como pasos de usuario:
1. En la pantalla **<Título>** (<app>), el <rol> toca **<Botón>**.
2. Escribe <dato> en el campo **<Campo>** y toca **<Botón>**.
3. Recibe <correo/SMS/mensaje> con…

Si el proceso tiene decisiones o caminos alternos (aprobado/rechazado, con o sin cuenta),
agrega un `flowchart` de Mermaid con los pasos del usuario y esas bifurcaciones, usando los
nombres de las pantallas y botones, sin nombres técnicos.

## Casos de uso
Una historia por objetivo distinto del usuario, incluidas las de otros roles (p. ej. el admin).

### HU-1 · <Título corto>
**Como** <rol> **quiero** <acción> **para** <beneficio>.
**Dónde:** <app> → <pantalla> → **<botón o menú>**
**Criterios de aceptación:**
- **Dado** <situación> **cuando** <acción> **entonces** <resultado visible>.
- Caminos alternos y de error con el mensaje que ve el usuario
  (dato inválido, no existe, sin permiso, sin conexión…).

## Features o características requeridas
Lo que el proceso debe tener para funcionar, por pantalla:

**Pantalla: <Título>** (<app>)
| Elemento | Tipo | Obligatorio | Reglas visibles | Mensaje si falla |
|---|---|---|---|---|
| **<Campo>** | Texto / número / lista / archivo / botón… | Sí/No | p. ej. "solo números, 6–10 dígitos" | "<texto literal>" |

**Reglas de negocio**
- RN-1: <regla> (p. ej. "el enlace para cambiar la clave vence en 1 hora").
- **Comunicaciones**: qué correo/SMS/PDF se envía, a quién y qué contiene.

## Cosas importantes a tener en cuenta
Reglas que no se ven a simple vista, diferencias entre canales (web, app móvil, administración),
dependencias con otros procesos, tiempos y vencimientos, datos que se sobrescriben,
y lo que el usuario no ve pero le afecta.

## Cosas a resolver
Problemas desde la experiencia del usuario o el riesgo para la organización: pasos confusos,
mensajes engañosos o ausentes, callejones sin salida, reglas incoherentes entre canales,
más lo técnico crítico contado por su impacto. Cada uno con severidad
(🔴 alta / 🟡 media / 🟢 baja) y dónde se ve (pantalla/botón). Si no hallaste nada, dilo.

## Cosas que sería bueno incluir
Mejoras de producto y experiencia: confirmaciones, mensajes más claros, atajos, accesibilidad,
información útil para el usuario o para quien lo atiende, reportes.

## Qué haría diferente
Cómo habría diseñado la experiencia y el proceso desde cero, buscando lo correcto y no lo rápido.
Cada punto con tres partes:
- **Hoy:** cómo lo vive el usuario (pantalla, pasos, mensajes).
- **Lo haría así:** el rediseño concreto (pasos, pantallas, textos, reglas).
- **Por qué:** el beneficio para el usuario o la organización (menos errores, menos soporte,
  más confianza, cumplimiento), en lenguaje de negocio.

## Relacionados
| Proceso o pantalla | Relación | Quién lo usa |
|---|---|---|
| <p. ej. Inicio de sesión> | Desde aquí se entra al proceso | Afiliado |

---
<sub>**Referencias técnicas** (para ubicarlo en el código): 3–6 archivos clave como enlaces.</sub>
```

- La última línea de referencias existe para que alguien técnico pueda rastrear la ficha sin que el resto tenga que leer código. Mantenla corta.
- **"Qué haría diferente" en `as-business`** piensa en ejes como estos (usa los que apliquen):
  - Flujo: menos pasos, sin callejones sin salida, que el usuario siempre sepa en qué estado está y qué sigue.
  - Prevención de errores: validar mientras escribe, confirmar acciones irreversibles, permitir deshacer o corregir.
  - Mensajes: que digan qué pasó y qué hacer, sin culpar ni revelar datos de otros.
  - Consistencia: el mismo proceso y los mismos textos en web, app y administración.
  - Accesibilidad y móvil: contraste, tamaños táctiles, lectores de pantalla, teclados adecuados por tipo de campo.
  - Confianza y privacidad: pedir solo lo necesario, explicar para qué se usa el dato, dejar constancia de quién hizo qué.
- "Features requeridas" sale de lo que la pantalla realmente pide y valida hoy. Lo que debería pedir y no pide va en "Cosas a resolver" (si es un defecto) o en "Sería bueno incluir" (si es una mejora).
