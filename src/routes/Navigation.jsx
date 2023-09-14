import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "../style.css";
import {auth} from "../firebase/firebase";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import style from"../navigation.module.css";
import { getTodosCard } from "../firebase/firebase.js";

const todaCard = getTodosCard();

export default function Navigation() {

    //-------------------------Autehntication--START-----------------//
    const [currentUser, setCurrent] = useState(null);
    const navigate = useNavigate();

    useEffect(() =>{
        onAuthStateChanged(auth, handleUserStateChanged);
    },[]);

    function handleUserStateChanged(user){
        if(user){
            console.log(user);
            setCurrent(user);
        }
    }


    async function handleOnClickNP(){
      if(currentUser){
          navigate("/ally");
      }else{
        doAuthenticate();
        if(currentUser){
          navigate("/ally");
        }
      }
    }

    async function doAuthenticate(){
      const googleProvider = new GoogleAuthProvider();  
      await singInWithGoogle(googleProvider);
    
      async function singInWithGoogle(googleProvider){
        try {
          const res = await signInWithPopup(auth, googleProvider);
          console.log(res);
        } catch (error) {
          console.error(error);
        }
      }
    }
  //-------------------------Autehntication--END-------------------//
  //-------------------------DATABASE--------START-----------------//
    


  //-------------------------DATABASE--------END-------------------//

  return (
    <>
        <Navbar style={{backgroundColor:"#000000"}} key="md" expand="md" className="mb-3 text-dark">
          <Container fluid>
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
                  <Button onClick={handleOnClickNP} style={{width:"15vw", backgroundColor:"#000000", borderBlockColor:"#CCD888", color:"#CCD888", borderWidth:"0.2em"}} className="ButtonName" variant="outline-success">Se Parte de Menumarket!</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    </>
  );
}