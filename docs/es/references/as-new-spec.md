# Modo `as-new-spec`: especificación para construirlo nuevo

> **Traducción de referencia, solo para leer.** El agente usa la versión en inglés ([references/as-new-spec.md](../../../references/as-new-spec.md)). Si hay diferencias, manda la versión en inglés.

El usuario no quiere saber cómo está hecho hoy: quiere la **documentación base para construir este módulo, flujo o función en un proyecto nuevo, bien hecho desde el principio**. El sistema actual es tu fuente de conocimiento del dominio (qué hace, para quién, qué reglas tiene, qué salió mal), pero el documento final describe **lo que debe construirse**, no lo que existe.

Piensa en quien lo va a leer: un equipo que arranca un proyecto limpio y va a usar este documento como punto de partida para estimar, diseñar y construir. No conoce el sistema viejo y no le sirve que se lo cuenten; le sirve saber qué construir, cómo y por qué.

## Cómo se transforma lo que encontraste

- **"Qué haría diferente" deja de ser una opinión y pasa a ser el diseño.** Los rediseños que propondrías se vuelven la arquitectura, el flujo y las reglas de la especificación.
- **Los defectos no se describen, se previenen.** Cada bug o riesgo que viste en el sistema actual se convierte en un requisito, una regla o un criterio de aceptación que lo hace imposible. Por ejemplo, "el endpoint de actualizar usuario era público y aceptaba el rol" se convierte en "RNF-SEG-2: ningún endpoint acepta campos de rol o estado desde el cliente; el cambio de rol es una acción de administración auditada". No cuentes la historia del error en el sistema actual; deja la lección como patrón genérico en "Errores que esta especificación previene".
- **Los casos de uso son los que debe tener, no solo los que tiene.** Si al sistema actual le falta un caso evidente (corregir un dato, reenviar un enlace, ver el historial), inclúyelo. Si un caso actual existe solo por un parche, déjalo fuera.
- **Lo que no puedes decidir tú va como decisión abierta**, con opciones y tu recomendación. No inventes reglas legales o de negocio que el código no sostenga.

## Limpieza del documento

La especificación tiene que poder entregarse a otra organización o a otro equipo sin modificarla (el archivo de trazabilidad, más abajo, es la excepción):

- **Lecciones sí, detalles explotables no.** Los errores encontrados en el sistema actual sí van en la especificación, como patrones genéricos (ver "Errores que esta especificación previene"), porque un requisito sin su porqué es el primero que se relaja "para ir más rápido". Lo que queda fuera son los detalles que permitirían atacar el sistema vivo: dónde está hoy cada falla, sus rutas, endpoints e ids. Eso va solo en el archivo de trazabilidad.
- **Sin referencias al código actual.** Nada de rutas de archivos, nombres de clases o endpoints viejos, ni números de línea. Tampoco va la línea de "Referencias técnicas" al final.
- **Sin nombres propios de la organización.** Reemplaza el nombre de la organización por su rol genérico, y haz lo mismo con sus derivados: siglas, dominios, nombres de apps y repositorios, correos.
  - Un partido político ("Partido Ejemplo", su sigla "PE") → "el Partido"; una clínica → "la Clínica"; una empresa → "la Empresa"; una universidad → "la Universidad".
  - Dominios y correos (`partidoejemplo.org`, `pe+…@…`) → `<dominio>`, `<correo-de-sistema>`.
  - Apps y repositorios → por su función: portal del usuario, panel de administración, app móvil, API.
  - Busca el nombre de la organización en el código (textos de UI, plantillas de correo, dominios, nombres de repos) para saber exactamente qué reemplazar.
- **Sin datos reales**: ni nombres de personas, ni documentos, ni correos, ni ids que aparezcan en el código, en semillas o en ejemplos.
- **Neutral en tecnología por defecto.** Solo puedes leer el proyecto actual, no el proyecto para el que es esta especificación, así que su stack es desconocido. No heredes el stack actual (puede ser justo lo que el proyecto nuevo quiere cambiar) ni elijas uno por tu cuenta (sesgaría un documento que debe servir para cualquier decisión). Ver "Tecnología" más abajo para conservar lo aprendido sin nombrar productos.

## Las ocho secciones en este modo

Mantén los mismos encabezados para que se pueda comparar con la ficha de análisis, pero llénalos así:

```markdown
# <Nombre del módulo> — Especificación base

> **Propósito del documento:** qué se va a construir y para quién, en una o dos líneas.
> **Fuera de alcance:** lo que este módulo no hace (y qué módulo sí lo hace).

## Resumen
5–8 líneas: qué se construye, las 3–4 decisiones de diseño que lo definen y las decisiones
abiertas que bloquean el arranque. Es lo mismo que se muestra en el chat.

## Descripción
Qué problema resuelve, actores, y un **glosario** de los términos y estados del dominio
(p. ej. "Afiliado", "Desafiliado", "Reafiliación"). Incluye el **ciclo de vida** del objeto
principal como máquina de estados: estados, transiciones, quién dispara cada una.
Dibújala siempre como `stateDiagram-v2` de Mermaid: en este modo es la pieza central del
diseño y la que el equipo va a implementar.

## Casos de uso
Completos y correctos (ver arriba). Con `as-business`: historias con criterios Dado/cuando/entonces.
Con `as-technical`: caso, actor, precondiciones, flujo principal, alternos y errores, postcondiciones.

## Features o características requeridas
- **Requisitos funcionales** numerados (RF-1…), cada uno trazable a un caso de uso.
- **Requisitos no funcionales** (RNF-SEG, RNF-PRIV, RNF-AUD, RNF-REND, RNF-ACC…):
  seguridad, privacidad y datos personales, auditoría, rendimiento, accesibilidad, disponibilidad.
- Con `as-business`: pantallas con sus campos y botones (tabla), mensajes y comunicaciones.
- Con `as-technical`: modelo de datos (entidades, campos clave, restricciones; con un
  `erDiagram` de Mermaid), un `sequenceDiagram` del caso de uso principal, contratos de API
  por caso de uso (método, ruta, quién puede, entrada, salida, errores), **matriz de permisos**
  (rol × acción, por dueño del registro), eventos e integraciones. Todo en conceptos, no en
  productos (ver "Tecnología").

### Lo que el stack elegido debe soportar
Solo en la especificación técnica. Una lista de capacidades que sale de lo aprendido, para evaluar
stacks candidatos sin elegir ninguno: p. ej. validación de esquema que rechace campos no declarados,
autorización en el servidor por rol y por dueño, transacciones o restricciones de unicidad/exclusión,
un gestor de secretos, una cola con reintentos. Cada ítem dice a qué requisito o error (E-n) sirve.

## Cosas importantes a tener en cuenta
Reglas de negocio e invariantes (lo que nunca puede pasar), restricciones legales o normativas,
orden obligatorio de pasos, consistencia entre canales, migración de datos si se reemplaza un
sistema existente.

### Errores que esta especificación previene
Una entrada por cada error encontrado en el sistema actual (cada riesgo y cada defecto importante),
escrita como **patrón genérico**: qué sale mal y por qué, sin rutas, endpoints, nombres de clases
ni el nombre de la organización. Cada una se conecta con el requisito que la previene y con una
prueba de aceptación que la detectaría si volviera.

| # | Error (patrón genérico) | Por qué importa | Lo previene | Prueba de aceptación |
|---|---|---|---|---|
| E-1 | Asignación masiva: un endpoint acepta el objeto completo desde el cliente, que puede fijar campos que no debería (rol, estado, pago, dueño) | Escalada de privilegios, pagos falsos | RNF-SEG-4 | Enviar `role` o `status` en el cuerpo de un registro responde 400 y no cambia nada |

## Cosas a resolver
**Decisiones abiertas** antes de construir: preguntas para negocio, jurídica u operación.
Cada una con opciones, impacto y tu recomendación. No son bugs: aquí no hay sistema todavía.

## Cosas que sería bueno incluir
Lo que queda para una **fase posterior** (v2): valioso pero no necesario para la primera entrega.
Di por qué puede esperar.

## Qué haría diferente
Aquí se convierte en las **decisiones de diseño** clave, en formato corto de ADR. Elige lo
correcto, no lo fácil ni lo rápido: el diseño bien hecho aunque cueste más construirlo, y dilo.
- **Decisión:** lo que se hace.
- **Alternativas descartadas:** las otras formas razonables, incluida la que tenía el sistema
  anterior, descrita de forma genérica ("estado repartido en varias banderas"), sin nombrarlo.
  Si hay un atajo más rápido o barato, ponlo aquí y di por qué se descartó.
- **Por qué:** el principio, el riesgo que evita y el costo que se acepta (esfuerzo, tiempo,
  complejidad), dicho claramente y no escondido.

## Relacionados
Módulos e integraciones que el nuevo módulo necesita o alimenta, con el contrato entre ellos
(qué le pide o qué le entrega a cada uno). Nombres genéricos, no los del sistema actual.
```

## Tecnología

La especificación tiene que seguir sirviendo con cualquier stack que termine usando el proyecto
nuevo, sin perder lo que enseñó el sistema actual.

- **Escribe los requisitos como capacidades, no como productos.** No "usar una restricción `EXCLUDE`
  de PostgreSQL", sino "la base de datos debe garantizar de forma atómica que no haya dos reservas
  activas en la misma franja, incluso con solicitudes simultáneas". La lección sobrevive a cualquier stack.
- **Convierte las lecciones en la lista del stack** ("Lo que el stack elegido debe soportar"), para
  que el equipo pueda evaluar candidatos contra ella.
- **Las trampas propias del stack actual van al archivo de trazabilidad** ("Lecciones propias del
  stack actual"), p. ej. "en NestJS, un `ValidationPipe` global sin `whitelist` deja pasar campos
  extra". Sirven si el equipo nuevo conserva esa tecnología, sin condicionar a uno que no.
- **Nombra tecnología solo si el usuario dio el stack destino** en el pedido (p. ej. "as-new-spec para
  Go y PostgreSQL"). Entonces alinea el diseño con él, dilo en el alcance, y para cada capacidad
  indica cómo la resuelve ese stack.
- **Si el usuario pide una recomendación**, va en "Cosas a resolver" como decisión abierta: dos o tres
  stacks candidatos comparados contra la lista, con tu recomendación. Nunca metida en el diseño.

## Combinación con `as-technical` y `as-business`

- **`as-new-spec as-business`**: especificación funcional (historias, pantallas, reglas, decisiones abiertas para negocio).
- **`as-new-spec as-technical`**: especificación técnica (modelo, contratos, permisos, decisiones de arquitectura).
- **`as-new-spec` solo**: entrega ambas, primero la funcional y luego la técnica, porque una documentación base de proyecto necesita las dos. Que no se contradigan: los RF y las historias deben usar la misma numeración o una tabla de correspondencia.

## Archivo de trazabilidad

Además de la especificación, escribe siempre un segundo archivo, interno: `<tema>-as-new-spec-traceability.md`, en la misma carpeta. Uno solo, aunque la especificación salga en dos archivos (funcional y técnica).

Por qué existe: la especificación está limpia a propósito, así que por sí sola no dice **de dónde salió cada requisito**. Cuando alguien pregunte "¿por qué está este RNF-SEG?" o "¿esta regla es necesaria?", la respuesta tiene que estar escrita en algún lado. Y los riesgos del sistema actual no pueden quedar solo en el chat, porque se pierden al cerrar la conversación. Ya tienes toda esta información cuando escribes la especificación; aquí solo la anotas.

Este archivo **no se entrega** con la especificación y es la excepción a las reglas de limpieza: aquí sí van rutas de archivos, endpoints y el nombre real de la organización.

```markdown
# <Tema> — as-new-spec · trazabilidad

> **Documento interno.** Explica de dónde sale cada requisito y decisión de la especificación
> `<archivo(s) de la especificación>`. Contiene referencias al sistema actual: no se entrega con ella.

## Requisitos y decisiones → origen
| Requisito o decisión | Qué lo motivó | Evidencia en el sistema actual |
|---|---|---|
| RNF-SEG-4 Contratos estrictos | Hoy el cliente puede fijar estado, pago y dueño | `reservas.controller.ts:29`, `reserva.dto.ts:10` |
| RF-3 Cancelar reserva | Caso actual, se conserva | `mis-reservas.page.html:9` |
| RF-9 Reenviar enlace | Falta hoy (dominio) | — |

Clasifica cada fila por su origen: **defecto que previene** (con evidencia), **caso actual que se
conserva** (con evidencia), **falta hoy** o **práctica de dominio** (sin evidencia de código; di de
dónde lo tomas). No hace falta que todo tenga origen en el código, pero todo tiene que tener origen.

## Riesgos críticos del sistema actual
Los 🔴 que viste, con su marca de certeza y evidencia, como en `as-technical`, cada uno conectado
con su entrada genérica en la especificación (E-1, E-2…). Son los que la especificación previene,
pero siguen abiertos en producción y no deben esperar al proyecto nuevo.

## Otros defectos del sistema actual
Los de severidad media o baja, en una línea cada uno.

## Lecciones propias del stack actual
Trampas de la tecnología actual detrás de los errores de arriba, y cómo evitarlas si el proyecto
nuevo la conserva (p. ej. valores por defecto del framework, configuración de librerías). Cada una
conectada con su E-n.
```

Antes de entregar, revisa la especificación (no la trazabilidad) buscando el nombre de la organización, rutas de archivos y nombres de clases o endpoints actuales. Si encuentras alguno, reemplázalo.
