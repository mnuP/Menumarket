import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import imagenFondo from "../images/fondoPostulacion.jpg";


function UploadData() {
  return (
    <div className="fondo-p">
      <img className="imagen-p" alt="Imagen p" src={imagenFondo} />
      <div className="horizontal-p">
        <p className="se-parte-de">Se Parte De Menumarket Llenando Tu Postulacion Aqui.</p>
      </div>
      <div className="form-p">
        <Form style={{ padding:"10vh 5vw"}}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Titulo:</Form.Label>
            <Form.Control type="Text" placeholder="Titulo evento..." />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Ciudad:</Form.Label>
            <Form.Select defaultValue="Choose...">
              <option>Choose...</option>
              <option>...</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Clase:</Form.Label>
            <Form.Control type="Text" placeholder="Titulo evento..." />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Tipo:</Form.Label>
            <Form.Select defaultValue="Choose...">
              <option>Choose...</option>
              <option>...</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Direccion:</Form.Label>
          <Form.Control placeholder="1234 Main St" />
        </Form.Group>

        <FloatingLabel
          controlId="floatingTextarea"
          label="Descripcion"
          className="mb-3"
        >
          <Form.Control as="textarea" placeholder="Leave a comment here" />
        </FloatingLabel>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Maximo</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Minimo</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Tiempo</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Precio P/P</Form.Label>
            <Form.Control />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Incluye:</Form.Label>
          <Form.Control placeholder="1234 Main St" />
        </Form.Group>

        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Subir Imagen"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <Button variant="outline-secondary" id="button-addon2">
            Imagen
          </Button>
        </InputGroup>

        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
      </div>
    </div>
  );
}

export default UploadData;