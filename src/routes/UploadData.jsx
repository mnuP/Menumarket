import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import imagenFondo from "../images/fondoPostulacion.jpeg";
import { useState } from "react";
import { storage } from "../firebase/firebase";
import { useNavigate, useLocation } from 'react-router-dom';
import { ref, uploadBytes,getDownloadURL} from "firebase/storage";
import {collection, addDoc, serverTimestamp} from 'firebase/firestore';
import { db } from '../firebase/firebase';


function UploadData(props) {  
  const [imageUpload, setImageUpload] = useState('');
  const [imageUpload2, setImageUpload2] = useState('');
  const [titulo, setTitulo] =useState(0);
  const [ciudad, setCiudad] =useState(0);
  const [clase, setClase] =useState(0);
  const [modality, setModality] =useState(0);
  const [dir, setDir] =useState(0);
  const [desc, setDesc] =useState(0);
  const [capacity, setCapacity] =useState(0);
  const [disponibility, setDisponibility] =useState(0);
  const [tiempo, setTiempo] =useState(0);
  const [precio, setPrecio] =useState(0);
  const [incluye, setIncluye] =useState(0);
  const [url, setUrl] = useState(0);
  const [url2, setUrl2] = useState(0);

  const location = useLocation();
  const itemPass = location.state.itemPass;
  

  const uploadForm = async(e) =>{   

    e.preventDefault();
    const imageRef = ref(storage, `eventos/${"Profile" + imageUpload.name}`);
    const imageRef2 = ref(storage, `eventos/${"Profile" + imageUpload2.name}`);

    await uploadBytes(imageRef, imageUpload)
    await uploadBytes(imageRef2, imageUpload2)

    const url = await getDownloadURL(imageRef);
    const url2 = await getDownloadURL(imageRef2);

    setUrl(url);
    setUrl2(url2);


    try{ 
      const dataDocs = await addDoc(collection(db,"usersNoAceptados"), 
        {
          title: titulo,
          city: ciudad,
          class: clase,
          modality: modality,
          direction: dir,
          description: desc,
          capacity: capacity,
          disponibility: disponibility,
          time: tiempo,
          price: precio,
          includes: incluye,
          photo: url,
          photo2: url2,
          timeStamp: serverTimestamp(),
          accepted: "No Aceptado",
          user: itemPass
        })
        window.alert("!Su postulacion ha sido enviada¡");
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
          <Form.Group as={Col} controlId="titulo (Nombre del restaurante, experiencia o chef)">
            <Form.Label className="flTxt">Titulo:</Form.Label>
            <Form.Control onChange={(event) => {setTitulo(event.target.value)}} type="Text" placeholder="Titulo evento..." />
          </Form.Group>

          <Form.Group as={Col} controlId="ciudad">
            <Form.Label className="flTxt">Ciudad:</Form.Label>
            <Form.Select onChange={(event) => {setCiudad(event.target.value)}} defaultValue="Choose...">
              <option>Seleccionar...</option>
              <option>Todas</option>
              <option>Bogota</option>
              <option>Medellin</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="clase">
            <Form.Label className="flTxt"> Clase:</Form.Label>
            <Form.Select onChange={(event) => {setClase(event.target.value)}} defaultValue="Choose...">
              <option>Seleccionar...</option>
              <option>Restaurantes</option>
              <option>Cata</option>
              <option>De Temporada</option>
              <option>Taller de Cocina</option>
              <option>Master Class</option>
              <option>Regalos Corporativos</option>
              <option>Catering</option>
              <option>Chef en Casa</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="tipo">
            <Form.Label className="flTxt">Modalidad:</Form.Label>
            <Form.Select onChange={(event) => {setModality(event.target.value)}} defaultValue="Choose...">
              <option>Seleccionar...</option>
              <option>Presencial</option>
              <option>Virtual</option>
              <option>Hibrida</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="dir">
          <Form.Label className="flTxt">Direccion:</Form.Label>
          <Form.Control onChange={(event) => {setDir(event.target.value)}} placeholder="Carrera 7a # 1-70" />
        </Form.Group>

        <FloatingLabel
          controlId="desc"
          label="Descripcion"
          className="mb-3"
        >
          <Form.Control onChange={(event) => {setDesc(event.target.value)}} as="textarea" placeholder="Leave a here" />
        </FloatingLabel>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="max">
            <Form.Label className="flTxt">Capacidad Max</Form.Label>
            <Form.Control placeholder="15 - 30" onChange={(event) => {setCapacity(event.target.value)}} />
          </Form.Group>

          <Form.Group as={Col} controlId="min">
            <Form.Label className="flTxt">Disponibilidad</Form.Label>
            <Form.Control placeholder="1PM a 6PM" onChange={(event) => {setDisponibility(event.target.value)}}/>
          </Form.Group>

          <Form.Group as={Col} controlId="tiempo">
            <Form.Label className="flTxt">Tiempo(h)</Form.Label>
            <Form.Control placeholder="2" onChange={(event) => {setTiempo(event.target.value)}}/>
          </Form.Group>

          <Form.Group as={Col} controlId="precio">
            <Form.Label className="flTxt">Precio P/P</Form.Label>
            <Form.Control onChange={(event) => {setPrecio(event.target.value)}} />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="incluye">
          <Form.Label className="flTxt">Incluye:</Form.Label>
          <Form.Control onChange={(event) => {setIncluye(event.target.value)}} placeholder="50g de té, 2 infusores bola, 1 cuchara medidora, 2 cuencos de cristal, plegable informativo y envio nacional." />
        </Form.Group>

        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Subir Imagen"
            aria-describedby="basic-addon2"
            type='file'
            onChange={(event) => {setImageUpload(event.target.files[0])}}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Subir Segunda Imagen"
            aria-describedby="basic-addon2"
            type='file'
            onChange={(event) => {setImageUpload2(event.target.files[0])}}
          />
        </InputGroup>

        <Button variant="light" type="submit">
          Enviar
        </Button>
      </Form>
      </div>
    </div>
  );
}

export default UploadData;