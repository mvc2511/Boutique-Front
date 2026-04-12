---
name: changelog-manager
description: Gestiona automáticamente el archivo CHANGELOG.md siguiendo el estándar "Keep a Changelog" y SemVer. Úsalo antes de cada commit para registrar los cambios y aumentar la versión.
---

# Changelog Manager

Este skill permite mantener un registro de cambios profesional y automatizado.

## Reglas de Operación

1.  **Formato**: Siempre utiliza el formato [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).
2.  **Ubicación**: El archivo debe ser `CHANGELOG.md` en la raíz del proyecto.
3.  **Versiones (SemVer)**:
    *   **Major (X.0.0)**: Cambios que rompen la compatibilidad (*Breaking Changes*). Se detectan si el commit incluye `!` (ej. `feat!`) o `BREAKING CHANGE` en el pie del mensaje.
    *   **Minor (0.X.0)**: Nuevas funcionalidades (`feat`).
    *   **Patch (0.0.X)**: Corrección de errores (`fix`) o mejoras que no añaden funcionalidades claras.
4.  **Categorías**:
    *   `Añadido` (Added): Para nuevas funcionalidades.
    *   `Corregido` (Fixed): Para correcciones de errores.
    *   `Cambiado` (Changed): Para cambios en funcionalidades existentes.
    *   `Eliminado` (Removed): Para funcionalidades eliminadas.

## Procedimiento de Actualización

Al invocar este skill:

1.  **Analizar Cambios**: Revisa los archivos preparados en el área de *stage* (`git diff --cached`) y el mensaje de commit planeado.
2.  **Determinar Nueva Versión**:
    *   Lee la última versión del `CHANGELOG.md`.
    *   Si no existe, comienza con `0.1.0`.
    *   Aplica el incremento correspondiente según el tipo de cambio.
3.  **Preparar la Entrada**:
    *   Fecha actual en formato ISO (YYYY-MM-DD).
    *   Resumen conciso del cambio en la categoría correspondiente.
4.  **Escribir en el Archivo**:
    *   Inserta la nueva versión al principio (debajo del encabezado principal).
    *   Mantén las versiones anteriores intactas.

## Estructura del CHANGELOG.md

```markdown
# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

## [1.0.0] - 2026-04-12
### Añadido
- Autenticación con Google OAuth.

## [0.1.0] - 2026-04-11
### Añadido
- Inicialización del proyecto.
```
