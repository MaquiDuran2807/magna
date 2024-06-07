
import { Nav,Navbar} from 'react-bootstrap';
import './styles/navbar.css'
import {LogoOriginal} from '../assets/img/logoOriginal'
import { Link,NavLink} from 'react-router-dom';
export const NavBar = (  ) => {
    const themeLogin="text-black"
      return (
          <>
            <div className='  '>
                <Navbar className=" pt-0 mt-0 p-0" expand="lg"  fixed="top" >
                  <div className='navbarra container-fluid '>
                    <Navbar.Brand  className='brand ' as={Link} to="/">
                      {/* <img src={logo} alt="logo" className='logo' width={"400px"}/> */}
                      <LogoOriginal width={260} className='logoMagna' />
                    </Navbar.Brand>
                    <Navbar.Toggle  aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav ">
                      <Nav className="ms-auto">
                        <Link className={`links nav navbar p-0  ${themeLogin} `} to="/AboutUS" >Quiénes somos</Link>
                        <NavLink className={`links nav navbar p-0 ${themeLogin} `} to="/servicios#header">Servicios</NavLink>
                        <Link className={`links nav navbar p-0 ${themeLogin} `} to="/contact">Contacto</Link>
                        <NavLink className={`links nav navbar p-0 ${themeLogin} `} to="/projects">Proyectos</NavLink>
                        <Link className={`links nav navbar p-0 ${themeLogin} `} to="/cotizador">Login</Link>
                        <Link to="/blog"  className='links nav navbar p-0 text-black'>blog </Link>
                        <a className={`links nav navbar p-0 ${themeLogin} `} href="/store/">
                          <div className='store'>
                            <span>Magnatienda</span>
                          </div>
                        </a>
                      </Nav>
                    </Navbar.Collapse>
                </div>
              </Navbar>
            </div>
          </>
      );
      }