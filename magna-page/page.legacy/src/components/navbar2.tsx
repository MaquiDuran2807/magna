// import { Link } from 'react-router-dom';
import {LogoOriginal} from '../assets/img/logoOriginal'
import {Nav,Navbar,Container} from 'react-bootstrap';
import './styles/navbar2.css'
import { Link, NavLink } from 'react-router-dom';
import useIntersectionObserver from '../hooks/useLazyload';

const NavBar = () => {
  const themeLogin="text-black"
    return (
        <>
          {/* <div className="container"> */}
          <Container >
              <Navbar className="navbar" expand="lg"  >
                <Container>
                  <Navbar.Brand as={Link} to="/"><LogoOriginal width='150' height='30' /></Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                    <Link className={`links nav navbar  ${themeLogin} `} to="/AboutUS" >Quiénes somos</Link>
                        <NavLink className={`links nav navbar  ${themeLogin} `} to="/servicios#header">Servicios</NavLink>
                        <Link className={`links nav navbar  ${themeLogin} `} to="/contact">Contacto</Link>
                        <NavLink className={`links nav navbar  ${themeLogin} `} to="/projects">Proyectos</NavLink>
                        <Link className={`links nav navbar  ${themeLogin} `} to="/cotizador">Login</Link>
                        <Link to="/blog"  className='links nav navbar text-black'>blog </Link>
                        <a className={`links nav navbar  ${themeLogin} `} href="/store/">
                          <div className='store'>
                            <span>Magnatienda</span>
                          </div>
                        </a>
                    </Nav>
                  </Navbar.Collapse>
              </Container>
            </Navbar>
          </Container>
          



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

    export default function LazyNavbar2 () {
      const {  isVisible, ref } = useIntersectionObserver('100px');
      return (
          <div id="LazyNavbar2" ref={ref}>
              {isVisible ? <NavBar /> : null}
          </div>
      );
    }