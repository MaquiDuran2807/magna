// import { Link } from 'react-router-dom';
import { useState } from 'react';
import {LogoOriginal} from '../assets/img/logoOriginal'
import { Collapse,Nav,Navbar,Container} from 'react-bootstrap';
import './styles/navbar2.css'


import drop from '../assets/img/down-arrow-dark.svg'

export const NavBar = () => {
  const [open, setOpen] = useState(false);

    return (
        <>
          {/* <div className="container"> */}
          <Container >
              <Navbar className="navbar" expand="lg"  >
                <Container>
                  <Navbar.Brand href="/"><LogoOriginal width='150' height='30' /></Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                      <Nav.Link href="/AboutUS" className="links">Quien somos</Nav.Link >
                      <Nav.Link href="Productos" className="links">Productos</Nav.Link>
                      <div onClick={() => setOpen(!open)}>
                        
                        <Nav.Link className="links" >blog <span><img src={drop} alt="" /> </span></Nav.Link>

                      <Collapse in={open}>
                        <div id="example-collapse-text" className='drop' >
                          <Nav.Link href='/blog/ia'>IA</Nav.Link>
                        </div>
                      </Collapse>
                      </div>
                      
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