import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import style from"../filter.module.css";
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import { db, getTodosCard } from '../firebase/firebase'
import { onSnapshot, collection} from "firebase/firestore";
import "../styleForm.css";
import { signOut } from 'firebase/auth';
import $ from 'jquery';



function Items() {
  const tipos = ["Cata", "Catering", "Chef en Casa", "Master Class",   "Regalos Corporativos", "Restaurantes", "Taller de Cocina"];
  const ciudad = ["Bogota", "Medellin"];
  const modalidad = ["Presencial", "Virtual", "Hibrida"];
  const collectionRef = collection(db, "usersPrincipal");

  const [items, setItems] = useState([]);
  const [dishes, setDishes] = useState([]);

  const navigate = useNavigate();

  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterButtonClick = (selectedCategory) => {
    setSelectedFilters(selectedCategory);
  };

  console.log(selectedFilters)

  const applyFiltro = () => {
    let ciudadSelect = document.querySelector('#dropdown-split-variants-ciudad').value;
    let modalidadSelect = document.querySelector('#dropdown-split-variants-modalidad').value;

    if(modalidadSelect === "Virtual"){
      ciudadSelect = "none";
    }

    console.log(ciudadSelect)
    console.log(modalidadSelect)
    console.log(ciudad.includes(ciudadSelect))
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
  }

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
    return () => {
      dataTest();
    };
  }, []);

  return (
      <>
        <Navbar className={style.navbar}>
          <Container fluid>
            {/* Ciudad */}
            <select key="Ciudad" id={`dropdown-split-variants-ciudad`} title="Ciudad" variant = "ciudad">
              <option id="none" value="none" selected hidden>Seleccione Ciudad</option>
              {ciudad.map((item) => (
                  <>
                    <option eventKey={item} key={item}>{item}</option>
                  </>
              ))}
            </select>

            <div className="vr"></div>

            {/* Modalidad */}
            <select  key="Modalidad" id={`dropdown-split-variants-modalidad`} title="Modalidad" variant = "modalidad">
              <option value="none" selected  hidden>Seleccione Modalidad</option>
              {modalidad.map((item) => (
                  <>
                    <option eventKey={item} key={item}>{item}</option>
                  </>
              ))}
            </select>

            <div className="vr"></div>

            {/* Tipo */}
            {tipos.map((item) => (
              <Button onClick={(e) => {handleFilterButtonClick(e.target.title); }} key={item} id={`dropdown-split-variants-${item}`} title={item} variant = {item}>
                {item}
              </Button>
             ),
            )}

            <div className="vr"></div>

            <Button onClick={(e) => { applyFiltro(selectedFilters); }} key="apply" id={`dropdown-split-variants-apply`} title="apply" variant = "apply">
              Ver Seleccionados
            </Button>

            <Button onClick={(e) => resetFiltro()} key="reset" id={`dropdown-split-variants-reset`} title="reset" variant = "reset">
              Ver Todos
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

export default Items;