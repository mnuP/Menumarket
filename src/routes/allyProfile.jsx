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
import style from"../navigation.module.css";
import nullImage from "../images/nullPP.png";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { onSnapshot, collection} from "firebase/firestore";




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
              <Offcanvas.Body style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Form className="d-flex">
                  <Button key="ButtonExit" onClick={doExit} style={{height: "46px",backgroundColor: "#000000",border: "0.2em solid #CCD888",color: "#CCD888"}}>Volver</Button>
                  <Button key="ButtonGo" onClick={doGoUpload} style={{height: "46px",marginLeft:"10px",backgroundColor: "#000000",border: "0.2em solid #CCD888",color: "#CCD888"}}>!Postula Tu Experiencia¡</Button>
                  <Button key="ButtonAd" onClick={doManage} style={{height: "46px",marginLeft:"10px",backgroundColor: "#000000",border: "0.2em solid #CCD888",color: "#CCD888", display: admin}}>Administrar Postulaciones</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>

        <Row style={{margin: "0 3vw 3vw 3vw"}} xs={1} md={4} className="g-4">
            {items.map((item) => (
                <div style={{padding:"0 2vw"}}>
                    <Col>
                        <Card key={item.id} onClick={()=>{navigate("ally", {state:{item}})}}>
                            <Card.Img variant="top" src={item.photo} />
                            <Card.Body>
                                <Card.Title key={item.title}>{item.title}</Card.Title>
                                <Card.Text key={item.description}>
                                    <div className="vr"></div>

                                    {item.class}
                                    <div className="vr"></div>
                                    {item.city}
                                    <div className="vr"></div>
                                    {item.modality}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </div>
            ))}
        </Row>
    </>
  );
}