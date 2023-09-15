import DropdownButton from 'react-bootstrap/DropdownButton';
import useFirestore from "../hooks/useFirestore"
import Dropdown from 'react-bootstrap/Dropdown';



function Tipo() {
  const { items } = useFirestore('tipoOpciones');
    
  return (
    <DropdownButton key="Tipo" id={`dropdown-split-variants-ciudad`} title="Tipo" variant = "Tipo">
      {items.map((item) => (
        <>
          <Dropdown.Item eventKey="1" key={item.tipo}>{item.tipo}</Dropdown.Item>            
        </>
      ))}
    </DropdownButton>
  )}
export default Tipo;