
import { useState } from 'react';
import { Collapse,Nav,Navbar} from 'react-bootstrap';
import './styles/navbar.css'
import {LogoOriginal} from '../assets/img/logoOriginal'
import drop from '../assets/img/down-arrow-dark.svg'
import { Link,NavLink} from 'react-router-dom';




export const NavBar = (  ) => {
    const [open, setOpen] = useState(false);
    

    // console.log(props);
    

    // const [theme, setTheme] = useState('light');

    // const handleTheme = () => {
    //     if (theme === 'light') {
    //         setTheme('dark');
    //     } else {
    //         setTheme('light');
    //     }
    // }
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
                        <Link className={`links nav navbar  ${themeLogin} `} to="/cotizador">Cotizar</Link>
                        <div onClick={() => setOpen(!open)}>
                          
                          <a  className='links nav navbar text-black'>blog <span><img src={drop} alt="" /> </span></a>
  
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
            
  
  
  
          {/* <Container className='col rounded-9 '>
          <Row >
          <Navbar className="navbar navbar-dark bg-ligh  " id='barra ' variant="dark" expand="lg">
          
            
            <Navbar.Brand as={Link} to="/" className="col-6 ">
              <img
                alt="kjasnkdansjkdnka"
                src="../assets/react.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              <span className='text-light'>Elit</span>
            </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav"  className="   ">
              <Nav className='row col-12 justify-content-end'> 
                <div className='col-2'>
                  <Link to="/" class="nav-item" >Home</Link>
                </div>
                <Link to="/about" class="col-2">About</Link>
                <Link to="/contact" class="col-2">Contact</Link>
              </Nav>
              </Navbar.Collapse>
          
          </Navbar>
          </Row>
          </Container> */}
            {/* </div> */}
            
          
          </>
      );
      }