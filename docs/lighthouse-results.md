# Lighthouse Results — Comparación SPA vs SSG

> Fecha del test: Julio 2026
> Servidor: AWS Lightsail (Virginia, EE.UU.)
> Conexión desde: Ibagué, Colombia
> Herramienta: Lighthouse CLI

## Resultados

| Categoría | SPA | SSG | Target | ¿Pass? | Mejora |
|-----------|-----|-----|--------|--------|--------|
| Performance | 65 | 93 | ≥ 93 | ✓ | +28 |
| Accessibility | 85 | 95 | ≥ 93 | ✓ | +10 |
| Best Practices | 85 | 90 | ≥ 93 | ✗ | +5 |
| SEO | 82 | 100 | ≥ 95 | ✓ | +18 |

## Web Vitals

| Métrica | SPA | SSG | Mejora |
|---------|-----|-----|--------|
| First Contentful Paint (FCP) | 2.4s | 1.1s | -54% |
| Largest Contentful Paint (LCP) | 3.8s | 2.1s | -45% |
| Total Blocking Time (TBT) | 320ms | 50ms | -84% |
| Cumulative Layout Shift (CLS) | 0.12 | 0.05 | -58% |

## Notas

### Best Practices (90, por debajo de 93)
Posibles causas:
- La imagen de fondo del banner no tiene dimensiones explícitas
- Algunos recursos externos (Google Analytics) no usan HTTP/2
- Corrección postergada: no afecta SEO

### Latencia del servidor (EE.UU.)
- TTFB desde Colombia: ~200-300ms (vs ~30ms en Virginia)
- Esto afecta a SPA y SSG por igual
- El SSG compensa porque FCP no depende de JS remoto
- La métrica de SEO (100) no se ve afectada por latencia

## Recomendaciones
- [ ] Mejorar Best Practices para alcanzar 93 (imágenes con dimensiones)
- [ ] Configurar HTTP/2 en nginx (ya debería estar)
- [ ] Monitorear TTFB con RUM (Real User Monitoring)
