> **Traducción de referencia, solo para leer.** El agente usa la versión en inglés ([SKILL.md](../../SKILL.md)). Si hay diferencias, manda la versión en inglés.

# Analizar módulo

El objetivo es que quien lo pidió termine entendiendo **qué es, cómo funciona, qué le falta y qué toca** una parte del sistema, sin tener que leer el código. Por eso la ficha se basa en el código real del proyecto, no en suposiciones: cada afirmación importante debería poder rastrearse a un archivo. (En `as-new-spec` el código se usa igual para entender el dominio, pero el documento final no lo cita.)

Es un trabajo de lectura. No modifiques código, no corras migraciones ni despliegues; si algo merece arreglarse, va en "Cosas a resolver". Lo único que escribes son los archivos de la ficha y, la primera vez en un proyecto, la regla de `.gitignore` si el usuario la elige (ver paso 4).

## 0. Elegir el modo

Hay tres modos. Los nombres son identificadores fijos: úsalos igual en cualquier idioma, sin traducirlos.

- **`as-technical`** → [references/as-technical.md](references/as-technical.md). Para quien va a desarrollar o tocar el código: archivos, servicios, datos, configuración, deuda técnica.
- **`as-business`** → [references/as-business.md](references/as-business.md). Para producto, negocio, QA, soporte o el cliente: historias de usuario, pantallas, botones, campos, mensajes y reglas; lo técnico solo si es crítico y contado por su impacto.
- **`as-new-spec`** → además lee [references/as-new-spec.md](references/as-new-spec.md). Ya no es una ficha de cómo está el sistema: es la especificación para construirlo bien en un proyecto limpio. "Qué haría diferente" pasa a ser el diseño, los defectos se convierten en requisitos que los previenen, y el documento sale sin referencias al código actual ni nombres propios de la organización. Se combina con `as-technical` o `as-business`, que dan el contenido de cada sección; `as-new-spec` dice cómo transformarlo. Si no dice con cuál, entrega ambas.

Elige así:
- Si el usuario nombra uno o varios modos (`as-business`, `as-technical as-business`…), usa exactamente esos.
- Si no, deduce por cómo lo pidió:
  - `as-business` si menciona negocio, funcional, historias de usuario, criterios de aceptación, producto/PO/cliente/QA, "sin cosas técnicas", "botones y campos", "cómo lo usa el usuario".
  - `as-new-spec` si pide "desde cero", "como si fuera nuevo", "para un proyecto nuevo", "especificación", "documentación base" o "cómo debería construirse".
  - `as-technical` si menciona código, implementación, "lo voy a tocar/modificar/refactorizar", o no da pistas.
- Si pide técnico y negocio, entrega primero `as-business` y luego `as-technical`, como dos fichas separadas.
- En `as-new-spec`, si el pedido nombra el stack destino ("as-new-spec para Go y PostgreSQL"), úsalo; si no, la especificación queda neutral en tecnología (ver su referencia).

Lee la referencia que corresponda antes de escribir; trae la plantilla y cómo llenarla.

## 1. Ubicar el objetivo

Interpreta la solicitud (puede venir como nombre de negocio — "el reset de contraseña" — o técnico — `UsersService.update`). Busca en el código por nombres, rutas, textos de UI, nombres de tablas y sinónimos en ambos idiomas (p. ej. "afiliación", "affiliation", "affiliate").

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
7. **Contexto**: tests existentes, README, AGENTS.md/CLAUDE.md u otras notas para agentes, docs, comentarios TODO/FIXME/HACK, y si hay git, `git log` reciente de los archivos clave (sirve para entender por qué está como está).

En `as-business` el peso se corre hacia los fronts (plantillas, textos, validaciones de formulario, mensajes); el backend sirve para confirmar reglas, comunicaciones y riesgos. Su referencia dice qué buscar.

Si el directorio de trabajo contiene varios repos hermanos (p. ej. un backend y sus fronts), busca también en ellos: el endpoint del backend suele tener una pantalla que lo llama, y eso es parte del flujo y de "Relacionados".

Si el proyecto tiene notas o memoria previas sobre el tema, úsalas como pista, pero confírmalas contra el código: pueden estar desactualizadas.

### Revisión de riesgos (en todos los modos)

Revisa siempre esta lista sobre las acciones del flujo, aunque el modo sea `as-business` o `as-new-spec` y el foco esté en pantallas o en el diseño. Son los riesgos que más daño hacen y los que más se escapan cuando solo se miran pantallas o solo la lógica feliz, porque una pantalla que esconde un botón no impide que el sistema acepte la acción.

1. **Acciones sin sesión**: ¿qué rutas, funciones o reglas se pueden ejecutar sin autenticarse? Si es intencional (registro, recuperar contraseña), ¿qué expone o permite?
2. **Autorización por rol en el servidor**: ¿el backend verifica el rol, o solo lo hace la interfaz?
3. **Autorización por dueño del registro**: ¿se puede ver o cambiar un registro ajeno cambiando un id en la URL o en el body?
4. **Campos sensibles desde el cliente**: ¿se aceptan rol, estado, aprobación, dueño, precios u otros campos que el cliente no debería fijar? (asignación masiva, validación que no descarta campos de más).
5. **Datos personales expuestos**: en respuestas, logs, URLs, PDFs o mensajes de error que revelan si una persona existe.
6. **Identificadores y enlaces adivinables**: ids secuenciales como única protección, enlaces o tokens sin vencimiento o reutilizables.
7. **Secretos**: llaves o credenciales en el código, en el cliente o en el repositorio.
8. **Abuso y costo**: envíos de correo/SMS, cargas de archivos o procesos pesados que se pueden disparar sin límite.

Cómo se reporta cada riesgo depende del modo: en `as-technical` con su mecanismo y evidencia; en `as-business` por su impacto; en `as-new-spec` como requisito que lo previene (RNF-SEG) más una entrada genérica en "Errores que esta especificación previene" con su prueba de aceptación, y, si existe en el sistema actual, con su ubicación exacta en el archivo de trazabilidad. Si un punto no aplica al flujo, no lo menciones.

### Repartir la investigación (si tu herramienta lo permite)

Un módulo completo en varios repos puede llevar muchos minutos si lo recorres solo. Si tu herramienta permite delegar en subagentes y el objetivo abarca dos o más repos o componentes grandes, reparte la exploración: un subagente por repo o componente (p. ej. API, portal web, app móvil), todos a la vez.

- Dale a cada uno un encargo concreto: qué flujo seguir, qué buscar (entradas, validaciones, datos, permisos, textos de pantalla según el modo) y que devuelva **hechos con `archivo:línea`**, no prosa ni conclusiones.
- Incluye la revisión de riesgos en el encargo del backend.
- Tú unes los resultados, cruzas los repos (qué pantalla llama a qué endpoint), **verificas tú mismo cada 🔴** (ver paso 3) y escribes la ficha. La verificación y la escritura no se delegan: son las que dan coherencia y confianza.

Para una función o un flujo pequeño, hazlo tú directamente: repartir cuesta más de lo que ahorra.

Dosifica la profundidad según el tamaño del objetivo: una función pide unos pocos archivos; un módulo completo pide recorrer sus entradas principales. Si algo quedó fuera (por tamaño o porque vive en otro sistema que no puedes ver), dilo en el alcance en vez de rellenar.

## 3. Distinguir hecho de inferencia

La ficha es útil en la medida en que se pueda confiar en ella. Lo que viste en el código se afirma; lo que es deducción (intención de negocio, comportamiento en producción, uso real) se marca con "(inferido)" o "probablemente". No inventes casos de uso, campos, mensajes ni requisitos que el código no sostenga.

**Verifica cada hallazgo 🔴 antes de escribirlo.** Un riesgo alto falso le quita credibilidad a toda la ficha, y uno de seguridad puede hacer que alguien actúe en vano o con alarma. Antes de reportarlo, vuelve a abrir el código exacto y confirma la cadena completa, no solo una pieza. Por ejemplo, que una ruta sea pública no basta: confirma que el decorador aplica a esa ruta (y no a la de al lado), que no hay otra protección más adelante (un guard global, un middleware, una regla de base de datos), y que el campo peligroso llega de verdad hasta la escritura.

Marca cada 🔴 con su nivel de certeza:
- **(verificado en código)**: confirmaste la cadena completa leyendo el código.
- **(inferido)**: lo deduces, pero falta una pieza que no pudiste ver (otro sistema, configuración de producción).

Y salvo que lo hayas ejecutado, agrega **"no probado en vivo"**: leer el código no es lo mismo que reproducirlo. Si después de revisar no se sostiene, bájale la severidad o conviértelo en una pregunta en "Cosas a resolver".

## 4. Entregar la ficha

Escribe la ficha en el idioma del usuario (por defecto español), con la plantilla de la referencia elegida. Las plantillas están en español; si la ficha va en otro idioma, traduce **todos** los encabezados y etiquetas para que no quede una mezcla. Los nombres de los modos (`as-technical`, `as-business`, `as-new-spec`) no se traducen nunca. En inglés usa estos:

| Español | English |
|---|---|
| Alcance / Resumen | Scope / Summary |
| Descripción | Description |
| Casos de uso | Use cases |
| Features o características requeridas | Required features |
| Cosas importantes a tener en cuenta | Things to keep in mind |
| Cosas a resolver | Issues to fix |
| Cosas que sería bueno incluir | Nice to have |
| Qué haría diferente (Hoy / Lo haría así / Por qué) | What I would do differently (Today / I would do it like this / Why) |
| Relacionados | Related |
| Como… quiero… para… / Dado… cuando… entonces… | As a… I want… so that… / Given… when… then… |
| (verificado en código) / (inferido) / no probado en vivo | (verified in code) / (inferred) / not tested live |

Para otro idioma, traduce con el mismo criterio. El título debe nombrar lo que se pidió y el modo (p. ej. "Afiliaciones y afiliados — as-business"), para que se reconozca entre varias.

**La ficha completa siempre va a un archivo; en el chat va solo el resumen.** Las fichas de un módulo completo pasan fácilmente de 300 líneas: en el chat se cortan, no se pueden compartir y se pierden. En un archivo se leen bien, se versionan y se pueden comparar en el tiempo.

- **Dónde:** `docs/reports/` en la raíz del directorio de trabajo (créala si no existe). Si el directorio de trabajo agrupa varios repos hermanos, va en esa raíz común, no dentro de uno de ellos.
- **Nombre:** `<tema>-<modo>.md` en minúsculas y con guiones, con las palabras del usuario (p. ej. `afiliaciones-as-new-spec.md`, `reset-contrasena-as-business.md`); nunca un nombre genérico como `respuesta.md`. Si pidió varios modos, un archivo por modo. `as-new-spec` usa como sufijo el modo con que se combina (`<tema>-as-new-spec-as-business.md`, `<tema>-as-new-spec-as-technical.md`; los dos cuando va solo) y agrega siempre `<tema>-as-new-spec-traceability.md` (ver su referencia).
- **Si ya existe** un archivo con ese nombre, no lo sobrescribas: es la ficha anterior y sirve para comparar. Usa `<tema>-<modo>-AAAA-MM-DD.md`.
- **No hagas commit** del archivo; avisa que quedó creado y que decide el usuario. Antes de crear la carpeta por primera vez, mira la sección siguiente.
- **Si no puedes escribir archivos** (herramienta sin acceso de escritura, chat sin sistema de archivos), entrega la ficha completa en el chat, como única excepción.

### Primera ficha en un proyecto: ¿viaja al repo o queda local?

Las fichas pueden contener hallazgos de seguridad con su ubicación exacta en el código ("este endpoint es público y deja cambiar el rol, `archivo:línea`"). En un repo público eso es una guía para atacar el sistema, y aun en uno privado no todos los que tienen acceso deberían verlo. Por eso la decisión se toma una vez por proyecto, antes de escribir la primera ficha, y la toma el usuario.

**Cuándo preguntar:** solo si `docs/reports/` todavía no existe **y** la carpeta donde iría está dentro de un repositorio git. Si la carpeta ya existe, la decisión ya se tomó: respétala y no vuelvas a preguntar. Si no hay repo git (p. ej. una carpeta que agrupa repos hermanos), no hay nada que versionar y no se pregunta.

**Qué preguntar**, antes de crear la carpeta, con estas opciones y la primera como recomendada:
1. **Solo local, para todo el equipo** (recomendada): agrega `docs/reports/` al `.gitignore` del repo. Protege también a quien clone el repo, pero es un cambio en un archivo versionado: avisa que hay que hacerle commit.
2. **Solo local, solo en esta máquina**: agrega `docs/reports/` a `.git/info/exclude`. No toca nada versionado, pero no protege a los demás.
3. **Que viajen al repo**: las fichas se pueden subir como cualquier documento.

Si la herramienta no permite hacer preguntas (p. ej. una ejecución automática), aplica la opción 1 y dilo en el chat.

**Al agregar la regla**, ponle un comentario que explique por qué (`# Fichas de module-report: pueden contener hallazgos de seguridad`). Si el archivo no existe, créalo. Nunca borres ni reordenes lo que ya tiene.

**Si eligió que viajen al repo**, mantén dos protecciones:
- Los archivos de trazabilidad de `as-new-spec` siempre llevan rutas del código actual y sus riesgos: agrega `docs/reports/*-traceability.md` al `.gitignore` igual, y dilo.
- Si puedes saber que el repo es **público** (con la CLI de la plataforma o la configuración del remoto) y la ficha tiene hallazgos 🔴 de seguridad, avisa antes de escribirla y ofrece dejar esa ficha fuera del repo.

**Si ya había fichas versionadas** (`git ls-files docs/reports` devuelve algo) y el usuario eligió dejarlas locales, el `.gitignore` no las saca del repo: avísalo y dale el comando (`git rm -r --cached docs/reports`), pero no lo ejecutes tú. Tampoco hagas commit del `.gitignore`: esa decisión es del usuario.

En el chat responde con:
1. El **resumen** de la ficha (el mismo que la abre, ver plantillas): 5–8 líneas.
2. El enlace a cada archivo creado.
3. La línea de cierre (abajo), si aplica.

Comunes a todos los modos:

- **"A resolver", "Sería bueno incluir" y "Qué haría diferente" responden preguntas distintas.** "A resolver": ¿qué está mal hoy? (defectos). "Sería bueno incluir": ¿qué le agregaría a lo que existe? (mejoras sobre el diseño actual). "Qué haría diferente": ¿cómo debió diseñarse? (otro enfoque, desde cero). Mezclarlas esconde los problemas reales entre sugerencias. Si un defecto nace de una decisión de diseño, va en "A resolver" con su arreglo puntual, y en "Qué haría diferente" se explica el diseño que lo habría evitado de raíz, sin volver a describir el defecto.
- **"Qué haría diferente" busca lo correcto, no lo fácil.** Propón el diseño bien hecho aunque cueste más o implique rehacer partes, y dilo claramente (costo, qué toca). No lo rebajes a un parche por ser más rápido; el parche ya está en "A resolver". Que cada punto salga de lo que viste en este flujo y no de una lista genérica de buenas prácticas: si no puedes señalar el "Hoy" concreto, el punto sobra. Prioriza: pocos cambios de fondo valen más que muchos cosméticos. Aplica en todos los modos, incluido `as-new-spec`, donde la sección se convierte en las decisiones de diseño: cada una elige la opción correcta sobre el atajo, y el atajo aparece entre las alternativas descartadas con la razón por la que se descartó.
- **Proporción**: una función pequeña puede tener secciones de dos líneas; no infles. Ninguna sección se omite: si no aplica, escribe una línea diciendo por qué.
- **El resumen se escribe al final**, cuando ya conoces todo el análisis, aunque vaya arriba en el archivo.
- **Diagramas Mermaid** (cada plantilla dice cuáles): un diagrama bien hecho explica de un vistazo lo que toma varios párrafos, y GitHub y la mayoría de editores lo muestran. Para que sumen y no confundan:
  - Que digan lo mismo que el texto: si el texto cambia, el diagrama también.
  - Pequeños: hasta unos 12 nodos o participantes. Si no cabe, divide o deja solo el camino principal.
  - Etiquetas en el idioma de la ficha; en `as-business` y `as-new-spec`, sin nombres de archivos ni clases.
  - Sintaxis válida: etiquetas con espacios, tildes, paréntesis o dos puntos entre comillas (`A["Revisar (admin)"]`), ids de nodo sin espacios ni tildes. Un diagrama que no renderiza es peor que ninguno.
  - Solo cuando aportan: una función simple sin estados ni varios componentes no necesita diagrama.

Cierra en el chat con una línea opcional de siguiente paso si hay algo claramente urgente en "Cosas a resolver", sin volver a resumir la ficha. En `as-new-spec`, nombra en el chat los riesgos críticos del sistema actual en una línea cada uno, con el enlace al archivo de trazabilidad donde quedan completos; su ubicación exacta en el código actual nunca va dentro de la especificación, solo su lección genérica (ver la referencia). Si elegiste el modo sin que el usuario lo nombrara, menciona en esa línea que existen los otros y cómo pedirlos (`as-technical`, `as-business`, `as-new-spec`).
