import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import useFirestore from "../hooks/useFirestore";
import { useNavigate } from 'react-router-dom';

function Items(props) {
  const { items } = useFirestore('usersPrincipal');
  const navigate = useNavigate();


  return (

    <Row style={{margin: "0 3vw 3vw 3vw"}} xs={1} md={4} className="g-4">
      {items.map((item) => (
        <div style={{padding:"0 2vw"}}>
        <Col>
          <Card key={item.id} onClick={()=>{navigate("ally", {state:{item}})}}>
            <Card.Img variant="top" src={item.photo} />
            <Card.Body>
              <Card.Title key={item.title}>{item.title}</Card.Title>
              <Card.Text key={item.descripcionSe}>
                {item.description}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        </div>
      ))}
    </Row>
  );
}

export default Items;