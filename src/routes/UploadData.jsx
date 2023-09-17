import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import imagenFondo from "../images/fondoPostulacion.jpg";
import { useState } from "react";
import { storage } from "../firebase/firebase";
import { ref, uploadBytes,getDownloadURL} from "firebase/storage";
import {collection, addDoc, serverTimestamp} from 'firebase/firestore';
import { db } from '../firebase/firebase'


function UploadData() {  
  const [imageUpload, setImageUpload] = useState('');
  const [titulo, setTitulo] =useState(0);
  const [ciudad, setCiudad] =useState(0);
  const [clase, setClase] =useState(0);
  const [tipo, setTipo] =useState(0);
  const [dir, setDir] =useState(0);
  const [desc, setDesc] =useState(0);
  const [max, setMax] =useState(0);
  const [min, setMin] =useState(0);
  const [tiempo, setTiempo] =useState(0);
  const [precio, setPrecio] =useState(0);
  const [incluye, setIncluye] =useState(0);
  const [url, setUrl] = useState(0);
  
  const uploadForm = async(e) =>{   

    e.preventDefault();
    const imageRef = ref(storage, `eventos/${"Profile" + imageUpload.name}`);
    await uploadBytes(imageRef, imageUpload)
    const url = await getDownloadURL(imageRef);
    setUrl(url);

    try{ 
      const dataDocs = await addDoc(collection(db,"usersPrincipal"), 
        {
          title: titulo,
          city: ciudad,
          class: clase,
          type: tipo,
          direction: dir,
          description: desc,
          maximun: max,
          minimun: min,
          time: tiempo,
          price: precio,
          includes: incluye,
          photo: url,
          timeStamp: serverTimestamp()
        })
      } catch (e) {
        console.log(e);
    }
  };
  
  return (
    <div className="fondo-p">
      <img className="imagen-p" alt="Imagen p" src={imagenFondo} />
      <div className="horizontal-p">
        <p className="se-parte-de">Se Parte De Menumarket Llenando Tu Postulacion Aqui.</p>
      </div>
      <div className="form-p">
        <Form onSubmit={uploadForm} style={{ padding:"10vh 5vw"}}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="titulo">
            <Form.Label>Titulo:</Form.Label>
            <Form.Control onChange={(event) => {setTitulo(event.target.value)}} type="Text" placeholder="Titulo evento..." />
          </Form.Group>

          <Form.Group as={Col} controlId="ciudad">
            <Form.Label>Ciudad:</Form.Label>
            <Form.Select onChange={(event) => {setCiudad(event.target.value)}} defaultValue="Choose...">
              <option>1</option>
              <option>2</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="clase">
            <Form.Label>Clase:</Form.Label>
            <Form.Control onChange={(event) => {setClase(event.target.value)}} type="Text" placeholder="Titulo evento..." />
          </Form.Group>

          <Form.Group as={Col} controlId="tipo">
            <Form.Label>Tipo:</Form.Label>
            <Form.Select onChange={(event) => {setTipo(event.target.value)}} defaultValue="Choose...">
              <option>T1</option>
              <option>T2</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="dir">
          <Form.Label>Direccion:</Form.Label>
          <Form.Control onChange={(event) => {setDir(event.target.value)}} placeholder="1234 Main St" />
        </Form.Group>

        <FloatingLabel
          controlId="desc"
          label="Descripcion"
          className="mb-3"
        >
          <Form.Control onChange={(event) => {setDesc(event.target.value)}} as="textarea" placeholder="Leave a comment here" />
        </FloatingLabel>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="max">
            <Form.Label>Maximo</Form.Label>
            <Form.Control placeholder="Leave a comment here" onChange={(event) => {setMax(event.target.value)}} />
          </Form.Group>

          <Form.Group as={Col} controlId="min">
            <Form.Label>Minimo</Form.Label>
            <Form.Control onChange={(event) => {setMin(event.target.value)}}/>
          </Form.Group>

          <Form.Group as={Col} controlId="tiempo">
            <Form.Label>Tiempo</Form.Label>
            <Form.Control onChange={(event) => {setTiempo(event.target.value)}}/>
          </Form.Group>

          <Form.Group as={Col} controlId="precio">
            <Form.Label>Precio P/P</Form.Label>
            <Form.Control onChange={(event) => {setPrecio(event.target.value)}} />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="incluye">
          <Form.Label>Incluye:</Form.Label>
          <Form.Control onChange={(event) => {setIncluye(event.target.value)}} placeholder="1234 Main St" />
        </Form.Group>

        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Subir Imagen"
            aria-describedby="basic-addon2"
            type='file'
            onChange={(event) => {setImageUpload(event.target.files[0])}}
          />
          <Button variant="primary" type="submit">
            Subir
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