import DropdownButton from 'react-bootstrap/DropdownButton';
import useFirestore from "../hooks/useFirestore"
import Dropdown from 'react-bootstrap/Dropdown';



function Tipo() {
  const { items } = useFirestore('cuidadOpciones');
    
  return (
    <DropdownButton key="Ciudad" id={`dropdown-split-variants-ciudad`} title="Ciudad" variant = "ciudad">
      {items.map((item) => (
        <>
            <Dropdown.Item eventKey="1" key={item.ciudad}>{item.ciudad}</Dropdown.Item>            
        </>
      ))}
    </DropdownButton>
  )}
export default Tipo;