import { useContext, useEffect, useState } from 'react'
import {LogoMagna} from './assets/logo'
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
import Footer from './components/footer1'
import { useGetCategoriesQuery } from './hooks/productHooks'
import LoadingBox from './components/LoadingBox'
import MessageBox from './components/MessageBox'
import { getError } from './utils'
import { ApiError } from './types/ApiError'
import SearchBox from './components/SearchBox'
import { FloatWhatsapp } from './components/floawhatsapp'

function App() {
  const {
    state: { mode, cart, userInfo },
    dispatch,
  } = useContext(Store)

  useEffect(() => {
    // document.body.setAttribute('data-bs-theme', mode)
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
  

  return (
    <div className="d-flex flex-column vh-100 fs-5 ">
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar
          className={`d-flex flex-column align-items-stretch p-2 pb-0 mb-5  `}
          expand="lg"
        >
          <div className="d-flex justify-content-between align-items-center py-1">
            <LinkContainer to="/store/" className="header-link mx-2">
              <Navbar.Brand className='px-5' style={{ paddingLeft: '15px',border:"whithe 2px" }}>
                <LogoMagna className='logo-footer' />
              </Navbar.Brand>
            </LinkContainer>
            <SearchBox />

            <Navbar.Collapse>
              <Nav className="w-100 justify-content-end ">
                <Link
                  to="#"
                  className="nav-link header-link mx-4"
                  onClick={switchModeHandler}
                >
                  <i
                    className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}
                  ></i>{' '}
                  {mode === 'light' ? 'Claro' : 'Oscuro'}
                </Link>

                {userInfo ? (
                  <NavDropdown
                    className="header-link"
                    title={`Hola, ${userInfo.first_name}`}
                  >
                    <LinkContainer to="/store/profile ">
                      <NavDropdown.Item>Perfil de usuario</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item mx-5"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      {' '}
                      Sign Out{' '}
                    </Link>
                  </NavDropdown>
                ) : (
                  <NavDropdown className="header-link" title={`Hola, haz login`}>
                    <LinkContainer to="/store/signin">
                      <NavDropdown.Item>Login</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
                <Link to="/store/cart/" className="nav-link header-link p-0 mx-4">
                  {
                    <span className="cart-badge">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </span>
                  }
                  <svg
                    fill="#ffffff"
                    viewBox="130 150 200 300"
                    width="40px"
                    height="40px"
                  >
                    <path d="M 110.164 188.346 C 104.807 188.346 100.437 192.834 100.437 198.337 C 100.437 203.84 104.807 208.328 110.164 208.328 L 131.746 208.328 L 157.28 313.233 C 159.445 322.131 167.197 328.219 176.126 328.219 L 297.409 328.219 C 306.186 328.219 313.633 322.248 315.951 313.545 L 341.181 218.319 L 320.815 218.319 L 297.409 308.237 L 176.126 308.237 L 150.592 203.332 C 148.426 194.434 140.675 188.346 131.746 188.346 L 110.164 188.346 Z M 285.25 328.219 C 269.254 328.219 256.069 341.762 256.069 358.192 C 256.069 374.623 269.254 388.165 285.25 388.165 C 301.247 388.165 314.431 374.623 314.431 358.192 C 314.431 341.762 301.247 328.219 285.25 328.219 Z M 197.707 328.219 C 181.711 328.219 168.526 341.762 168.526 358.192 C 168.526 374.623 181.711 388.165 197.707 388.165 C 213.704 388.165 226.888 374.623 226.888 358.192 C 226.888 341.762 213.704 328.219 197.707 328.219 Z M 197.707 348.201 C 203.179 348.201 207.434 352.572 207.434 358.192 C 207.434 363.812 203.179 368.183 197.707 368.183 C 192.236 368.183 187.98 363.812 187.98 358.192 C 187.98 352.572 192.236 348.201 197.707 348.201 Z M 285.25 348.201 C 290.722 348.201 294.977 352.572 294.977 358.192 C 294.977 363.812 290.722 368.183 285.25 368.183 C 279.779 368.183 275.523 363.812 275.523 358.192 C 275.523 352.572 279.779 348.201 285.25 348.201 Z" />
                  </svg>
                  <span>Cart</span>
                </Link>
              </Nav>
            </Navbar.Collapse>
          </div>
          <div className="sub-header">
            <div className="d-flex">
              <Link
                to="#"
                className="nav-link header-link p-1"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i> Categorías
              </Link>
              <Link to="/store/cart/" className="nav-link header-link p-0 mx-4 d-lg-none ">
                  {
                    <span className="cart-badge">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </span>
                  }
                  <svg
                    fill="#ffffff"
                    viewBox="130 150 200 300"
                    width="40px"
                    height="40px"
                  >
                    <path d="M 110.164 188.346 C 104.807 188.346 100.437 192.834 100.437 198.337 C 100.437 203.84 104.807 208.328 110.164 208.328 L 131.746 208.328 L 157.28 313.233 C 159.445 322.131 167.197 328.219 176.126 328.219 L 297.409 328.219 C 306.186 328.219 313.633 322.248 315.951 313.545 L 341.181 218.319 L 320.815 218.319 L 297.409 308.237 L 176.126 308.237 L 150.592 203.332 C 148.426 194.434 140.675 188.346 131.746 188.346 L 110.164 188.346 Z M 285.25 328.219 C 269.254 328.219 256.069 341.762 256.069 358.192 C 256.069 374.623 269.254 388.165 285.25 388.165 C 301.247 388.165 314.431 374.623 314.431 358.192 C 314.431 341.762 301.247 328.219 285.25 328.219 Z M 197.707 328.219 C 181.711 328.219 168.526 341.762 168.526 358.192 C 168.526 374.623 181.711 388.165 197.707 388.165 C 213.704 388.165 226.888 374.623 226.888 358.192 C 226.888 341.762 213.704 328.219 197.707 328.219 Z M 197.707 348.201 C 203.179 348.201 207.434 352.572 207.434 358.192 C 207.434 363.812 203.179 368.183 197.707 368.183 C 192.236 368.183 187.98 363.812 187.98 358.192 C 187.98 352.572 192.236 348.201 197.707 348.201 Z M 285.25 348.201 C 290.722 348.201 294.977 352.572 294.977 358.192 C 294.977 363.812 290.722 368.183 285.25 368.183 C 279.779 368.183 275.523 363.812 275.523 358.192 C 275.523 352.572 279.779 348.201 285.25 348.201 Z" />
                  </svg>
                  <span>Cart</span>
                </Link>
                <a href="/" className="nav-link header-link p-1 mx-2  ">
                  Página principal
                </a>
              
              
              {/* {['Todays Deal', 'Gifts', 'On Sale'].map((x) => (
                <Link
                  key={x}
                  className="nav-link header-link p-1 px-3"
                  to={`/store/search?tag=${x}`}
                >
                  {x}
                </Link>
              ))} */}
            </div>
          </div>
        </Navbar>
      </header>

      {sidebarIsOpen && (
        <div
          onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
          className="side-navbar-backdrop"
        ></div>
      )}

      <div
        className={
          sidebarIsOpen
            ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
            : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
        }
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
            <MessageBox variant="danger">
              {getError(error as ApiError)}
            </MessageBox>
          ) : (
            categories!.map((category) => (
              <ListGroup.Item action key={category.id}>
                <LinkContainer
                  to={{ pathname: `/store/search/${category.id}` }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category.name} </Nav.Link>
                </LinkContainer>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
         
      </div>
      

      <main>
        <Container className="mt-3">
          <Outlet />
        </Container>
      </main>
      <footer>
      <FloatWhatsapp/>
        <Footer/>
        <div className="">
          
        </div>
      </footer>
    </div>
  )
}

export default App
