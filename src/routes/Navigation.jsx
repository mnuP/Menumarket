import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "../style.css";
import {auth, logout} from "../firebase/firebase";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import style from"../navigation.module.css";
import nullImage from "../images/nullPP.png";



export default function Navigation() {

    //-------------------------Autehntication--START-----------------//
    const [currentUser, setCurrent] = useState(null);
    const navigate = useNavigate();
    const [userUID, setCurrentUID] = useState("");

    useEffect(() =>{
        onAuthStateChanged(auth, handleUserStateChanged);
    },[]);

    function handleUserStateChanged(user){
        if(user){
            setCurrent(user);
            setCurrentUID(user.uid);
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
      refreshPage();
    }

    function handleOnClickGoUpload(){
      if(currentUser){
        navigate("/user", {state: {userUID}});
      }else{
        doAuthenticate().then(navigate("/user", {state: {userUID}}));
      }
    };

  //-------------------------Autehntication--END-------------------//
  //-------------------------DATABASE--------START-----------------//
  function refreshPage() {
    window.location.reload(false);
  }

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
                  <Button key="ButtonAuth" onClick={handleOnClickNP} style={{width: "46px",borderRadius: "50%",height: "46px",backgroundColor: "#000000",border: "0.2em solid #CCD888",color: "#CCD888",display: "flex",justifyContent: "center",alignItems: "center"}}className="ButtonName"variant="outline-success">
                    {currentUser ? (
                      <img src={currentUser.photoURL} alt="User Profile" style={{width: "40px",borderRadius: "50%",height: "40px",}}/>
                      ) : (
                      <img src={nullImage} alt="User Profile" style={{width: "40px", borderRadius: "50%",height: "40px",}}/>)}
                  </Button>
                  <Button id="ButonGO" onClick={handleOnClickGoUpload} style={{height: "46px",marginLeft:"10px",backgroundColor: "#000000",border: "0.2em solid #CCD888",color: "#CCD888"}}>Profile</Button>
                  <Button key="ButtonLog" onClick={doLogout} style={{height: "46px",marginLeft:"10px",backgroundColor: "#000000",border: "0.2em solid #CCD888",color: "#CCD888"}}>LogOut</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    </>
  );
}