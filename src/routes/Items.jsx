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
            <Card.Img variant="top" src="https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
            <Card.Body>
              <Card.Title key={item.titulo}>{item.titulo}</Card.Title>
              <Card.Text key={item.descripcionSe}>
                {item.descripcionSe}
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