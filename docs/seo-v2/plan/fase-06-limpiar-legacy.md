# Fase 6: Limpiar directorios legacy (page.legacy + store.legacy ya existen como backup)

## Objetivo
Eliminar los directorios `magna-page/page/` y `magna-page/store/` que quedaron como residuo de la arquitectura anterior (pre-unificación). Ya existen backups en `magna-page/page.legacy/` y `magna-page/store.legacy/`. También limpiar referencias obsoletas en configuraciones y documentación.

## Archivos a modificar/eliminar

| Archivo | Acción |
|---|---|
| `magna-page/page/` | Eliminar directorio completo |
| `magna-page/store/` | Eliminar directorio completo |
| `magna_web/settings/` | Verificar que no referencie `page/dist` ni `store/dist` |
| `magna_web/urls.py` | Verificar que no referencie `page/dist` ni `store/dist` |
| `AGENTS.md` | Actualizar sección Deployment rápido |

## Skills requeridas

1. **`django-expert`** — Para verificar que no hay referencias ocultas

## Referencias

- **AGENTS.md**: Backup confirmado en `magna-page/page.legacy/` y `magna-page/store.legacy/`
- **DESIGN.md**: No aplica
- Rama de referencia: `deploy/julio-2026` (última vez que se usó la estructura legacy)

## Instrucciones detalladas

### 1. Verificar que los backups existen

```bash
Test-Path "magna-page/page.legacy"
Test-Path "magna-page/store.legacy"
```

Si no existen, preguntar antes de eliminar.

### 2. Buscar referencias a `page/dist` y `store/dist`

```bash
rg "page/dist|store/dist" --include "*.py" --include "*.md" --include "*.yml" --include "*.yaml" --include "*.json"
```

Asegurarse de que ninguna configuración apunte a estos directorios.

### 3. Eliminar directorios legacy

```bash
Remove-Item -Recurse -Force magna-page/page
Remove-Item -Recurse -Force magna-page/store
```

### 4. Actualizar `AGENTS.md`

- Eliminar referencias a `magna-page/page/` y `magna-page/store/` en la tabla de estructura
- El backup ya está documentado como `page.legacy` y `store.legacy`
- Actualizar el comando de Deployment rápido si referenciaba `cd magna-page/page`

### 5. Última verificación

```bash
python manage.py runserver  # debe seguir funcionando
cd magna-page/unified && npm run build  # debe compilar sin errores
cd magna-page/unified && npm run dev  # debe arrancar el dev server
```

## Criterios de éxito

- [ ] `magna-page/page/` no existe
- [ ] `magna-page/store/` no existe
- [ ] `magna-page/page.legacy/` existe (backup)
- [ ] `magna-page/store.legacy/` existe (backup)
- [ ] No hay referencias a `page/dist` ni `store/dist` en settings, urls, ni configuraciones
- [ ] Django funciona correctamente
- [ ] Frontend compila correctamente
- [ ] AGENTS.md actualizado

## Documentación de resultados

Al finalizar, crear `docs/seo-v2/resultados/fase-06-limpiar-legacy.md` con:
- Directorios eliminados y sus tamaños
- Archivos de configuración actualizados
- Verificación de que backups existen
- Espacio liberado en disco
- Tiempo total
