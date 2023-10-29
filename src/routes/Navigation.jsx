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
    const [outButt, setOutButt] = useState("none");
    const [singButt, setSingButt] = useState("Iniciar Sesion");

    const [search, setSearch] = useState("");


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

  function refreshPage() {
    window.location.reload(false);
  }

  

  return (
    <>
        <Navbar style={{backgroundColor:"#000000"}} key="md" expand="md" className="mb-3 text-dark">
          <Container fluid>
            <Navbar.Brand style={{width:"15vw", marginRight:"5vw"}} href="#">
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
                    <Button key="ButtonAuth" onClick={handleOnClickNP} style={{width: "46px",borderRadius: "50%",height: "46px",backgroundColor: "#000000",border: "0.2em solid #CCD888",color: "#CCD888",display: "flex",justifyContent: "center",alignItems: "center"}}className="ButtonName"variant="outline-success">
                    {currentUser ? (
                      <img src={currentUser.photoURL} alt="User Profile" style={{width: "40px",borderRadius: "50%",height: "40px",}}/>
                      ) : (
                      <img src={nullImage} alt="User Profile" style={{width: "40px", borderRadius: "50%",height: "40px",}}/>)}
                  </Button>
                  <Button id="ButonGO" onClick={handleOnClickGoUpload} style={{height: "46px",marginLeft:"10px",backgroundColor: "#000000",border: "0.2em solid #CCD888",color: "#CCD888"}}>{singButt}</Button>
                  <Button key="ButtonLog" onClick={doLogout} style={{display: none,height: "46px",marginLeft:"10px",backgroundColor: "#000000",border: "0.2em solid #CCD888",color: "#CCD888"}}>Cerrar Sesion</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    </>
  );
}