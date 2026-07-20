import { useContext, useEffect, useState } from 'react'
import {
  Badge,
  Button,
  Container,
  Form,
  FormControl,
  InputGroup,
  ListGroup,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Store } from './Store'
import Footer from '../shared/components/Footer'
import { useGetCategoriesQuery } from './hooks/productHooks'
import LoadingBox from './components/LoadingBox'
import MessageBox from './components/MessageBox'
import { getError } from './utils'
import { ApiError } from './types/ApiError'
import SearchBox from './components/SearchBox'
import { FloatWhatsapp } from '../shared/components/FloatWhatsapp'
import { LogoOriginal } from '../shared/components/LogoOriginal'
import { FiSun, FiMoon, FiShoppingCart, FiMenu } from 'react-icons/fi'
import { TopographyBackground } from './components/TopographyBackground'

function App() {
  const {
    state: { mode, cart, userInfo },
    dispatch,
  } = useContext(Store)

  useEffect(() => {
    document.body.classList.add(mode === 'dark' ? 'dark-mode' : 'light-mode')
    document.body.classList.remove(mode === 'dark' ? 'light-mode' : 'dark-mode')
  }, [mode])

  const switchModeHandler = () => {
    dispatch({ type: 'SWITCH_MODE' })
  }
  const signoutHandler = () => {
    dispatch({ type: 'USER_SIGNOUT' })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    window.location.href = '/store/signin'
  }

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)
  const { data: categories, isLoading, error } = useGetCategoriesQuery()
  console.log(mode,"mode");

  const cartItemsCount = cart.cartItems.reduce((a, c) => a + c.quantity, 0)

  return (
    <div className="d-flex flex-column min-vh-100 store-layout">
      <TopographyBackground />
      <ToastContainer position="bottom-center" limit={1} />
      <header className="store-header">
        <Navbar bg="white" expand="lg" className="shadow-sm store-navbar">
          <Container>
            <LinkContainer to="/store/">
              <Navbar.Brand className="p-0">
                <LogoOriginal width={240} className="store-logo" />
              </Navbar.Brand>
            </LinkContainer>

            <div className="d-flex align-items-center gap-2">
              <SearchBox />
              <Navbar.Toggle aria-controls="store-nav-collapse" />
            </div>

            <Navbar.Collapse id="store-nav-collapse">
              <Nav className="ms-auto align-items-center gap-2">
                <Nav.Link onClick={switchModeHandler} className="header-link d-flex align-items-center">
                  {mode === 'light' ? <FiSun size={18} /> : <FiMoon size={18} />}
                  <span className="d-none d-lg-inline ms-1">
                    {mode === 'light' ? 'Claro' : 'Oscuro'}
                  </span>
                </Nav.Link>

                {userInfo ? (
                  <NavDropdown title={`Hola, ${userInfo.first_name}`} className="header-link" id="user-dropdown">
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

                <Link to="/store/cart" className="nav-link header-link position-relative d-flex align-items-center">
                  <FiShoppingCart size={22} />
                  {cartItemsCount > 0 && (
                    <span className="cart-badge">{cartItemsCount}</span>
                  )}
                </Link>

                <a href="/" className="nav-link store-link" style={{fontWeight: 600}}>Página principal</a>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className="store-sub-header">
          <Container>
            <Nav className="flex-nowrap align-items-center" style={{ overflowX: 'auto' }}>
              <Nav.Link onClick={() => setSidebarIsOpen(true)} className="d-flex align-items-center gap-1 sub-header-link">
                <FiMenu size={16} /> Categorías
              </Nav.Link>
              {categories?.map(cat => (
                <Link key={cat.id} to={`/store/search/${cat.id}`} className="nav-link sub-header-link">
                  {cat.name}
                </Link>
              ))}
            </Nav>
          </Container>
        </div>
      </header>

      {sidebarIsOpen && (
        <div
          onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
          className="side-navbar-backdrop"
        ></div>
      )}

      <div
        className={sidebarIsOpen ? 'side-navbar active-nav' : 'side-navbar'}
      >
        <ListGroup variant="flush">
          <ListGroup.Item action className="side-navbar-user">
            <LinkContainer
              to={userInfo ? `/profile` : `/store/signin`}
              onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            >
              <span>
                {userInfo ? `Hola, ${userInfo.first_name}` : `Hola, haz login`}
              </span>
            </LinkContainer>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="d-flex justify-content-between align-items-center">
              <strong>Categorías</strong>
              <Button
                variant={mode}
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fa fa-times" />
              </Button>
            </div>
          </ListGroup.Item>
          {isLoading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{getError(error)}</MessageBox>
          ) : (
            categories!.map((category) => (
              <ListGroup.Item action key={category.id}>
                <LinkContainer
                  to={{ pathname: `/store/search/${category.id}` }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category.name}</Nav.Link>
                </LinkContainer>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </div>

      <main className="store-main">
        <Container className="py-3">
          <Outlet />
        </Container>
      </main>
      <footer>
        <FloatWhatsapp />
        <Footer />
      </footer>
    </div>
  )
}

export default App
