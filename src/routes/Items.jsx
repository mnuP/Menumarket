import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import { db, getTodosCard } from '../firebase/firebase'
import { onSnapshot, collection} from "firebase/firestore";
import style from "../styleForm.css";
import $ from 'jquery';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {auth, logout} from "../firebase/firebase";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import nullImage from "../images/nullPP.png";
import Footer from './Footer';
import imagenFondo from "../images/imagen-fondo-proveedor.png";


function Items({ query }) {

    //-------------------------Autehntication--START-----------------//
    const [currentUser, setCurrent] = useState(null);
    const navigate = useNavigate();
    const [userUID, setCurrentUID] = useState("");
    const [outButt, setOutButt] = useState("none");
    const [singButt, setSingButt] = useState("Iniciar Sesion");

    console.log(outButt);

    useEffect(() =>{
        onAuthStateChanged(auth, handleUserStateChanged);
    },[]);

    function handleUserStateChanged(user){
        if(user){
            setCurrent(user);
            setCurrentUID(user.uid);
            setOutButt("");
            setSingButt("Perfil");
        }
    }

    async function handleOnClickNP(){
      /*if(currentUser){
          navigate("/Upload");
      }else{
        doAuthenticate();
        if(currentUser){
          navigate("/Upload");
        }
      }*/
      doAuthenticate();
    }

    async function doAuthenticate(){
      const googleProvider = new GoogleAuthProvider();  
      googleProvider.setCustomParameters({ prompt: 'select_account' });
      await singInWithGoogle(googleProvider);
    
      async function singInWithGoogle(googleProvider){
        try {
          const res = await signInWithPopup(auth, googleProvider);
      
        } catch (error) {
          console.error(error);
        }
      }
      refreshPage();
    }

    async function doLogout() {
      await logout();
      setOutButt("");
      setSingButt("Iniciar Sesion");
      refreshPage();
    }

    function handleOnClickGoUpload(){
      if(currentUser){
        navigate("/user", {state: {userUID}});
      }else{
        doAuthenticate();
      }
    };

  //-------------------------Autehntication--END-------------------//
  //-------------------------DATABASE--------START-----------------//
  function refreshPage() {
    window.location.reload(false);
  }

  const tipos = ["Cata", "Catering", "Chef en Casa", "Master Class",   "Regalos Corporativos", "Restaurantes", "Taller de Cocina"];
  const ciudad = ["Bogota", "Medellin"];
  const modalidad = ["Presencial", "Virtual", "Hibrida"];
  const collectionRef = collection(db, "usersPrincipal");

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [search, setSearch] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterButtonClick = (selectedCategory) => {
    setSelectedFilters(selectedCategory);
  };

  const handleClick = event => {
    {tipos.map((item) => ( 
      document.getElementById(`dropdown-split-variants-${item}`).classList.remove(`botonesUnicoFiltro${item.replace(/ /g, '')}`)
    ))}
    let name = event.target.title
    let nameNoSpace = name.replace(/ /g, '')
    event.currentTarget.classList.toggle(`botonesUnicoFiltro${nameNoSpace}`);
  };
  
  const applyFiltro = () => {
    let ciudadSelect = document.querySelector('#dropdown-split-variants-ciudad').value;
    let modalidadSelect = document.querySelector('#dropdown-split-variants-modalidad').value;

    if(modalidadSelect === "Virtual"){
      ciudadSelect = "none";
    }
    let updatedList = items;

    if(ciudad.includes(ciudadSelect)){
      (updatedList = updatedList.filter((item) => {return item.city === ciudadSelect;}))
    }

    if(modalidad.includes(modalidadSelect)){
      (updatedList = updatedList.filter((item) => {return item.modality === modalidadSelect;}))
    }

    if(tipos.includes(selectedFilters)){
      (updatedList = updatedList.filter((item) => {return item.class === selectedFilters;}))
    }

    setDishes(updatedList)
    setSelectedFilters([])
    refresh();
  }

  const resetFiltro= () => {
    setDishes(items)
    setSelectedFilters([]);

    $('#dropdown-split-variants-ciudad option').prop('selected', function () {
      return this.defaultSelected;
    });

    $('#dropdown-split-variants-modalidad option').prop('selected', function () {
      return this.defaultSelected;
    });

    document.getElementById('dropdown-split-variants-Cata').classList.remove("botonesUnicoFiltroCata");

    {tipos.map((item) => ( 
      document.getElementById(`dropdown-split-variants-${item}`).classList.remove(`botonesUnicoFiltro${item.replace(/ /g, '')}`)
    ))};

    refresh();
  }

  const handleChange = (event) => {
    setSearch(event.target.value);
    let newFilter = items.filter(searched => searched.title.includes(search))    
    refresh();

    setDishes(newFilter);    

    if(event.target.value ==""){
      setDishes(items);
    }
  };

  const refresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };


  const [showNavbar, setShowNavbar] = useState(true)

  useEffect(()=> {
    const dataTest =  onSnapshot(collectionRef,(querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({...doc.data(), id: doc.id});
      });
      setItems(items);
      if( dishes.length === 0){
        setDishes(items)
      }
    });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      dataTest();
    };
  }, []);

  return (
    <>
      {loading ? (
      <>
        <div className= "principalNavbar" >
        <Navbar key="md" expand="md" className="mb-3 text-dark navbarMain" >
          <Container fluid>
            <Navbar.Brand className="navbarMain-logo"href="#">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/menumarket-b8993.appspot.com/o/logoRes.png?alt=media&token=c6553309-8232-4f92-a931-646bb48e878d&_gl=1*1w6iweb*_ga*MTg0NTk2OTc1NS4xNjkzNDUxNTQ1*_ga_CW55HF8NVT*MTY5NjYwMzMzMi40MC4xLjE2OTY2MDM0NDAuMTIuMC4w"
                width="50px"
                height="50px"
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
                  <div class="box">
                    <form class="search">
                        <input type="text" class="input" name="txt"  onChange={handleChange}
                        value={search}/>
                    </form>
                    <i class="fas fa-search"></i>
                  </div>
                  <div className="sessionID"> 
                    <Button key="ButtonAuth" onClick={handleOnClickNP} className="ButtonName" variant="outline-success">
                    {currentUser ? (
                      <img src={currentUser.photoURL} alt="User Profile"/>
                      ) : (
                      <img src={nullImage} alt="User Profile"/>)}
                    </Button>

                  <Button id="ButonGO" onClick={handleOnClickGoUpload}>{singButt}</Button>

                  <Button id="ButtonLog" onClick={doLogout}>Cerrar Sesion</Button>
                  </div>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
            
          </Container>
        </Navbar>

        <Navbar key="md" expand="md" className="mb-3 text-dark navbarMain" >
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-md`}
              aria-labelledby={`offcanvasNavbarLabel-expand-md`}
              placement="end"
            >
              <Offcanvas.Body>
                <nav className='centerNav'>
                  <div className="container" >
                    <div className={`nav-elements  ${showNavbar && "active"}`} fluid>

                      {/* Ciudad */}
                      <ul>
                        <li className={`botonesUnicoFiltro`}>
                          <select key="Ciudad" id={`dropdown-split-variants-ciudad`} title="Ciudad" variant = "ciudad">
                            <option id="none" value="none" selected hidden>Ciudad</option>
                            {ciudad.map((item) => (
                              <>
                                <option eventKey={item} key={item}>{item}</option>
                              </>
                            ))}
                          </select>
                        </li>


                        {/* Modalidad */}
                        <li  className={`botonesUnicoFiltro`}>
                          <select  key="Modalidad" id={`dropdown-split-variants-modalidad`} title="Modalidad" variant = "modalidad" >
                            <option value="none" selected  hidden>Modalidad</option>
                            {modalidad.map((item) => (
                              <>
                                <option eventKey={item} key={item}>{item}</option>
                              </>
                            ))}
                          </select>
                        </li>

                        {tipos.map((item) => (
                          <li onClick={(e) => {handleFilterButtonClick(e.target.title); handleClick(e)}} key={item} id={`dropdown-split-variants-${item}`} title={item} variant = {item} className={`botonesUnicoFiltro`}>
                            {item}
                          </li>
                          ),
                        )}

                        <li onClick={(e) => { applyFiltro(selectedFilters); }} key="apply" id={`dropdown-split-variants-apply`} title="apply" variant = "apply" className='botonSeleccion'>
                          Seleccionados
                        </li>

                        <li onClick={(e) => resetFiltro()} key="reset" id={`dropdown-split-variants-reset`} title="reset" variant = "reset" className='botonReset'>
                          Todos
                        </li>
                        <li></li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Navbar>
        </div>
        

        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      </>

      ) : ( 
      <>
      <div className="principalNavbar">
        <Navbar key="md" expand="md" className="mb-3 text-dark navbarMain">
              <Container fluid>
                <Navbar.Brand className="navbarMain-logo"href="#">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/menumarket-b8993.appspot.com/o/logoRes.png?alt=media&token=c6553309-8232-4f92-a931-646bb48e878d&_gl=1*1w6iweb*_ga*MTg0NTk2OTc1NS4xNjkzNDUxNTQ1*_ga_CW55HF8NVT*MTY5NjYwMzMzMi40MC4xLjE2OTY2MDM0NDAuMTIuMC4w"
                    width="50px"
                    height="50px"
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
                      <div class="box">
                        <form class="search">
                            <input type="text" class="input" name="txt"  onChange={handleChange}
                            value={search}/>
                        </form>
                        <i class="fas fa-search"></i>
                      </div>
                      <div className="sessionID"> 
                        <Button key="ButtonAuth" onClick={handleOnClickNP} className="ButtonName" variant="outline-success">
                        {currentUser ? (
                          <img src={currentUser.photoURL} alt="User Profile"/>
                          ) : (
                          <img src={nullImage} alt="User Profile"/>)}
                        </Button>

                      <Button id="ButonGO" onClick={handleOnClickGoUpload}>{singButt}</Button>

                      <Button id="ButtonLog" onClick={doLogout}>Cerrar Sesion</Button>
                      </div>
                      
                    </Form>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>

          <Navbar key="md" expand="md" className="mb-3 text-dark navbarMain" >
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} className='navbarToggle'/>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-md`}
              aria-labelledby={`offcanvasNavbarLabel-expand-md`}
              placement="end"
            >
              <Offcanvas.Body>
                <nav className='centerNav'>
                  <div className="container" >
                    <div className={`nav-elements  ${showNavbar && "active"}`} fluid>

                      {/* Ciudad */}
                      <ul>
                        <li className={`botonesUnicoFiltro`}>
                          <select key="Ciudad" id={`dropdown-split-variants-ciudad`} title="Ciudad" variant = "ciudad">
                            <option id="none" value="none" selected hidden>Ciudad</option>
                            {ciudad.map((item) => (
                              <>
                                <option eventKey={item} key={item}>{item}</option>
                              </>
                            ))}
                          </select>
                        </li>

                        {/* Modalidad */}
                        <li  className={`botonesUnicoFiltro`}>
                          <select  key="Modalidad" id={`dropdown-split-variants-modalidad`} title="Modalidad" variant = "modalidad" >
                            <option value="none" selected  hidden>Modalidad</option>
                            {modalidad.map((item) => (
                              <>
                                <option eventKey={item} key={item}>{item}</option>
                              </>
                            ))}
                          </select>
                        </li>

                        {tipos.map((item) => (
                          <li onClick={(e) => {handleFilterButtonClick(e.target.title); handleClick(e)}} key={item} id={`dropdown-split-variants-${item}`} title={item} variant = {item} className={`botonesUnicoFiltro`}>
                            {item}
                          </li>
                          ),
                        )}

                        <li onClick={(e) => { applyFiltro(selectedFilters); }} key="apply" id={`dropdown-split-variants-apply`} title="apply" variant = "apply" className='botonSeleccion'>
                          Seleccionados
                        </li>

                        <li onClick={(e) => resetFiltro()} key="reset" id={`dropdown-split-variants-reset`} title="reset" variant = "reset" className='botonReset'>
                          Todos
                        </li>
                        <li></li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Navbar>
          
          <div className='backgroundWhite'>
            <Row xs={1} md={4} className="g-4 itemsPage">
              {dishes.map((item) => (
                  <div className='ItemsInside'>
                    <Col>
                      <Card className={"cards"} key={item.id} onClick={()=>{navigate("ally", {state:{item}})}}>
                        <Card.Img variant="top" src={item.photo} />
                        <Card.Body>
                          <Card.Title key={item.title}>{item.title}</Card.Title>
                          <Card.Text key={item.description}>       
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  </div>
              ))}
            </Row>
          </div>
          
          <Footer/>
          </div>
      </>)}
    </>
  );
}

export default Items;