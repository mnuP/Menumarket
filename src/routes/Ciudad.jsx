import useFirestore from "../hooks/useFirestore"
import { useState } from "react";


function Ciudad(prop) {
  const [city, setCity] = useState('');
  const { items } = useFirestore('cuidadOpciones');

  prop.ciudad(city);
  
  const handleChangeCourse = event => {
    setCity({ city: event.target.value });
  };

  return (
    <select onChange={handleChangeCourse} key="Ciudad" id={`dropdown-split-variants-ciudad`} title="Ciudad" variant = "ciudad">
      <option eventKey="1" key="All">All</option> 
      {items.map((item) => (
        <>
          <option eventKey={item.ciudad} key={item.ciudad}>{item.ciudad}</option>            
        </>
      ))}
    </select>
  )}
export default Ciudad;