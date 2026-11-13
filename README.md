# skill-analizar-modulo

Skill para Claude Code que analiza un flujo, módulo, función o proceso del proyecto donde estés trabajando, leyendo el código real, y entrega una ficha con ocho secciones:

1. Descripción
2. Casos de uso
3. Features o características requeridas
4. Cosas importantes a tener en cuenta
5. Cosas a resolver
6. Cosas que sería bueno incluir
7. Qué haría diferente
8. Relacionados

## Versiones

| Versión | Para quién | Cómo pedirla |
|---|---|---|
| **Técnica** (por defecto) | Quien va a desarrollar o tocar el código: archivos, servicios, datos, permisos, deuda técnica, con citas `archivo:línea`. | "explícame el flujo de X", "analiza el módulo Y, lo voy a tocar" |
| **Negocio** | Producto, QA, soporte, cliente: historias de usuario con criterios de aceptación, pantallas, botones, campos y mensajes. Lo técnico solo si es crítico y contado por su impacto. | "en forma de negocio", "historias de usuario de X", "qué botones y campos tiene X", "sin cosas técnicas" |
| **Desde cero** | Un equipo que va a construir el módulo en un proyecto nuevo: especificación base limpia, con el diseño correcto, requisitos, decisiones abiertas y decisiones de diseño (ADR). Sin citas de código, sin bugs del sistema actual y sin el nombre de la organización. | "desde cero", "como documentación base para un proyecto nuevo", "especificación de X" |

Se pueden combinar: "explícame X en modo técnico y negocio", "X desde cero, solo la parte funcional".

## Instalación

```bash
git clone https://github.com/djcesar/skill-analizar-modulo.git ~/.claude/skills/analizar-modulo
```

Claude Code lo carga automáticamente; se activa al pedir que explique, analice o documente algo del código, sin necesidad de nombrarlo.

## Estructura

```
SKILL.md                 flujo de trabajo y elección de versión
references/tecnico.md    plantilla técnica
references/negocio.md    plantilla de negocio y cómo sacar la vista de usuario del código
references/desde-cero.md cómo transformar el análisis en especificación para un proyecto nuevo
```

Es de solo lectura: no modifica código ni despliega nada.
