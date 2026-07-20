# Fase 03 — Layout Shell (Store en Unified)

## Objetivo

Rediseñar el layout del store (`src/store-pages/App.tsx`) para que su navbar sea visualmente coherente con `src/page/components/navBar.tsx`: fondo blanco, logo SVG, links con font-weight 300, hover scale. El footer ya usa `shared/components/Footer.tsx` (idéntico al de page).

---

## Archivos a Modificar

| Ruta en Unified | Acción |
|-----------------|--------|
| `magna-page/unified/src/store-pages/App.tsx` | Reescribir navbar |
| `magna-page/unified/src/shared/components/Footer.tsx` | Verificar/mejorar |
| `magna-page/unified/src/shared/components/FloatWhatsapp.tsx` | Verificar |
| Nuevo: `src/store-pages/components/SetionHeader.tsx` | Crear |
| Nuevo: `src/store-pages/components/HeadingDivider.tsx` | Crear |

---

## Skills Necesarias

- **`frontend-design`** — navbar, footer, layout

---

## Instrucciones Detalladas

### 1. `App.tsx` — Rediseñar navbar

El navbar del store debe coincidir visualmente con `src/page/components/navBar.tsx`:

```tsx
// Estructura:
<header>
  <Navbar fixed="top" bg="white" expand="lg" className="shadow-sm">
    <Container>
      {/* Logo SVG → src/shared/components/LogoOriginal.tsx */}
      <LinkContainer to="/store/">
        <Navbar.Brand>
          <LogoOriginal />
        </Navbar.Brand>
      </LinkContainer>

      {/* SearchBox + Toggle */}
      <div className="d-flex align-items-center gap-2">
        <SearchBox />
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Nav className="ms-auto align-items-center gap-2">
          {/* Dark mode: FiSun/FiMoon */}
          <Nav.Link onClick={switchModeHandler} className="header-link">
            {mode === 'light' ? <FiSun /> : <FiMoon />}
          </Nav.Link>

          {/* User dropdown: "Hola, {nombre}" */}
          {userInfo ? (
            <NavDropdown title={`Hola, ${userInfo.first_name}`} className="header-link">
              <LinkContainer to="/store/profile">
                <NavDropdown.Item>Perfil</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={signoutHandler}>
                Cerrar sesión
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <LinkContainer to="/store/signin">
              <Nav.Link className="header-link">Iniciar sesión</Nav.Link>
            </LinkContainer>
          )}

          {/* Cart icon con badge */}
          <Link to="/store/cart" className="nav-link position-relative header-link">
            <FiShoppingCart size={22} />
            {cartItemsCount > 0 && (
              <span className="cart-badge">{cartItemsCount}</span>
            )}
          </Link>

          {/* Link a página principal (cross-SPA) */}
          <a href="/" className="nav-link store-link">Página principal</a>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>

  {/* Sub-header categorías */}
  <div className="sub-header">
    <Container>
      <Nav className="flex-nowrap" style={{ overflowX: 'auto' }}>
        <Nav.Link onClick={() => setSidebarOpen(true)} className="d-flex align-items-center gap-1">
          <FiMenu /> Categorías
        </Nav.Link>
        {categories?.map(cat => (
          <Link key={cat.id} to={`/store/search/${cat.id}`} className="nav-link">
            {cat.name}
          </Link>
        ))}
      </Nav>
    </Container>
  </div>
</header>
```

**Cambios clave:**
- Fondo blanco (actualmente tiene fondo oscuro)
- Logo `LogoOriginal` de shared (mismo que page)
- Links con font-weight 300 (mismo estilo)
- Hover scale(1.05)
- Store link como pill con borde (mismo que page)

### 2. Verificar Footer

El `shared/components/Footer.tsx` ya es usado por store. Verificar que tenga:
- Fondo `rgb(2, 19, 40)`
- 4 columnas: logo, contacto, sitemap, redes
- Lazy load con IntersectionObserver
- Social icons (FaFacebook, FaInstagram, FaSquareXTwitter, FaTiktok, BsLinkedin)

### 3. HeadingDivider y SetionHeader

Crear en `src/store-pages/components/` con framer-motion (mismo código que page).

---

## Tests

- [ ] Navbar fondo blanco, fixed-top
- [ ] Logo SVG visible
- [ ] "Página principal" link a `/`
- [ ] Sub-header categorías con scroll horizontal
- [ ] Footer con 4 columnas
- [ ] Redes sociales funcionan
- [ ] WhatsApp flotante
- [ ] Build exitoso
