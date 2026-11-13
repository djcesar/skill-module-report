# skill-module-report

[English](README.md) · **Español**

Skill para agentes de IA que analiza un flujo, módulo, función o proceso del proyecto donde estés trabajando, leyendo el código real, y entrega una ficha con ocho secciones.

Sigue el formato abierto [Agent Skills](https://agentskills.io) (una carpeta con un `SKILL.md` y archivos de referencia), así que no depende de una sola herramienta ni de un modelo en particular. Ver [Requisitos](#requisitos) e [Instalación](#instalación).

> ⭐ **Si module-report te ahorra tiempo, [dale una estrella al repositorio](https://github.com/djcesar/skill-module-report)**: ayuda a que otros desarrolladores lo encuentren. Las ideas, los reportes de errores y los pull requests son muy bienvenidos, ver [Contribuir](#contribuir).

## Dónde queda la ficha

La ficha completa siempre se guarda como archivo Markdown en `docs/module-reports/`, en la raíz del directorio de trabajo, con un nombre que dice qué se pidió y en qué modo (p. ej. `docs/module-reports/registro-de-usuarios-as-business.md`; un archivo por modo). En el chat solo aparece un resumen de 5 a 8 líneas y el enlace al archivo, así las fichas largas nunca se cortan y se pueden compartir, versionar y comparar en el tiempo.

- Si ya existe un archivo con ese nombre, se conserva y el nuevo lleva la fecha (`…-AAAA-MM-DD.md`).
- El archivo no se sube a git; eso lo decides tú.
- **¿Al repo o solo local?** Las fichas pueden contener hallazgos de seguridad con su ubicación exacta en el código, así que la primera vez que el skill escribe una ficha en un repositorio git pregunta si deben viajar con el repo o quedar locales. Quedar locales (lo recomendado) agrega `docs/module-reports/` al `.gitignore`, o a `.git/info/exclude` si prefieres no tocar archivos versionados. Si eliges el repo, los archivos de trazabilidad se ignoran igual, y avisa antes de escribir hallazgos de seguridad en un repositorio público. Nunca hace commit ni saca nada de git por su cuenta.
- `as-new-spec` escribe además un archivo interno de trazabilidad junto a la especificación (ver abajo).
- Si la herramienta no puede escribir archivos (p. ej. un chat normal), la ficha completa se entrega en el chat.

## Cómo trabaja

- **Sale del código, no de suposiciones.** Sigue el flujo de punta a punta (entradas, lógica, datos, integraciones, configuración, permisos), también entre repos hermanos, y marca como *(inferido)* lo que deduce.
- **Revisión de seguridad en todos los modos.** Siempre revisa acciones sin sesión, control de rol y de dueño del registro en el servidor, campos sensibles aceptados desde el cliente, datos personales expuestos, ids o enlaces adivinables, secretos y abuso (correos/SMS sin límite). Cada modo los reporta a su manera: por mecanismo, por impacto en el negocio o como requisito que los previene.
- **Los hallazgos críticos se verifican dos veces.** Antes de reportar un 🔴, vuelve a leer el código exacto y confirma la cadena completa. Cada uno lleva *(verificado en código)* o *(inferido)*, y *no probado en vivo* salvo que se haya reproducido.
- **Diagramas Mermaid donde ayudan.** Secuencia del camino principal y diagrama de estados en `as-technical`, flujo del usuario en `as-business`, y máquina de estados más modelo de datos en `as-new-spec`. Se ven en GitHub y en la mayoría de editores.

## Qué trae la ficha

Toda ficha abre con una línea de **Alcance** (qué se revisó y qué quedó fuera, para saber hasta dónde llega el análisis) y un **Resumen** de 5 a 8 líneas (qué es, los hallazgos de severidad alta y el cambio más importante). Después vienen las ocho secciones, siempre en este orden. Si una no aplica, la ficha lo dice en una línea; ninguna se omite.

### 1. Descripción
Qué es, para qué existe y cómo funciona, en uno o dos párrafos, seguidos del recorrido paso a paso de punta a punta.
- **`as-technical`:** entrada → validación → lógica → datos → respuesta, con enlace a cada archivo.
- **`as-business`:** los pasos tal como los vive el usuario ("en la pantalla **Iniciar sesión** toca **¿Olvidó su contraseña?**…").
- **`as-new-spec`:** propósito, actores, glosario y el ciclo de vida del objeto principal como máquina de estados.

### 2. Casos de uso
Quién usa esto, para qué y qué lo dispara, incluidos los caminos alternos y de error, no solo el camino feliz.
- **`as-technical`:** actor, objetivo y disparador.
- **`as-business`:** historias "Como… quiero… para…" con criterios de aceptación Dado/cuando/entonces y el mensaje que ve el usuario en cada error.
- **`as-new-spec`:** los casos que *debe* tener, incluidos los que hoy faltan, sin los que solo existen por un parche.

### 3. Features o características requeridas
Lo que el flujo necesita hacer o tener para funcionar. Sale de lo que el código realmente exige; no es una lista de deseos.
- **`as-technical`:** entradas y salidas, validaciones, reglas, permisos, tablas, variables de entorno e integraciones.
- **`as-business`:** una tabla por pantalla con cada campo y botón (texto visible, si es obligatorio, reglas y mensaje si falla), reglas de negocio, y correos o SMS que se envían.
- **`as-new-spec`:** requisitos funcionales y no funcionales numerados (seguridad, privacidad, auditoría, accesibilidad…), modelo de datos, contratos de API y matriz de permisos.

### 4. Cosas importantes a tener en cuenta
Lo que hay que saber antes de tocarlo o usarlo: lo que no se ve a simple vista y lo que se rompe si se cambia sin cuidado.
- **`as-technical`:** efectos secundarios, invariantes, acoplamientos, orden de las operaciones, diferencias entre ambientes, trampas conocidas, rendimiento y seguridad.
- **`as-business`:** reglas que no se ven en la pantalla, diferencias entre canales (web, app móvil, administración), dependencias con otros procesos, tiempos y vencimientos, datos que se sobrescriben, y lo que el usuario no ve pero le afecta.
- **`as-new-spec`:** reglas de negocio e invariantes (lo que nunca puede pasar), restricciones legales o normativas, orden obligatorio de pasos y migración de datos, más **"Errores que esta especificación previene"**: cada error del sistema actual como patrón genérico, con el requisito que lo previene y una prueba de aceptación.

### 5. Cosas a resolver
Lo que **está mal hoy**, con una severidad para cada punto (🔴 alta, 🟡 media, 🟢 baja).
- **`as-technical`:** bugs, validaciones faltantes, riesgos de seguridad, código muerto e inconsistencias entre capas o canales, cada uno con su mecanismo y evidencia `archivo:línea`. Cada 🔴 lleva *(verificado en código)* o *(inferido)*, y *no probado en vivo*.
- **`as-business`:** problemas desde la experiencia del usuario: pasos confusos, mensajes engañosos o ausentes, callejones sin salida, reglas distintas entre canales, más lo técnico crítico contado por su impacto en el usuario o en la organización. Cada uno dice dónde se ve (pantalla o botón).
- **`as-new-spec`:** como todavía no hay sistema, se convierte en **decisiones abiertas** para negocio o jurídica, con opciones, impacto y una recomendación.

### 6. Cosas que sería bueno incluir
Mejoras sobre lo que ya existe. Es lo deseable, no lo roto (eso va en la sección 5).
- **`as-technical`:** pruebas, logs, métricas, documentación, refactors y funciones vecinas.
- **`as-business`:** mejoras de producto y experiencia: confirmaciones, mensajes más claros, atajos, accesibilidad, información útil para el usuario o para quien lo atiende, reportes.
- **`as-new-spec`:** lo que puede quedar para una fase 2, con la razón de por qué puede esperar.

### 7. Qué haría diferente
Cómo debió diseñarse desde el principio, buscando **lo correcto y no lo rápido**, aunque cueste más. No repite los defectos de la sección 5: propone el diseño que los habría evitado de raíz. Cada punto tiene tres partes: **Hoy** (cómo está hecho), **Lo haría así** (el diseño concreto) y **Por qué** (el principio que lo justifica y el costo de cambiarlo).
- **`as-technical`:** seguridad por diseño, capas, contratos, modelo de datos, pruebas y lógica duplicada entre canales.
- **`as-business`:** flujo, prevención de errores, mensajes, consistencia entre canales, accesibilidad y privacidad.
- **`as-new-spec`:** se convierte en las **decisiones de diseño** del proyecto: la decisión, las alternativas descartadas (incluido cualquier atajo más rápido y por qué se descartó) y el costo que se acepta.

### 8. Relacionados
Tabla con lo que este flujo toca o lo que lo toca, y cómo se relacionan.
- **`as-technical`:** módulos, funciones, endpoints, pantallas, tablas, jobs y servicios externos, con su ubicación.
- **`as-business`:** procesos y pantallas relacionados, y quién los usa.
- **`as-new-spec`:** módulos e integraciones que el nuevo módulo necesita o alimenta, con el contrato entre ellos.

### Cierre
Si hay algo urgente, una línea final lo señala. En `as-new-spec`, los errores encontrados en el sistema actual sí entran en la especificación como lecciones genéricas ("Errores que esta especificación previene": el patrón, por qué importa, el requisito que lo previene y una prueba de aceptación), para que el equipo nuevo sepa por qué existe cada regla y no los repita. Su ubicación exacta en el código actual nunca entra en la especificación, porque siguen abiertos en producción y el documento está pensado para entregarse; se nombra brevemente en el chat y queda completa en el archivo de trazabilidad.

### Archivo de trazabilidad (solo `as-new-spec`)
Junto a la especificación, `as-new-spec` siempre escribe un archivo interno `<tema>-as-new-spec-traceability.md`. Relaciona cada requisito y decisión de diseño con lo que lo motivó (un defecto que previene, un caso actual que se conserva, algo que falta hoy o una práctica del dominio), con evidencia `archivo:línea` del sistema actual, y guarda los riesgos críticos y demás defectos del sistema actual. Es el único archivo que puede mencionar el código actual y el nombre real de la organización, y no está pensado para entregarse.

### Tecnología (solo `as-new-spec`)
El skill solo puede leer el proyecto actual, no el proyecto nuevo para el que es la especificación, así que no conoce el stack destino. Por defecto la especificación es **neutral en tecnología**: ni hereda el stack actual ni elige uno.
- **Los requisitos se escriben como capacidades, no como productos**: "la base de datos debe garantizar que no haya dos reservas activas en la misma franja, incluso con solicitudes simultáneas", no "usar una restricción de exclusión de PostgreSQL". Lo aprendido sirve con cualquier stack.
- **"Lo que el stack elegido debe soportar"**: una lista de capacidades que sale de lo aprendido, para evaluar stacks candidatos sin elegir ninguno.
- **Las trampas del stack actual** (valores por defecto del framework, configuración de librerías) van al archivo de trazabilidad, útiles si el proyecto nuevo conserva esa tecnología.
- **Para apuntar a un stack, nómbralo en el pedido**: `/module-report reservas as-new-spec para Go y PostgreSQL`. El diseño se alinea con él y cada capacidad dice cómo la resuelve ese stack.
- **Para una recomendación, pídela**: llega como decisión abierta que compara dos o tres stacks contra la lista, nunca metida en el diseño.

## Modos

Los tres modos son identificadores fijos: se escriben igual en cualquier idioma.

| Modo | Para quién | Cómo pedirlo |
|---|---|---|
| **`as-technical`** (por defecto) | Quien va a desarrollar o tocar el código: archivos, servicios, datos, permisos, deuda técnica, con citas `archivo:línea`. | `as-technical`, o "explícame el flujo de X", "analiza el módulo Y, lo voy a tocar" |
| **`as-business`** | Producto, QA, soporte, cliente: historias de usuario con criterios de aceptación, pantallas, botones, campos y mensajes. Lo técnico solo si es crítico y contado por su impacto. | `as-business`, o "en forma de negocio", "historias de usuario de X", "qué botones y campos tiene X", "sin cosas técnicas" |
| **`as-new-spec`** | Un equipo que va a construir el módulo en un proyecto nuevo: especificación base limpia, con el diseño correcto, requisitos, decisiones abiertas y decisiones de diseño (ADR). Sin citas de código ni el nombre de la organización; los errores del sistema actual aparecen solo como lecciones genéricas, con el requisito y la prueba que los previenen. | `as-new-spec`, o "desde cero", "como documentación base para un proyecto nuevo", "especificación de X" |

Los modos se combinan: `as-technical as-business` entrega las dos fichas (primero la de negocio); `as-new-spec as-business` entrega solo la especificación funcional. `as-new-spec` solo entrega la especificación funcional y la técnica.

Ejemplos: `/module-report registro de usuarios as-business`, "explícame el módulo de pagos as-technical as-business", "reset de contraseña as-new-spec". También funcionan los pedidos normales, en español o inglés ("explícame el módulo X en modo negocio", "desde cero").

## Requisitos

El skill son instrucciones en Markdown; lo que necesita es un asistente que pueda trabajar dentro de tu proyecto:

| Requisito | Por qué |
|---|---|
| **Acceso de lectura al repositorio** (buscar archivos, abrirlos, listar carpetas) | Toda la ficha se arma con el código real: puntos de entrada, validaciones, datos, permisos y textos de pantalla. Sin esto solo puede analizar lo que pegues en el chat. |
| **Todos los repos relacionados al alcance** (p. ej. backend y fronts en carpetas hermanas) | Un flujo suele cruzar repos: el endpoint vive en el API y la pantalla que lo llama en un front. La trazabilidad entre repos y la sección "Relacionados" dependen de esto. |
| **Permiso de escritura en `docs/module-reports/`** *(recomendado)* | Para guardar la ficha como archivo y, la primera vez en un proyecto, agregar la regla para ignorarla si eliges dejar las fichas locales. Sin esto, la ficha completa se entrega en el chat. |
| **Poder correr comandos de solo lectura** *(recomendado)* | Se usa para `git log` de los archivos clave, para entender por qué algo está como está. Opcional. |
| **Soporte del formato Agent Skills** *(recomendado)* | Permite que el asistente active el skill solo cuando pides explicar o analizar algo, y que cargue los archivos de referencia solo cuando hacen falta. Sin esto, hay que pasarle las instrucciones a mano (ver abajo). |
| **Un modelo capaz y con ventana de contexto amplia** | Analizar un módulo completo implica leer muchos archivos en varios repos y escribir una ficha larga y estructurada. |

Nunca escribe código, corre migraciones ni despliega nada. Lo único que escribe son las fichas en `docs/module-reports/` y, una vez por proyecto y solo si lo eliges, una regla para ignorarlas. No necesita acceso a la red.

## Instalación

Clona el repositorio en la carpeta de skills de la herramienta que uses:

```bash
git clone https://github.com/djcesar/skill-module-report.git <carpeta-de-skills>/module-report
```

- **Herramientas que soportan Agent Skills** (asistentes de código tipo agente y agentes de IDE): cada una busca los skills en su propia carpeta, por usuario o por proyecto. Revisa la documentación de tu herramienta para la ruta exacta. Una vez instalado, se activa al pedir que explique, analice o documente algo del código, sin necesidad de nombrarlo; en las que tienen comandos con barra también se puede invocar como `/module-report`.
- **Herramientas sin soporte de skills** (o un chat normal): pásale al asistente el contenido de `SKILL.md` como instrucciones, más la referencia del modo que quieras (`references/as-technical.md` o `references/as-business.md`, y además `references/as-new-spec.md` para una especificación de proyecto nuevo). Después pide el análisis normalmente.

Rinde mejor en herramientas tipo agente que trabajan directamente dentro del repositorio; en un chat sin acceso a los archivos la ficha pierde las citas `archivo:línea` y la vista entre repos.

## Pruebas

`evals/` contiene casos de prueba sobre un proyecto ficticio, `evals/fixtures/club-bookings/`: un sistema de reservas de canchas de un club deportivo, con API y portal web, que tiene diez fallas plantadas a propósito. La app de ejemplo está en español a propósito, así las pruebas también verifican que los textos de pantalla se citen tal como aparecen aunque la ficha esté en inglés. La clave de respuestas está en `evals/fixtures/club-bookings.answer-key.md`, fuera de la carpeta que ve el agente.

| Caso | Qué prueba |
|---|---|
| `booking-as-technical` | Dónde queda la ficha y el resumen, secciones, qué fallas detecta, marcas de certeza, diagrama de secuencia |
| `booking-as-business` | Historias de usuario, textos literales de pantalla, riesgos por impacto, diagrama de flujo, sin jerga, encabezados en inglés |
| `booking-as-new-spec` | Anonimización, máquina de estados y modelo de datos, requisitos que previenen las fallas, archivo de trazabilidad |
| `booking-git-local` | Primera ficha en un repo git: pregunta repo o local, agrega la regla sin tocar las existentes y no hace commit |
| `booking-spanish` | Un pedido en español produce una ficha completamente en español |

Los casos siguen el formato de `claude plugin eval` (`prompt.md`, `case.yaml`, `graders/`), pero los criterios son frases simples, así que cualquier agente o persona puede calificar una corrida leyéndolos.

## Idiomas

Las instrucciones del skill están en inglés. Las fichas se escriben en el idioma del pedido, con todos los encabezados traducidos; los nombres de los modos nunca se traducen. En [`docs/es/`](docs/es/) hay una traducción al español de las instrucciones, solo para leer; si difiere de la versión en inglés, manda la inglesa.

## Estructura

```
SKILL.md                    flujo de trabajo y elección de modo (lo que lee el agente)
references/as-technical.md  plantilla as-technical
references/as-business.md   plantilla as-business y cómo sacar la vista de usuario del código
references/as-new-spec.md   cómo transformar el análisis en especificación para un proyecto nuevo
evals/                      casos de prueba y el proyecto ficticio de ejemplo
docs/es/                    traducción al español de SKILL.md y las referencias, solo para leer
CHANGELOG.md                historial de versiones
LICENSE, NOTICE             licencia Apache 2.0 y aviso de atribución
CONTRIBUTING.md             cómo contribuir (en inglés)
README.es.md                este README
```

No modifica código ni despliega nada. Lo único que escribe son las fichas en `docs/module-reports/` y, una vez por proyecto y solo si lo eliges, una regla para ignorarlas.

## Contribuir

module-report mejora con cada proyecto real con el que se encuentra, y cualquier aporte, grande o pequeño, es bienvenido:

- ⭐ **Dale una estrella al repositorio** para que más gente lo encuentre.
- 🐛 **[Abre un issue](https://github.com/djcesar/skill-module-report/issues)** cuando una ficha omita una falla, elija el modo equivocado o salga con idiomas mezclados, o para proponer una idea. Puedes escribirlo en español.
- 🧪 **Agrega un caso de prueba** en `evals/`: es la mejor forma de que una mejora siga funcionando.
- 🌍 **Mejora o agrega una traducción.**
- 🔧 **Envía un pull request.** Lee primero [CONTRIBUTING.md](CONTRIBUTING.md) (en inglés): explica cómo está organizado el repositorio y la lista corta que sigue cada cambio.

Si lo usas en tu trabajo o en un proyecto, compartirlo o contarnos cómo te fue también ayuda mucho.

## Licencia

Publicado bajo la [Licencia Apache 2.0](LICENSE). Puedes usarlo, modificarlo y redistribuirlo, incluso con fines comerciales, siempre que conserves la licencia y el archivo [NOTICE](NOTICE) e indiques los archivos que cambiaste. Copyright 2026 Cesar Vasquez.
