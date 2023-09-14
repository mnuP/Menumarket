import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import useFirestore from "../hooks/useFirestore"

function Items() {
  const { items } = useFirestore('usersPrincipal');

  return (

    <Row style={{margin: "0 5vw 5vw 5vw"}} xs={1} md={5} className="g-4">
      {items.map((item) => (
        <div style={{padding:"0 2vw"}}>
        <Col>
          <Card key={item.id}>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>{item.titulo}</Card.Title>
              <Card.Text>
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