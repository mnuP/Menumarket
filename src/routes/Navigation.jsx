import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import style from"../navigation.module.css";


function Navigation() {
  return (
    <>
        <Navbar key="md" expand="md" className={style.linearG}>
          <Container style={{position:"absolute", top:"0"}}fluid>
            <Navbar.Brand style={{width:"15vw", marginRight:"5vw"}} href="#">
              <img
                src="https://menumarket.co/wp-content/uploads/2022/03/menu-logo.png"
                width="100%"
                height="100%"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-md`}
              aria-labelledby={`offcanvasNavbarLabel-expand-md`}
              placement="end"
            >
              <Offcanvas.Body>
                <Form className="d-flex">
                  <Form.Control style={{width:"60vw"}}
                    type="search"
                    placeholder="Buscar Eventos"
                    className="me-5"
                    aria-label="Search"
                    size="sm"
                  />
                  <Button style={{width:"15vw", backgroundColor:"#000000", borderBlockColor:"#CCD888", color:"#CCD888", borderWidth:"0.2em"}} className="ButtonName" variant="outline-success">Se Parte de Menumarket!</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    </>
  );
}

export default Navigation;