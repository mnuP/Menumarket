import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import style from"../filter.module.css";


function Filters() {
  return (
    <Navbar className={style.navbar} >
        <Container fluid className={style.dropdown}>
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

