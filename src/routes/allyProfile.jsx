import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "../style.css";
import {auth, db, logout} from "../firebase/firebase";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import style from "../styleForm.css";
import nullImage from "../images/nullPP.png";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { onSnapshot, collection, doc, deleteDoc} from "firebase/firestore";




export default function AllyProfile(props) {
    const location = useLocation();
    const itemPass = location.state.userUID;
    const [items, setItems] = useState([]);
    const collectionRef = collection(db, "usersPrincipal");
    const [admin, setAdmin] = useState("none");

    const navigate = useNavigate();  

    function doGoUpload(){
        navigate("Upload", {state: {itemPass}});
    };

    async function eliminarExperiencia(itemID){
      try {
        const docRef = doc(db, 'usersPrincipal', itemID);
        deleteDoc(docRef);
  
      }catch(err){
        console.log(err);
      };
    }

    function doExit(){
        navigate(-1);
    };

    function doManage(){
      navigate("/CFSHEBCH7/Admin");
    };
  
    function refreshPage() {
        window.location.reload(false);
    };

    useEffect(()=> {
        const dataTest =  onSnapshot(collectionRef,(querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push({...doc.data(), id: doc.id});
            });
            let itemsFiltrados = items.filter((item) => {return item.user === itemPass;})
            setItems(itemsFiltrados);

            if(itemPass === "8b2SM94eisS6EQHS2MTq8WBWdab2"){
              setAdmin("");
            };
        });
        return () => {
            dataTest();
        };
    }, []);

   return (
    <>
      <div className= "principalNavbar" >
        <Navbar key="md" expand="md" className="mb-3 text-dark navbarMain">
          <Container fluid>
            <Navbar.Brand className="navbarMain-logo" href="#">
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
              <Offcanvas.Body style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Form className="d-flex">
                  <Button key="ButtonExit" onClick={doExit} className="botonesUnicoFiltro" style={{margin:"1vw"}}>Volver</Button>
                  <Button key="ButtonGo" onClick={doGoUpload} className="botonesUnicoFiltro" style={{margin:"1vw"}}>!Postula Tu Experiencia¡</Button>
                  <Button key="ButtonAd" onClick={doManage} className="botonesUnicoFiltro" style={{margin:"1vw"}}>Administrar Postulaciones</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>

        <div className='backgroundWhite'>
          <Row xs={1} md={4} className="g-4 itemsPage">
            {items.map((item) => (
                <div className='ItemsInside'>
                  <Col>
                    <Card className={"cartaEspecifica"} key={item.id}>
                      <Card.Img className={"cardsImage"} variant="top" src={item.photo} />
                      <Card.Body className={"cardsBody"}>
                        <Card.Title key={item.title}>{item.title}</Card.Title>    
                      </Card.Body>
                      <Button onClick={()=>{eliminarExperiencia(item.id)}}>Eliminar</Button> 
                    </Card>
                  </Col>
                </div>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
}