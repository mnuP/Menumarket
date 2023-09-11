import React from "react";
import Button from "../components/button";
import ProveedorP from "../components/proveedorP";
import "../style.css";

export default function AllyView (){
  return (
    <div className="desktop">
      <div className="div">
        <div className="overlap">
          <div className="overlap">
            <img className="imagen-fondo" alt="Imagen fondo" src="../images/imagen-fondo-proveedor.png" />
            <div className="text-wrapper-2">Genera tu cotizacion</div>
            <Button className="button-instance" divClassName="design-component-instance-node" text="!Cotiza aqui!" />
            <ProveedorP className="proveedor" imagenPe="../images/imagen-1.png" />
          </div>
          <div className="informacion-basica">
            <div className="frame">
              <div className="text-wrapper-3">Maximo de Personas</div>
            </div>
            <div className="frame">
              <div className="text-wrapper-3">Minimo de Personas</div>
            </div>
            <div className="frame">
              <div className="text-wrapper-3">Duracion</div>
            </div>
            <div className="frame">
              <div className="text-wrapper-3">Incluye</div>
            </div>
          </div>
          <img className="pepicons-pencil" alt="Pepicons pencil" src="pepicons-pencil-people.svg" />
          <img className="octicon-person" alt="Octicon person" src="octicon-person-24.svg" />
          <img className="formkit-time" alt="Formkit time" src="formkit-time.svg" />
          <img className="codicon-settings" alt="Codicon settings" src="codicon-settings.svg" />
        </div>
        <p className="texto-experiencia">
          Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el
          texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se
          dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un
          libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en
          documentos electrónicos, quedando esencialmente igual al original.
        </p>
        <div className="overlap-group">
          <img className="imagen-SE" alt="Imagen SE" src="../images/imagen-SE.png" />
          <div className="rectangle-2" />
        </div>
        <p className="p">¿Por que esta experiencia es perfecta para ti?</p>
      </div>
    </div>
  );
};
