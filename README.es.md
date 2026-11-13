# skill-analizar-modulo

[English](README.md) · **Español**

Skill para Claude Code que analiza un flujo, módulo, función o proceso del proyecto donde estés trabajando, leyendo el código real, y entrega una ficha con ocho secciones.

## Qué trae la ficha

Toda ficha abre con una línea de **Alcance**: qué se revisó y qué quedó fuera, para saber hasta dónde llega el análisis. Después vienen las ocho secciones, siempre en este orden. Si una no aplica, la ficha lo dice en una línea; ninguna se omite.

### 1. Descripción
Qué es, para qué existe y cómo funciona, en uno o dos párrafos, seguidos del recorrido paso a paso de punta a punta.
- **Técnica:** entrada → validación → lógica → datos → respuesta, con enlace a cada archivo.
- **Negocio:** los pasos tal como los vive el usuario ("en la pantalla **Iniciar sesión** toca **¿Olvidó su contraseña?**…").
- **Desde cero:** propósito, actores, glosario y el ciclo de vida del objeto principal como máquina de estados.

### 2. Casos de uso
Quién usa esto, para qué y qué lo dispara, incluidos los caminos alternos y de error, no solo el camino feliz.
- **Técnica:** actor, objetivo y disparador.
- **Negocio:** historias "Como… quiero… para…" con criterios de aceptación Dado/cuando/entonces y el mensaje que ve el usuario en cada error.
- **Desde cero:** los casos que *debe* tener, incluidos los que hoy faltan, sin los que solo existen por un parche.

### 3. Features o características requeridas
Lo que el flujo necesita hacer o tener para funcionar. Sale de lo que el código realmente exige; no es una lista de deseos.
- **Técnica:** entradas y salidas, validaciones, reglas, permisos, tablas, variables de entorno e integraciones.
- **Negocio:** una tabla por pantalla con cada campo y botón (texto visible, si es obligatorio, reglas y mensaje si falla), reglas de negocio, y correos o SMS que se envían.
- **Desde cero:** requisitos funcionales y no funcionales numerados (seguridad, privacidad, auditoría, accesibilidad…), modelo de datos, contratos de API y matriz de permisos.

### 4. Cosas importantes a tener en cuenta
Lo que hay que saber antes de tocarlo o usarlo: efectos secundarios, reglas que no se ven, acoplamientos, orden de las operaciones, diferencias entre ambientes o canales (web, app, administración), y lo que se rompe si se cambia sin cuidado.

### 5. Cosas a resolver
Lo que **está mal hoy**: bugs, validaciones faltantes, riesgos de seguridad, inconsistencias entre capas o canales. Cada punto lleva evidencia y severidad (🔴 alta, 🟡 media, 🟢 baja).
- **Negocio:** contado por su impacto en el usuario o en la organización, no por su mecanismo.
- **Desde cero:** como todavía no hay sistema, se convierte en **decisiones abiertas** para negocio o jurídica, con opciones y una recomendación.

### 6. Cosas que sería bueno incluir
Mejoras sobre lo que ya existe: pruebas, logs, mensajes más claros, accesibilidad, reportes, funciones vecinas. Es lo deseable, no lo roto (eso va en la sección 5).
- **Desde cero:** lo que puede quedar para una fase 2, con la razón de por qué puede esperar.

### 7. Qué haría diferente
Cómo debió diseñarse desde el principio, buscando lo correcto y no lo rápido. No repite los defectos de la sección 5: propone el diseño que los habría evitado de raíz. Cada punto tiene tres partes:
- **Hoy:** cómo está hecho.
- **Lo haría así:** el diseño concreto.
- **Por qué:** el principio que lo justifica y el costo de cambiarlo.

En la técnica mira seguridad por diseño, capas, contratos, modelo de datos, pruebas y lógica duplicada entre canales. En la de negocio mira flujo, prevención de errores, mensajes, consistencia, accesibilidad y privacidad.
- **Desde cero:** se convierte en las **decisiones de diseño** del proyecto: decisión, alternativas descartadas y por qué.

### 8. Relacionados
Tabla con lo que este flujo toca o lo que lo toca, y cómo se relacionan.
- **Técnica:** módulos, funciones, endpoints, pantallas, tablas, jobs y servicios externos, con su ubicación.
- **Negocio:** procesos y pantallas relacionados, y quién los usa.
- **Desde cero:** módulos e integraciones que el nuevo módulo necesita o alimenta, con el contrato entre ellos.

### Cierre
Si hay algo urgente, una línea final lo señala. En "desde cero", los riesgos críticos del sistema actual se avisan en el chat, nunca dentro del documento, para que este se pueda entregar tal cual.

## Versiones

| Versión | Para quién | Cómo pedirla |
|---|---|---|
| **Técnica** (por defecto) | Quien va a desarrollar o tocar el código: archivos, servicios, datos, permisos, deuda técnica, con citas `archivo:línea`. | "explícame el flujo de X", "analiza el módulo Y, lo voy a tocar" |
| **Negocio** | Producto, QA, soporte, cliente: historias de usuario con criterios de aceptación, pantallas, botones, campos y mensajes. Lo técnico solo si es crítico y contado por su impacto. | "en forma de negocio", "historias de usuario de X", "qué botones y campos tiene X", "sin cosas técnicas" |
| **Desde cero** | Un equipo que va a construir el módulo en un proyecto nuevo: especificación base limpia, con el diseño correcto, requisitos, decisiones abiertas y decisiones de diseño (ADR). Sin citas de código, sin bugs del sistema actual y sin el nombre de la organización. | "desde cero", "como documentación base para un proyecto nuevo", "especificación de X" |

Se pueden combinar: "explícame X en modo técnico y negocio", "X desde cero, solo la parte funcional".

## Instalación

```bash
git clone https://github.com/djcesar/skill-analizar-modulo.git ~/.claude/skills/skill-analizar-modulo
```

Claude Code lo carga automáticamente. Se activa al pedir que explique, analice o documente algo del código, sin necesidad de nombrarlo. También se puede invocar directamente con `/skill-analizar-modulo`.

## Estructura

```
SKILL.md                 flujo de trabajo y elección de versión
references/tecnico.md    plantilla técnica
references/negocio.md    plantilla de negocio y cómo sacar la vista de usuario del código
references/desde-cero.md cómo transformar el análisis en especificación para un proyecto nuevo
```

Es de solo lectura: no modifica código ni despliega nada.
