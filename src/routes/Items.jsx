import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import useFirestore from "../hooks/useFirestore";
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import style from"../filter.module.css";
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import { db } from '../firebase/firebase'
import { onSnapshot, collection} from "firebase/firestore"; 


function Items() {
  const tipos = ["Cata", "Catering", "Chef en Casa", "Master Class",   "Regalos Corporativos", "Restaurantes", "Taller de Cocina"];
  const ciudad = ["Bogota", "Medellin"];

  const [items, setItems] = useState([]);
  const [dishes, setDishes] = useState(items);
  const collectionRef = collection(db, "usersPrincipal");
  const navigate = useNavigate();

  // const filterCity= (city) => {
  //   let results;
  //   if(city == "All"){
  //     results = items
  //   } else {
  //     results = items.filter((curData) => {
  //     return curData.city == city;
  //   })}
  //   setDishes(results)
  // }

  const filterCity= (city) => {
    let results;
    results = items.filter((curData) => {
    return curData.city == city;
    })
    setDishes(results)
  }

  const filterTipo= (tipo) => {
    let results;
    results = items.filter((curData) => {
    return curData.class == tipo;
    })
    setDishes(results)
  }

  const resetFiltro= () => {
    setDishes(items)
  }

  useEffect(()=> {
    const dataTest =  onSnapshot(collectionRef,(querySnapshot) => { 
        const items = [];
        querySnapshot.forEach((doc) => {
            items.push({...doc.data(), id: doc.id});
        });
    setItems(items);
    setDishes(items);
    });
    return () => {
        dataTest();
    };
  }, []);

  return (
    <>
      <Navbar className={style.navbar}>
        <Container fluid>
        {/* Ciudad */}
          {/* <select onChange={(e) => filterCity(e.target.value)} key="Ciudad" id={`dropdown-split-variants-ciudad`} title="Ciudad" variant = "ciudad">
            {ciudad.map((item) => (
              <>
                <option eventKey={item} key={item}>{item}</option>            
              </>          
            </select>

            ))} */}


          {ciudad.map((item) => (
            <Button onClick={(e) => filterCity(e.target.title)} key={item} id={`dropdown-split-variants-${item}`} title={item} variant = {item}>
              {item}
            </Button>
            ),
          )}  

          <div className="vr"></div>

          {/* Tipo */}
          {tipos.map((item) => (
            <Button onClick={(e) => filterTipo(e.target.title)} key={item} id={`dropdown-split-variants-${item}`} title={item} variant = {item}>
              {item}
            </Button>
            ),
          )}    

          <div className="vr"></div>

          <Button onClick={(e) => resetFiltro()} key="reset" id={`dropdown-split-variants-reset`} title="reset" variant = "reset">
            Reset Filtro
          </Button>

        </Container>
      </Navbar>

      <Row style={{margin: "0 3vw 3vw 3vw"}} xs={1} md={4} className="g-4">
        {dishes.map((item) => (
          <div style={{padding:"0 2vw"}}>
          <Col>
            <Card key={item.id} onClick={()=>{navigate("ally", {state:{item}})}}>
              <Card.Img variant="top" src={item.photo} />
              <Card.Body>
                <Card.Title key={item.title}>{item.title}</Card.Title>
                <Card.Text key={item.description}>
                  {item.description}
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

export default Items;