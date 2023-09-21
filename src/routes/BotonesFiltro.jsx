import Button from 'react-bootstrap/Button';

function BotonesFiltro() {
    
    const items = ["Restaurantes", "Esperiencias Tematicas", "Regalos Corporativos", "Catas"];
  return (
    <>
    {items.map((item) => (
            <Button key={item} id={`dropdown-split-variants-${item}`} title={item} variant = {item}>
                {item}
            </Button>
        ),
        )}
    </>
)}

export default BotonesFiltro;