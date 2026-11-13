# Modo "desde cero": especificación para construirlo nuevo

El usuario no quiere saber cómo está hecho hoy: quiere la **documentación base para construir este módulo, flujo o función en un proyecto nuevo, bien hecho desde el principio**. El sistema actual es tu fuente de conocimiento del dominio (qué hace, para quién, qué reglas tiene, qué salió mal), pero el documento final describe **lo que debe construirse**, no lo que existe.

Piensa en quien lo va a leer: un equipo que arranca un proyecto limpio y va a usar este documento como punto de partida para estimar, diseñar y construir. No conoce el sistema viejo y no le sirve que se lo cuenten; le sirve saber qué construir, cómo y por qué.

## Cómo se transforma lo que encontraste

- **"Qué haría diferente" deja de ser una opinión y pasa a ser el diseño.** Los rediseños que propondrías se vuelven la arquitectura, el flujo y las reglas de la especificación.
- **Los defectos no se describen, se previenen.** Cada bug o riesgo que viste en el sistema actual se convierte en un requisito, una regla o un criterio de aceptación que lo hace imposible. Por ejemplo, "el endpoint de actualizar usuario era público y aceptaba el rol" se convierte en "RNF-SEG-2: ningún endpoint acepta campos de rol o estado desde el cliente; el cambio de rol es una acción de administración auditada". No cuentes la historia del error.
- **Los casos de uso son los que debe tener, no solo los que tiene.** Si al sistema actual le falta un caso evidente (corregir un dato, reenviar un enlace, ver el historial), inclúyelo. Si un caso actual existe solo por un parche, déjalo fuera.
- **Lo que no puedes decidir tú va como decisión abierta**, con opciones y tu recomendación. No inventes reglas legales o de negocio que el código no sostenga.

## Limpieza del documento

El documento tiene que poder entregarse a otra organización o a otro equipo sin modificarlo:

- **Sin referencias al código actual.** Nada de rutas de archivos, nombres de clases o endpoints viejos, ni números de línea. Tampoco va la línea de "Referencias técnicas" al final.
- **Sin nombres propios de la organización.** Reemplaza el nombre de la organización por su rol genérico, y haz lo mismo con sus derivados: siglas, dominios, nombres de apps y repositorios, correos.
  - Un partido político ("Partido Ejemplo", su sigla "PE") → "el Partido"; una clínica → "la Clínica"; una empresa → "la Empresa"; una universidad → "la Universidad".
  - Dominios y correos (`partidoejemplo.org`, `pe+…@…`) → `<dominio>`, `<correo-de-sistema>`.
  - Apps y repositorios → por su función: portal del usuario, panel de administración, app móvil, API.
  - Busca el nombre de la organización en el código (textos de UI, plantillas de correo, dominios, nombres de repos) para saber exactamente qué reemplazar.
- **Sin datos reales**: ni nombres de personas, ni documentos, ni correos, ni ids que aparezcan en el código, en semillas o en ejemplos.
- **La tecnología es una recomendación, no una herencia.** Si el proyecto tiene una propuesta de arquitectura o un stack definido, alinéate con eso y dilo. Si no, recomienda con justificación y deja el diseño expresado en conceptos (estados, contratos, permisos) que sobrevivan a un cambio de stack.

## Las ocho secciones en este modo

Mantén los mismos encabezados para que se pueda comparar con la ficha de análisis, pero llénalos así:

```markdown
# <Nombre del módulo> — Especificación base

> **Propósito del documento:** qué se va a construir y para quién, en una o dos líneas.
> **Fuera de alcance:** lo que este módulo no hace (y qué módulo sí lo hace).

## Descripción
Qué problema resuelve, actores, y un **glosario** de los términos y estados del dominio
(p. ej. "Afiliado", "Desafiliado", "Reafiliación"). Incluye el **ciclo de vida** del objeto
principal como máquina de estados: estados, transiciones, quién dispara cada una.

## Casos de uso
Completos y correctos (ver arriba). En negocio: historias con criterios Dado/cuando/entonces.
En técnica: caso, actor, precondiciones, flujo principal, alternos y errores, postcondiciones.

## Features o características requeridas
- **Requisitos funcionales** numerados (RF-1…), cada uno trazable a un caso de uso.
- **Requisitos no funcionales** (RNF-SEG, RNF-PRIV, RNF-AUD, RNF-REND, RNF-ACC…):
  seguridad, privacidad y datos personales, auditoría, rendimiento, accesibilidad, disponibilidad.
- En negocio: pantallas con sus campos y botones (tabla), mensajes y comunicaciones.
- En técnica: modelo de datos (entidades, campos clave, restricciones), contratos de API
  por caso de uso (método, ruta, quién puede, entrada, salida, errores), **matriz de permisos**
  (rol × acción, por dueño del registro), eventos e integraciones.

## Cosas importantes a tener en cuenta
Reglas de negocio e invariantes (lo que nunca puede pasar), restricciones legales o normativas,
orden obligatorio de pasos, consistencia entre canales, migración de datos si se reemplaza un
sistema existente.

## Cosas a resolver
**Decisiones abiertas** antes de construir: preguntas para negocio, jurídica u operación.
Cada una con opciones, impacto y tu recomendación. No son bugs: aquí no hay sistema todavía.

## Cosas que sería bueno incluir
Lo que queda para una **fase posterior** (v2): valioso pero no necesario para la primera entrega.
Di por qué puede esperar.

## Qué haría diferente
Aquí se convierte en las **decisiones de diseño** clave, en formato corto de ADR:
- **Decisión:** lo que se hace.
- **Alternativas descartadas:** las otras formas razonables, incluida la que tenía el sistema
  anterior, descrita de forma genérica ("estado repartido en varias banderas"), sin nombrarlo.
- **Por qué:** el principio, el riesgo que evita y el costo que se acepta.

## Relacionados
Módulos e integraciones que el nuevo módulo necesita o alimenta, con el contrato entre ellos
(qué le pide o qué le entrega a cada uno). Nombres genéricos, no los del sistema actual.
```

## Combinación con técnico y negocio

- **"Desde cero" + negocio**: especificación funcional (historias, pantallas, reglas, decisiones abiertas para negocio).
- **"Desde cero" + técnico**: especificación técnica (modelo, contratos, permisos, decisiones de arquitectura).
- **"Desde cero" sin más**: entrega ambas, primero la funcional y luego la técnica, porque una documentación base de proyecto necesita las dos. Que no se contradigan: los RF y las historias deben usar la misma numeración o una tabla de trazabilidad.

Si viste riesgos críticos en el sistema actual, avísalos **fuera de la especificación**: en el chat, después del documento, nunca dentro de él ni en su archivo. Así el documento se puede entregar tal cual sin arrastrar detalles del sistema viejo.

Antes de entregar, revisa el documento buscando el nombre de la organización, rutas de archivos y nombres de clases o endpoints actuales. Si encuentras alguno, reemplázalo.
