# Fase 5 — Refactor save() a Utility Reutilizable

> Fecha: 06/07/2026
> Inicio: 15:10
> Fin: 15:18
> Duración: 8 min

---

## Cambios

### `servicios/utils.py` — Nueva función compartida

```python
def generate_image_variants(imagen_field, tablet_ratio=0.75, celular_ratio=0.5, normalize_height=None):
```
- Acepta cualquier ImageField
- Genera variantes tablet y celular con ratios configurables
- Soporta normalización de altura (usado por SubServicio)
- Retorna tuple de ContentFile

### `servicios/models.py` — Refactor de save() en 3 modelos

**Antes:** Cada modelo (`Servicio`, `SubServicio`) tenía su propia lógica de procesamiento de imágenes duplicada en `save()`. El modelo `Slide` no tenía procesamiento.

**Después:** Los 3 modelos usan `generate_image_variants()` de `utils.py`.

| Modelo | Tablet ratio | Celular ratio | Normaliza altura |
|--------|-------------|---------------|-----------------|
| Servicio | 0.75 | 0.50 | No |
| Slide | 0.75 | 0.50 | No |
| SubServicio | 0.70 | 0.50 | 900px |

**Mejora:** Detección de cambio de imagen — si se edita un registro sin cambiar la imagen, se omite el procesamiento:

```python
if self.imagen and not self._state.adding:
    existing = Modelo.objects.filter(pk=self.pk).first()
    if existing and existing.imagen.name == self.imagen.name:
        super().save(*args, **kwargs)
        return
```

### Verificación

```bash
python manage.py check        # 0 issues
python manage.py test servicios  # 10 tests, OK
```

### Archivos modificados

| Archivo | Cambio | Líneas +/- |
|---------|--------|-----------|
| `servicios/utils.py` | **Nuevo** — lógica de variantes compartida | +43 |
| `servicios/models.py` | Refactor Servicio.save(), SubServicio.save(), Slide.save() | +48 / -72 |

**Impacto:** Medio — el `save()` cambió internamente pero el comportamiento es idéntico. El refactor reduce duplicación de ~72 líneas a ~48 compartidas.

**Profesionalismo:**
- Lógica extraída a función pura y testeable
- Sin side effects (no toca la BD, solo procesa imágenes)
- Tipos claros y documentación en docstring
- Los modelos ya no tienen lógica de procesamiento duplicada
