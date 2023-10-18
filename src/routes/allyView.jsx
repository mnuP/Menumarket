import React from "react";
import "../style.css";
import imagenFondo from "../images/imagen-fondo-proveedor.png";
import imagenSE from "../images/imagen-SE.png";
import imagen1 from "../images/imagen-1.png";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
    
export const AllyView = (props) => {
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  const itemPass = location.state.item;

  return (
  <div>
    <div className="desktop">
      <div className="div">
        <div className="overlap-group">
          <div className="overlap-group">
          <img className="imagen-fondo" alt="Imagen fondo" src={imagenFondo} />
            <div className="text-wrapper">Cotiza con nosotros</div>
            <button onClick={()=>{navigate("cotizacion", {state:{itemPass}})}} className="button">!Cotiza aqui!</button>
            <div className="proveedor">
              <div className="rectangle" />
              <img className="imagen" alt="Imagen" src={location.state.item.photo} />
              <div className="titulo-experiencia">{location.state.item.title}</div>
            </div>
          </div>
          <div className="informacion-basica">
            <div className="frame">
              <div className="text-wrapper-2">Capacidad: {location.state.item.capacity} Personas</div>
            </div>
            <div className="frame">
              <div className="text-wrapper-2">Disponibilidad Horaria: {location.state.item.disponibility}</div>
            </div>
            <div className="frame">
              <div className="text-wrapper-2">Duracion: {location.state.item.time} horas</div>
            </div>
            <div className="frame">
              <div className="text-wrapper-2">{location.state.item.includes}</div>
            </div>
          </div>
          <img className="pepicons-pencil" alt="Pepicons pencil" src="https://api.iconify.design/pepicons-pencil/people.svg" />
          <img className="octicon-person" alt="Octicon person" src="https://api.iconify.design/octicon/person-24.svg" />
          <img className="formkit-time" alt="Formkit time" src="https://api.iconify.design/formkit/time.svg" />
          <img className="codicon-settings" alt="Codicon settings" src="https://api.iconify.design/codicon/settings.svg" />
        </div>
        <p className="texto-experiencia">{location.state.item.description}</p>
        <div className="overlap">
          <img className="imagen-SE" alt="Imagen SE" src={location.state.item.photo2} />
          <div className="rectangle-2" />
        </div>
        <p className="p">¿Por que esta experiencia es perfecta para ti?</p>
      </div>
    </div>
    <Footer/>
  </div>
  );
};

