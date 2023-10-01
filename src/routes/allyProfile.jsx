import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "../style.css";
import {auth, logout} from "../firebase/firebase";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import style from"../navigation.module.css";
import nullImage from "../images/nullPP.png";



export default function AllyProfile(props) {
    const location = useLocation();
    const itemPass = location.state.userUID;

    const navigate = useNavigate();  

    function doGoUpload(){
        navigate("Upload", {state: {itemPass}});
    };

    function doExit(){
        navigate(-1);
    };
  
    function refreshPage() {
        window.location.reload(false);
    };


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
                  <Button key="ButtonExit" onClick={doExit} style={{height: "46px",marginLeft:"10px",backgroundColor: "#000000",border: "0.2em solid #CCD888",color: "#CCD888"}}>Volver</Button>
                  <Button key="ButtonGo" onClick={doGoUpload} style={{height: "46px",marginLeft:"10px",backgroundColor: "#000000",border: "0.2em solid #CCD888",color: "#CCD888"}}>!Postula Tu Experiencia¡</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    </>
  );
}