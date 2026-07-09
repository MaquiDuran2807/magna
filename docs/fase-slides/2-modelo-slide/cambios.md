# Fase 2 — Modelo Slide + Migración + Admin

> Fecha: 06/07/2026
> Inicio: 14:55
> Fin: 15:00
> Duración: 5 min

---

## Cambios

### `servicios/models.py` — Nuevo modelo Slide

**Problema:** El modelo `Servicio` cumple doble función como slide del carrusel y como tarjeta de servicio. No se puede agregar un slide sin crear también un servicio.

**Solución:** Modelo `Slide` independiente con:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `nombre` | CharField(100) | Título del slide |
| `descripcion` | TextField | Texto del slide |
| `imagen` | ImageField | Imagen desktop |
| `imagen_tablet` | ImageField | Variante tablet |
| `imagen_celular` | ImageField | Variante móvil |
| `orden` | PositiveIntegerField | Posición en el carrusel |
| `activo` | BooleanField | Mostrar/ocultar |
| `created_at` | DateTimeField(auto_now_add) | Creación |
| `updated_at` | DateTimeField(auto_now) | Actualización |

**Meta:**
```python
class Meta:
    ordering = ['orden']
    verbose_name = 'Slide'
    verbose_name_plural = 'Slides'
```

### `servicios/admin.py` — Nuevo SlideAdmin

```python
@admin.register(Slide)
class SlideAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'orden', 'activo', 'created_at')
    list_editable = ('orden', 'activo')  # Edición inline
    search_fields = ('nombre', 'descripcion')
    list_filter = ('activo',)
    ordering = ('orden',)
```

### `servicios/migrations/0004_slide.py` — Migración automática

### Verificación

```bash
python manage.py makemigrations servicios  # OK
python manage.py migrate                   # OK
python manage.py check                     # 0 issues (except ckeditor W001 preexistente)
```

### Archivos modificados

| Archivo | Cambio | Líneas +/- |
|---------|--------|-----------|
| `servicios/models.py` | + modelo Slide | +25 |
| `servicios/admin.py` | + SlideAdmin | +8 |

**Impacto:** Bajo — modelo nuevo sin relaciones foráneas, no afecta funcionamiento existente.
