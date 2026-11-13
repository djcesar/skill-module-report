---
name: analizar-modulo
description: Produce una ficha de análisis de un flujo, módulo, función, endpoint, pantalla o proceso del proyecto actual, investigando el código real, con ocho secciones fijas (Descripción, Casos de uso, Features requeridas, Cosas importantes a tener en cuenta, Cosas a resolver, Cosas que sería bueno incluir, Qué haría diferente, Relacionados). Tiene dos versiones - técnica (archivos, servicios, datos, para quien va a tocar el código) y de negocio (historias de usuario, pantallas, botones, campos y mensajes, sin jerga, para producto/QA/cliente). Úsalo siempre que el usuario pida explicar, analizar, documentar, entender, auditar o "hacer la ficha" de cómo funciona algo: "¿cómo funciona el flujo de X?", "analízame el módulo Y", "dame el panorama de Z antes de tocarlo", "qué falta en el módulo de pagos", "qué está relacionado con esta función", "dame las historias de usuario de X", "qué harías diferente en X", "cómo debió hacerse Y", "explícame X en forma de negocio / funcional / para el PO", "qué botones y campos tiene el proceso de X". También tiene una opción "desde cero" que convierte el análisis en la especificación base para construir ese módulo limpio en un proyecto nuevo (casos de uso, requisitos, diseño correcto, decisiones abiertas, sin bugs ni nombres de la organización); úsala con "desde cero", "como si fuera nuevo", "para un proyecto nuevo", "especificación", "documentación base", "cómo debería construirse X". Actívalo aunque no mencione las secciones ni la palabra "ficha". También en inglés ("walk me through the X flow", "user stories for Y").
---

# Analizar módulo

El objetivo es que quien lo pidió termine entendiendo **qué es, cómo funciona, qué le falta y qué toca** una parte del sistema, sin tener que leer el código. Por eso la ficha se basa en el código real del proyecto, no en suposiciones: cada afirmación importante debería poder rastrearse a un archivo. (En la opción "desde cero" el código se usa igual para entender el dominio, pero el documento final no lo cita.)

Es un trabajo de lectura. No modifiques código, no corras migraciones ni despliegues; si algo merece arreglarse, va en "Cosas a resolver".

## 0. Elegir la versión

Hay dos fichas con las mismas ocho secciones pero distinto público:

- **Técnica** → [references/tecnico.md](references/tecnico.md). Para quien va a desarrollar o tocar el código: archivos, servicios, datos, configuración, deuda técnica.
- **De negocio** → [references/negocio.md](references/negocio.md). Para producto, negocio, QA, soporte o el cliente: historias de usuario, pantallas, botones, campos, mensajes y reglas; lo técnico solo si es crítico y contado por su impacto.

Elige por cómo se pidió:
- Negocio si menciona negocio, funcional, historias de usuario, criterios de aceptación, producto/PO/cliente/QA, "sin cosas técnicas", "botones y campos", "cómo lo usa el usuario".
- Técnica si menciona código, implementación, "lo voy a tocar/modificar/refactorizar", o no da pistas.
- Si pide ambas, entrega primero la de negocio y luego la técnica, como dos fichas separadas.

**Opción "desde cero"** → además lee [references/desde-cero.md](references/desde-cero.md). Se activa si pide el resultado "desde cero", "como si fuera nuevo", "para un proyecto nuevo", "especificación", "documentación base" o "cómo debería construirse". Ya no es una ficha de cómo está el sistema: es la especificación para construirlo bien en un proyecto limpio. "Qué haría diferente" pasa a ser el diseño, los defectos se convierten en requisitos que los previenen, y el documento sale sin referencias al código actual ni nombres propios de la organización. Se combina con técnico o negocio; si no dice cuál, entrega ambas.

Lee la referencia que corresponda antes de escribir; trae la plantilla y cómo llenarla. En "desde cero", la plantilla de técnico o negocio da el contenido de cada sección y la de desde-cero dice cómo transformarlo.

## 1. Ubicar el objetivo

Interpreta la solicitud (puede venir como nombre de negocio — "el reset de contraseña" — o técnico — `UsersService.update`). Busca con Grep/Glob por nombres, rutas, textos de UI, nombres de tablas y sinónimos en ambos idiomas (p. ej. "afiliación", "affiliation", "affiliate").

- Si hay varios candidatos y uno es claramente el más probable, tómalo y dilo en la línea de alcance.
- Pregunta solo si la ambigüedad cambia por completo el análisis (dos módulos distintos con el mismo nombre).
- Si no existe, dilo y propone lo más cercano que encontraste.

## 2. Investigar

Sigue el flujo de punta a punta en vez de leer archivos sueltos. En general:

1. **Puntos de entrada**: rutas/controladores, pantallas o componentes, comandos, jobs/cron, triggers, consumidores de colas, webhooks.
2. **Lógica**: servicios, helpers, validaciones (DTOs, pipes, guards, schemas), reglas de negocio, manejo de errores.
3. **Datos**: entidades/modelos, tablas, colecciones, migraciones, qué se lee y qué se escribe.
4. **Integraciones**: APIs externas, almacenamiento, correo/SMS, colas, otras bases.
5. **Configuración**: variables de entorno, flags, secretos que necesita, diferencias por ambiente.
6. **Permisos**: quién puede ejecutarlo (roles, guards, reglas de seguridad).
7. **Contexto**: tests existentes, README/CLAUDE.md/docs, comentarios TODO/FIXME/HACK, y si hay git, `git log` reciente de los archivos clave (sirve para entender por qué está como está).

En la versión de negocio el peso se corre hacia los fronts (plantillas, textos, validaciones de formulario, mensajes); el backend sirve para confirmar reglas, comunicaciones y riesgos. La referencia de negocio dice qué buscar.

Si el directorio de trabajo contiene varios repos hermanos (p. ej. un backend y sus fronts), busca también en ellos: el endpoint del backend suele tener una pantalla que lo llama, y eso es parte del flujo y de "Relacionados".

Si el proyecto tiene notas o memoria previas sobre el tema, úsalas como pista, pero confírmalas contra el código: pueden estar desactualizadas.

Dosifica la profundidad según el tamaño del objetivo: una función pide unos pocos archivos; un módulo completo pide recorrer sus entradas principales. Si algo quedó fuera (por tamaño o porque vive en otro sistema que no puedes ver), dilo en el alcance en vez de rellenar.

## 3. Distinguir hecho de inferencia

La ficha es útil en la medida en que se pueda confiar en ella. Lo que viste en el código se afirma; lo que es deducción (intención de negocio, comportamiento en producción, uso real) se marca con "(inferido)" o "probablemente". No inventes casos de uso, campos, mensajes ni requisitos que el código no sostenga.

## 4. Entregar la ficha

Responde en el chat, en el idioma del usuario (por defecto español), con la plantilla de la referencia elegida. El título de la ficha debe nombrar lo que se pidió y la versión, con las palabras del usuario (p. ej. "Afiliaciones y afiliados — negocio"), para que se reconozca entre varias. Si además la guardas en un archivo (porque lo pidieron o porque la entrega lo requiere), nómbralo igual en minúsculas y con guiones: `<tema>-<version>.md` (p. ej. `afiliaciones-desde-cero.md`, `reset-contrasena-negocio.md`), nunca un nombre genérico como `respuesta.md`. Comunes a ambas versiones:

- **"A resolver", "Sería bueno incluir" y "Qué haría diferente" responden preguntas distintas.** "A resolver": ¿qué está mal hoy? (defectos). "Sería bueno incluir": ¿qué le agregaría a lo que existe? (mejoras sobre el diseño actual). "Qué haría diferente": ¿cómo debió diseñarse? (otro enfoque, desde cero). Mezclarlas esconde los problemas reales entre sugerencias. Si un defecto nace de una decisión de diseño, va en "A resolver" con su arreglo puntual, y en "Qué haría diferente" se explica el diseño que lo habría evitado de raíz, sin volver a describir el defecto.
- **"Qué haría diferente" busca lo correcto, no lo fácil.** Propón el diseño bien hecho aunque cueste más o implique rehacer partes, y dilo claramente (costo, qué toca). No lo rebajes a un parche por ser más rápido; el parche ya está en "A resolver". Que cada punto salga de lo que viste en este flujo y no de una lista genérica de buenas prácticas: si no puedes señalar el "Hoy" concreto, el punto sobra. Prioriza: pocos cambios de fondo valen más que muchos cosméticos.
- **Proporción**: una función pequeña puede tener secciones de dos líneas; no infles. Ninguna sección se omite: si no aplica, escribe una línea diciendo por qué.

Cierra con una línea opcional de siguiente paso si hay algo claramente urgente en "Cosas a resolver", sin volver a resumir la ficha. En "desde cero" esa línea va fuera del documento y avisa si viste riesgos críticos en el sistema actual, porque la especificación los omite a propósito y no deben perderse. Si elegiste la versión sin que el usuario la pidiera explícitamente, menciona en esa línea que existe la otra.
