import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import imagenFondo from "../images/fondoPostulacion.jpg";
import imagenBox from "../images/imagen-fondo-proveedor.png";
import imagenLog from "../images/adBg.jpg";
import { useEffect, useState } from "react";
import { storage, auth } from "../firebase/firebase";
import { ref, uploadBytes,getDownloadURL} from "firebase/storage";
import {collection, addDoc, deleteDoc, serverTimestamp, onSnapshot, doc} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import style from "../styleForm.css";


function Admin() {  
  const [imageUpload, setImageUpload] = useState('');
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
  const [extra, setExtra] =useState(0);
  const [url, setUrl] = useState(0);
  const [url2, setUrl2] = useState(0);
  const [url3, setUrl3] = useState(0);
  const [items, setItems] = useState([]);
  const [itemIndex, setItemIndex] = useState(0);
  const [itemID, setItemID] = useState(0);
  const collectionRef = collection(db, "usersPrincipal");
  const collectionRefN = collection(db, "usersNoAceptados");
  const [currentUser, setCurrentUser] = useState(null);
  const [user, setUser] = useState(null);
    /*
    0: Inicializando
    1: Login Pero sin registro
    2: login completo
    3: No hay nadie logeado
    */
  const [state, setCurrentState] = useState(0);

  async function handleOnCLickLogin(){
    const googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });
    await singInWithGoogle(googleProvider);

    async function singInWithGoogle(googleProvider){
      try{
        const res = await signInWithPopup(auth, googleProvider);
      } catch(error){
        console.log(error);
      }
    }
  }

  useEffect(()=>{
    onAuthStateChanged(auth, handleUserStateChanged);
  },[]);

  function handleUserStateChanged(user){
    if(user){
      setCurrentState(1);
      if(user.uid === "8b2SM94eisS6EQHS2MTq8WBWdab2"){
        setCurrentState(2);
      } else{
        setCurrentState(3);
        alert("Deber tener una cuenta de Administrador Menumarket!!!");
      }
    }
  };

  //--------------------Auth /\ -------------
  async function callAllItems(){
    const dataTest =  await onSnapshot(collectionRefN,(querySnapshot) => { 
      const items = [];
      querySnapshot.forEach((doc) => {
          items.push({...doc.data(), id: doc.id});
      });
      setItems(items);
    });
    console.log(items);
    asignarValoresALabels();
  };

  function avanzarItem(){
    if ((items.length - 1) > itemIndex) {
      setItemIndex(itemIndex + 1);
    };
  };

  function retrocedeItem(){
    
    if (itemIndex > 0) {
      setItemIndex(itemIndex - 1);
    };
  }

  function asignarValoresALabels(){
    if (items.length>0) {
      setTitulo(items[itemIndex].title)
      setCiudad(items[itemIndex].city)
      setClase(items[itemIndex].class)
      setModality(items[itemIndex].modality)
      setDesc(items[itemIndex].description)
      setDir(items[itemIndex].direction)
      setCapacity(items[itemIndex].capacity)
      setDisponibility(items[itemIndex].disponibility)
      setTiempo(items[itemIndex].time)
      setPrecio(items[itemIndex].price)
      setIncluye(items[itemIndex].includes)
      setUrl(items[itemIndex].photo)
      setUrl2(items[itemIndex].photo2)
      setUrl3(items[itemIndex].photo3)
      setItemID(items[itemIndex].id)
      setUser(items[itemIndex].user)
      setExtra(items[itemIndex].extra)
    }else{
      window.alert("Debe importar los proveedores");
    };  
  };

  async function deleteDocument(){
    try {
      const docRef = doc(db, 'usersNoAceptados', itemID);
      deleteDoc(docRef);

    }catch(err){
      console.log(err);
    };
  }
  
  const uploadForm = async(e) =>{  

    e.preventDefault();
    /*const imageRef = ref(storage, `eventos/${"Profile" + imageUpload.name}`);
    await uploadBytes(imageRef, imageUpload)
    const url = await getDownloadURL(imageRef);
    setUrl(url);*/

    try{ 
      const dataDocs = await addDoc(collectionRef, 
        {
          title: titulo,
          city: ciudad,
          class: clase,
          modality: modality,
          extra: extra,
          direction: dir,
          description: desc,
          capacity: capacity,
          disponibility: disponibility,
          time: tiempo,
          price: precio,
          includes: incluye,
          photo: url,
          photo2: url2,
          photo3: url3,
          timeStamp: serverTimestamp(),
          user: user
        })

        deleteDocument();
      } catch (e) {
        window.alert(e);
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: `url(${imagenLog})`,
    backgroundSize: 'cover',
  };

  const frameStyle = {
    background: `url(${imagenBox}) no-repeat center center`,
    backgroundSize: 'cover',
    padding: '80px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
    borderRadius: '10px',
    textAlign: 'center',
    color: '#fff',
  };

  if(state === 0){
    return(
      <div style={containerStyle}>
        <div style={frameStyle}>
          <div>
            <Button type="button "class="btn btn-light" onClick={handleOnCLickLogin}>Login</Button>
          </div>
        </div>
      </div>
    );
  }
  if(state === 1){
    return(
      <div className='logBack'>
        <div className='logBox'>
          <div> Se encuentra autenticado pero no registrado </div>
        </div>
      </div>
    );
  }
  if(state === 3){
    return(
      <div style={containerStyle}>
        <div style={frameStyle}>
          <div>
          <Button type="button "class="btn btn-light" className={`botonesUnicoFiltro`} onClick={handleOnCLickLogin}>Login</Button>
          </div>
        </div>
      </div>
    );
  }
  if(state === 2){
    return (
      <div className="fondo-p">
        <img className="imagen-p" alt="Imagen p" src={imagenFondo} />
        <div className="form-p">
          <Form onSubmit={uploadForm} style={{ padding:"10vh 5vw"}}>
          <Button variant="warning" onClick={callAllItems}>
            Importar proveedores
          </Button>
          <Button variant="light" onClick={retrocedeItem} style={{marginLeft:"20vw"}}>
            Anterior
          </Button>
          <Button variant="light" onClick={asignarValoresALabels} style={{marginLeft:"1vw"}}>
            Ver postulacion: {itemIndex + 1}
          </Button>
          <Button variant="light" onClick={avanzarItem} style={{marginLeft:"1vw"}}>
            Siguiente
          </Button>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="titulo (Nombre restaurante, experiencia o chef)">
              <Form.Label className="flTxt">Titulo:</Form.Label>
              <Form.Control onChange={(event) => {setTitulo(event.target.value); }} type="Text" value={titulo} />
            </Form.Group>
  
            <Form.Group as={Col} controlId="ciudad">
              <Form.Label className="flTxt">Ciudad:</Form.Label>
              <Form.Select onChange={(event) => {setCiudad(event.target.value)}} value={ciudad}>
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
              <Form.Select onChange={(event) => {setClase(event.target.value)}} value={clase}>
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
              <Form.Select onChange={(event) => {setModality(event.target.value)}} value={modality}>
                <option>Seleccionar...</option>
                <option>Presencial</option>
                <option>Virtual</option>
                <option>Hibrida</option>
              </Form.Select>
            </Form.Group>
          </Row>
  
          <Form.Group className="mb-3" controlId="dir">
            <Form.Label className="flTxt">Direccion:</Form.Label>
            <Form.Control onChange={(event) => {setDir(event.target.value)}} value={dir}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="extra">
            <Form.Label className="flTxt">Especialidad o Anfitrion:</Form.Label>
            <Form.Control onChange={(event) => {setExtra(event.target.value)}} placeholder="Especialidad del restaurante o Nombre del Anfitrion" />
          </Form.Group>
  
          <FloatingLabel
            controlId="desc"
            className="mb-3"
          >
            
            <Form.Control onChange={(event) => {setDesc(event.target.value)}} as="textarea" value={desc}/>
          </FloatingLabel>
  
          <Row className="mb-3">
            <Form.Group as={Col} controlId="max">
              <Form.Label className="flTxt">Capacidad Min-Max</Form.Label>
              <Form.Control onChange={(event) => {setCapacity(event.target.value)}} value={capacity}/>
            </Form.Group>
  
            <Form.Group as={Col} controlId="min">
              <Form.Label className="flTxt">Disponibilidad</Form.Label>
              <Form.Control value={disponibility} onChange={(event) => {setDisponibility(event.target.value)}}/>
            </Form.Group>
  
            <Form.Group as={Col} controlId="tiempo">
              <Form.Label className="flTxt">Tiempo(h)</Form.Label>
              <Form.Control value={tiempo} onChange={(event) => {setTiempo(event.target.value)}}/>
            </Form.Group>
  
            <Form.Group as={Col} controlId="precio">
              <Form.Label className="flTxt">Precio P/P</Form.Label>
              <Form.Control onChange={(event) => {setPrecio(event.target.value)}} value={precio}/>
            </Form.Group>
          </Row>
  
          <Form.Group className="mb-3" controlId="incluye">
            <Form.Label className="flTxt">Incluye:</Form.Label>
            <Form.Control onChange={(event) => {setIncluye(event.target.value)}} value={incluye} placeholder="Si es restaurante (Uso de espacio, capacidad y equipamiento), Si es online (¿Se envian kits?)" />
          </Form.Group>

          <Container>
            <Row>
              <Col xs={8} md={6}>

              <InputGroup>
                  
                  <Form.Control
                    placeholder="Subir Imagen"
                    aria-describedby="basic-addon2"
                    type='file'
                    //onChange={(event) => {setImageUpload(event.target.files[0])}}
                  />
                </InputGroup>                 
                <br/>

                <Image src={url} thumbnail />
              </Col>
              <Col xs={8} md={6}>

              <InputGroup>
                  
                  <Form.Control
                    placeholder="Subir Imagen"
                    aria-describedby="basic-addon2"
                    type='file'
                    //onChange={(event) => {setImageUpload(event.target.files[0])}}
                  />
                </InputGroup>
                <br/>

                <Image src={url2} thumbnail />
              </Col>
            </Row>
          </Container>

          <br></br>
  
          <Button variant="success" type="submit">
            Aceptar
          </Button>
          <Button variant="danger" onClick={deleteDocument} style={{marginLeft:"2vw"}}>
            Rechazar
          </Button>
        </Form>
        </div>
      </div>
    );
  }

  return(<div>Loading...</div>);
}

export default Admin;