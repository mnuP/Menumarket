import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


function Filters() {
  return (
    <Navbar style={{margin:"0 3vw"}} key="md" expand="md" className="mb-3 text-dark">
        <Container fluid>
            {['Ciudad', 'Tipo', 'Precio', "Restaurantes", "Esperiencias Tematicas", "Regalos Corporativos", "Catas"].map(
            (variant) => (

                <DropdownButton
                key={variant}
                id={`dropdown-split-variants-${variant}`}
                variant={variant.toLowerCase()}
                title={variant}
                >     
                    <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="2">Another action</Dropdown.Item>          
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="3" active>
                        Active Item
                    </Dropdown.Item>
                </DropdownButton>
            ),
            )}
        </Container>
    </Navbar>
);
}
export default Filters;

