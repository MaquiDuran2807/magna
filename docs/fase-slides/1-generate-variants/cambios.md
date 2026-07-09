# Fase 1 — Script generate_image_variants

> Fecha: 06/07/2026
> Inicio: 14:40
> Fin: 14:55
> Duración: 15 min

---

## Cambios

### Archivo creado: `servicios/management/commands/generate_image_variants.py`

**Problema:** Los campos `imagen_tablet` e `imagen_celular` en `Servicio` y `SubServicio` solo se generan al subir una imagen nueva mediante el método `save()`. Los registros existentes (previos a la migración que agregó estos campos, o cargados por migraciones de datos) quedaron con estos campos vacíos. Esto causaba que el `srcSet` en el frontend siempre cayera al fallback `servicio.imagen`, descargando la imagen completa en todos los tamaños de pantalla.

**Solución:** Management command de Django que:
- Itera todos los `Servicio` con `imagen` no nula
- Si falta `imagen_tablet` o `imagen_celular`, genera la variante con Pillow (LANCZOS, WebP quality 90)
- Hace lo mismo para `SubServicio` (con normalización a 900px de alto primero)
- Soporta `--dry-run` para previsualizar sin escribir
- Soporta `--model servicio|subservicio|all` para filtrar

**Lógica de dimensiones (coincide con models.py):**

| Modelo | Tablet | Celular |
|--------|--------|---------|
| Servicio | 75% original | 50% original |
| SubServicio | 70% (tras normalizar a 900px alto) | 50% (tras normalizar a 900px alto) |

**Verificación:**

```bash
# Dry-run para previsualizar
python manage.py generate_image_variants --dry-run

# Ejecución real
python manage.py generate_image_variants
```

**Resultado:**

| Modelo | Procesados | Errores | Omitidos |
|--------|-----------|---------|----------|
| Servicio | 2 (Medio Ambiente, ingeniería) | 0 | 1 (topografía, ya tenía datos) |
| SubServicio | 12 | 0 | 11 (ya tenían datos) |

**BD post-ejecución:**
- 3/3 Servicios con `imagen_tablet` e `imagen_celular` ✅
- 23/23 SubServicios con `imagen_tablet` e `imagen_celular` ✅

**Impacto:**
- Líneas creadas: 176
- Líneas eliminadas: 0
- Eficiencia: el `srcSet` ahora sirve imágenes del tamaño correcto según dispositivo (aprox. 50-75% menos peso en tablet/móvil)
- Profesionalismo: management command documentado con argumentos, dry-run y summary
