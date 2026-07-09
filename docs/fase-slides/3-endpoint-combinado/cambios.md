# Fase 3 — Endpoint /slides/ + Serializers

> Fecha: 06/07/2026
> Inicio: 15:00
> Fin: 15:02
> Duración: 2 min

---

## Cambios

### `servicios/serializer.py` — Nuevos serializers

| Serializer | Modelo | Propósito |
|-----------|--------|-----------|
| `SlideSerializer` | Slide | Serializa slides con campo extra `tipo: 'slide'` |
| `ServicioSlideSerializer` | Servicio | Serializa servicios con campo extra `tipo: 'servicio'` y `orden: id` |

Ambos serializers exponen la misma interfaz para que el frontend consuma datos homogéneos:

```json
{
  "id": 1,
  "tipo": "servicio",    // o "slide"
  "nombre": "...",
  "descripcion": "...",
  "imagen": "...",
  "imagen_tablet": "...",
  "imagen_celular": "...",
  "orden": 1
}
```

### `servicios/views.py` — Nueva vista `SlidesAPIView`

**Lógica:**
1. Obtiene todos los `Servicio` (sin filtrar)
2. Obtiene todos los `Slide` con `activo=True`
3. Concatena ambas listas (servicios primero, slides después)
4. Ordena por `orden` ascendente
5. Retorna array combinado

### `servicios/urls.py` — Nueva ruta

```
path('slides/', SlidesAPIView.as_view())
```

### Verificación

```bash
curl -H "Accept: application/json" http://localhost:8000/servicios/slides/
```

**Respuesta:** Array con 3 servicios y 0 slides (BD vacía). Todos con `imagen_tablet` e `imagen_celular` poblados.

### Archivos modificados

| Archivo | Cambio | Líneas +/- |
|---------|--------|-----------|
| `servicios/serializer.py` | + SlideSerializer, + ServicioSlideSerializer | +27 |
| `servicios/views.py` | + SlidesAPIView, + import Slide | +15 |
| `servicios/urls.py` | + SlidesAPIView import, + ruta slides/ | +2 |

**Impacto:** Bajo — endpoint nuevo no afecta endpoints existentes. Backward compatibility total.
