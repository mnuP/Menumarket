import React from "react";
import "../style.css";
import imagenFondo from "../images/imagen-fondo-proveedor.png";
import imagenSE from "../images/imagen-SE.png";
import imagen1 from "../images/imagen-1.png";
    
export const AllyView = () => {
  return (
    <div className="desktop">
      <div className="div">
        <div className="overlap-group">
          <div className="overlap-group">
          <img className="imagen-fondo" alt="Imagen fondo" src={imagenFondo} />
            <div className="text-wrapper">Cotiza con nosotros</div>
            <button className="button">!Cotiza aqui!</button>
            <div className="proveedor">
              <div className="rectangle" />
              <img className="imagen" alt="Imagen" src={imagen1} />
              <div className="titulo-experiencia">Titulo</div>
            </div>
          </div>
          <div className="informacion-basica">
            <div className="frame">
              <div className="text-wrapper-2">Maximo de Personas</div>
            </div>
            <div className="frame">
              <div className="text-wrapper-2">Minimo de Personas</div>
            </div>
            <div className="frame">
              <div className="text-wrapper-2">Duracion</div>
            </div>
            <div className="frame">
              <div className="text-wrapper-2">Incluye</div>
            </div>
          </div>
          <img className="pepicons-pencil" alt="Pepicons pencil" src="https://api.iconify.design/pepicons-pencil/people.svg" />
          <img className="octicon-person" alt="Octicon person" src="https://api.iconify.design/octicon/person-24.svg" />
          <img className="formkit-time" alt="Formkit time" src="https://api.iconify.design/formkit/time.svg" />
          <img className="codicon-settings" alt="Codicon settings" src="https://api.iconify.design/codicon/settings.svg" />
        </div>
        <p className="texto-experiencia">
          Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el
          texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se
          dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un
          libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en
          documentos electrónicos, quedando esencialmente igual al original.
        </p>
        <div className="overlap">
          <img className="imagen-SE" alt="Imagen SE" src={imagenSE} />
          <div className="rectangle-2" />
        </div>
        <p className="p">¿Por que esta experiencia es perfecta para ti?</p>
      </div>
    </div>
  );
};

