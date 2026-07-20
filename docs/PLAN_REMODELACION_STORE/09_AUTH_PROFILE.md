# Fase 09 — Auth y Profile (Store en Unified)

Archivos en Unified:

| Página | Ruta |
|--------|------|
| SigninPage | `magna-page/unified/src/store-pages/pages/SigninPage.tsx` |
| SignupPage | `magna-page/unified/src/store-pages/pages/SignupPage.tsx` |
| ProfilePage | `magna-page/unified/src/store-pages/pages/ProfilePage.tsx` |
| ProtectedRoute | `magna-page/unified/src/store-pages/components/ProtectedRoute.tsx` |

Skills: `frontend-design`

### Diseño

- Card centrada, max-width 480px, `--radius-xl`, `--shadow-md`
- Inputs con `--radius-md`
- Botón submit con `--color-secondary`
- Iconos react-icons: FiMail, FiLock, FiLogIn, FiUser
- Textos 100% en español
- Helmet con titles: "Iniciar sesión | Magna Store", etc.

### ProtectedRoute

```tsx
export default function ProtectedRoute() {
  const { state } = useContext(Store)
  return state.userInfo
    ? <Outlet />
    : <Navigate to="/store/signin?redirect=/store/shipping" replace />
}
```

### Tests

- [ ] Login funciona con credenciales válidas
- [ ] Error muestra toast
- [ ] Registro crea usuario
- [ ] Profile guarda cambios
- [ ] ProtectedRoute redirige sin auth
- [ ] Build exitoso
