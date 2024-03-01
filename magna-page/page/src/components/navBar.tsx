
import { useState } from 'react';
import { Collapse,Nav,Navbar} from 'react-bootstrap';
import './styles/navbar.css'
import {LogoOriginal} from '../assets/img/logoOriginal'
import drop from '../assets/img/down-arrow-dark.svg'
import { Link,NavLink} from 'react-router-dom';




export const NavBar = (  ) => {
    const [open, setOpen] = useState(false);
    const themeLogin="text-black"
  
      return (
          <>
            {/* <div className="container"> */}
            <div className=' navegacion'>
                <Navbar className="navbar pt-0 mt-0 " expand="lg"  >
                  <div className='navbarra container-fluid'>
                    <Navbar.Brand  className='brand ' as={Link} to="/">
                      {/* <img src={logo} alt="logo" className='logo' width={"400px"}/> */}
                      <LogoOriginal width={260} className='logoMagna' />
                    </Navbar.Brand>
                    <Navbar.Toggle  aria-controls="basic-navbar-nav " />
                    <Navbar.Collapse id="basic-navbar-nav ">
                      <Nav className="ms-auto">
                        <Link className={`links nav navbar  ${themeLogin} `} to="/AboutUS" >Quiénes somos</Link>
                        <NavLink className={`links nav navbar  ${themeLogin} `} to="/servicios#header">Servicios</NavLink>
                        <Link className={`links nav navbar  ${themeLogin} `} to="/contact">Contacto</Link>
                        <NavLink className={`links nav navbar  ${themeLogin} `} to="/projects">Proyectos</NavLink>
                        <Link className={`links nav navbar  ${themeLogin} `} to="/cotizador">Login</Link>
                        <div onClick={() => setOpen(!open)}>
                          
                          <Link to="/blog"  className='links nav navbar text-black'>blog <span><img src={drop} alt="" /> </span></Link>
                        <Collapse in={open}>
                          <div id="example-collapse-text" className='drop ' >
                            <a href='/blog/ia' className='links links-drop text-black'>IA</a>
                          </div>
                        </Collapse>
                        </div>
                        
                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown" >
                          
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                              Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                              Separated link
                            </NavDropdown.Item>
                          
                          
                        </NavDropdown> */}
                      </Nav>
                    </Navbar.Collapse>
                </div>
              </Navbar>
            </div>
          </>
      );
      }