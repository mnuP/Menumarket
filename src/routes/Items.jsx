import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Items() {
  return (
    <Row style={{margin: "0 5vw 5vw 5vw"}} xs={1} md={5} className="g-4">
      {Array.from({ length: 20 }).map((_, idx) => (
        <div style={{padding:"0 2vw"}}>
        <Col key={idx}>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
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