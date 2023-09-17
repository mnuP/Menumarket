import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import useFirestore from "../hooks/useFirestore";
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import style from"../filter.module.css";
import Tipo from '../routes/Tipo';
import Ciudad from '../routes/Ciudad';
import BotonesFiltro from '../routes/BotonesFiltro';
import Precio from '../routes/Precio';

function Items() {
  const { items } = useFirestore('usersPrincipal');
  const navigate = useNavigate();
  let ciudadInformation;

  function nameCiudad(ciudadData){
    ciudadInformation = ciudadData.city;
  }

  return (
    <>
      <Navbar className={style.navbar} >
        <Container fluid>
          <Ciudad ciudad={nameCiudad}/>
          <Tipo/>
          <Precio/>
          <BotonesFiltro/>            
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