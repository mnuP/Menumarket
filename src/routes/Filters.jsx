import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import style from"../filter.module.css";
import useFirestore from "../hooks/useFirestore"


function Filters() {
    const { items } = useFirestore('cuidadOpciones');

    
  return (
    <Navbar className={style.navbar} >
        <Container fluid className={style.dropdown}>

        <DropdownButton key="Ciudad" id={`dropdown-split-variants-ciudad`} title="Ciudad" variant = "ciudad">
        {items.map((item) => (
            <>
                <Dropdown.Item eventKey="1">{item.ciudad}</Dropdown.Item>            
            </>
            ))}
        </DropdownButton>

        <DropdownButton key="Tipo" id={`dropdown-split-variants-tipo`} title="Tipo" variant = "tipo">
            <Dropdown.Item eventKey="1">Action</Dropdown.Item>
            <Dropdown.Divider />
        </DropdownButton>
        
        <DropdownButton key="Precio" id={`dropdown-split-variants-precio`} title="Precio" variant = "precio">
            <Dropdown.Item eventKey="1">Action</Dropdown.Item>
            <Dropdown.Divider />
        </DropdownButton>

            {["Restaurantes", "Esperiencias Tematicas", "Regalos Corporativos", "Catas"].map(
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

