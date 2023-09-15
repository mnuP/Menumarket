import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import style from"../filter.module.css";
import useFirestore from "../hooks/useFirestore"
import Tipo from '../routes/Tipo';
import Ciudad from '../routes/Ciudad';
import BotonesFiltro from '../routes/BotonesFiltro';
import Precio from '../routes/Precio';

function Filters() {
    const { items } = useFirestore('cuidadOpciones');
    console.log(items);
    
  return (
    <Navbar className={style.navbar} >
        <Container fluid className={style.dropdown}>

        <Ciudad/>
        <Tipo/>
        <Precio/>
        <BotonesFiltro/>            
        </Container>
    </Navbar>
);
}
export default Filters;

