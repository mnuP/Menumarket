import React from "react";
import "../style.css";
import imagenFondo from "../images/imagen-fondo-proveedor.png";
import imagenSE from "../images/logoRes.png";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
    
export const AllyView = (props) => {
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  const itemPass = location.state.item;

  if(location.state.item.class === "Restaurantes"){
    return(<div>
      <div className="desktop">
        <div className="div">
          <div className="overlap-group">
            <div className="overlap-group">
            <img className="imagen-fondo" alt="Imagen fondo" src={imagenFondo} />
              <div className="text-wrapper">{location.state.item.title}</div>
              <button onClick={()=>{navigate("cotizacion", {state:{itemPass}})}} className="button">!Cotiza aqui!</button>
              <div className="proveedor">
                <div className="rectangle" />
                <img className="imagen" alt="Imagen" src={location.state.item.photo} />
                <div className="titulo-experiencia">ESTE ES UN RESTAURANTE</div>
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
                <div className="text-wrapper-2">Duracion: {location.state.item.time}</div>
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
    </div>);
    
  }else if(location.state.item.class === "Cata"){
    return (<div>
      <div className="desktop">
        <div className="div">
          <div className="overlap-group">
            <div className="overlap-group">
            <img className="imagen-fondo" alt="Imagen fondo" src={imagenFondo} />
              <div className="text-wrapper">{location.state.item.title}</div>
              <button onClick={()=>{navigate("cotizacion", {state:{itemPass}})}} className="button">!Cotiza aqui!</button>
              <div className="proveedor">
                <div className="rectangle" />
                <img className="imagen" alt="Imagen" src={location.state.item.photo} />
                <div className="titulo-experiencia">ESTA ES UNA CATA</div>
              </div>
            </div>
            <div className="informacion-basica">
              <div className="text-wrapper-2" style={{fontSize: 18, lineHeight: 2, textAlign: "justify"}}>{location.state.item.description}</div>
            </div>
            <img className="pepicons-pencil" alt="pepicon" src={imagenSE} />
          </div>
            <div className="texto-experiencia">
              
              <div className="text-wrapper-2">
                <img className="iconTxt" alt="Pepicons pencil" src="https://api.iconify.design/pepicons-pencil/people.svg"/>
                Capacidad: {location.state.item.capacity} Personas</div><br/>
              <div className="text-wrapper-2">
                <img className="iconTxt" alt="Octicon person" src="https://api.iconify.design/octicon/person-24.svg" />
                Disponibilidad Horaria: {location.state.item.disponibility}</div><br/>
              <div className="text-wrapper-2">
              <img className="iconTxt" alt="Formkit time" src="https://api.iconify.design/formkit/time.svg" />
                Duracion: {location.state.item.time}</div><br/>
              <div className="text-wrapper-2">
                <img className="iconTxt" alt="Codicon settings" src="https://api.iconify.design/codicon/settings.svg" />
                {location.state.item.includes}</div>
            </div>

          <div className="overlap">
            <img className="imagen-SE" alt="Imagen SE" src={location.state.item.photo2} />
            <div className="rectangle-2" />
          </div>
          <p className="p">¿Por que esta experiencia es perfecta para ti?</p>
        </div>
      </div>
      <Footer/>
    </div>);
  }else if(location.state.item.class === "Regalos Corporativos"){
    return (
    <div>
      <div className="desktop">
        <div className="div" style={{height:"1000px"}}>
          <div className="overlap-group">
            <div className="overlap-group">
            <img className="imagen-fondo" alt="Imagen fondo" src={imagenFondo} />
              <div className="text-wrapper">Regalos Corporativos</div>
              <button onClick={()=>{navigate("cotizacion", {state:{itemPass}})}} className="button">!Cotiza aqui!</button>
              <div className="proveedor">
                <div className="rectangle" />
                <img className="imagen" alt="Imagen"  src={location.state.item.photo} />
                <div className="titulo-experiencia">{location.state.item.title}</div>
              </div>
            </div>
            <div className="informacion-basica">
              <div className="frame">
                <div className="text-wrapper-2">{location.state.item.includes}</div>
              </div>
            </div>
            <img className="pepicons-pencil" alt="Pepicons pencil" src="https://api.iconify.design/codicon/settings.svg" />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
    
    );
  }else if(location.state.item.class === "Master Class"){
    return (
    <div>
      <div className="desktop">
        <div className="div" style={{height:"1000px"}}>
          <div className="overlap-group">
            <div className="overlap-group">
            <img className="imagen-fondo" alt="Imagen fondo" src={imagenFondo} />
              <div className="text-wrapper" >Master class</div>
              <button onClick={()=>{navigate("cotizacion", {state:{itemPass}})}} className="button">!Cotiza aqui!</button>
              <div className="proveedor">
                <div className="rectangle"/>
                <img className="imagen" alt="Imagen" style={{borderWidth: "10px", borderColor: "#d5c25d", borderStyle:"solid"}} src={location.state.item.photo} />
                <div className="titulo-experiencia">{location.state.item.extra}</div>
              </div>
            </div>
            <div className="informacion-basica">
              <div className="frame">
                <div className="text-wrapper-2" style={{fontSize: 26, color: "#d5c25d"}}>{location.state.item.title}</div>
              </div>
              <div className="frame">
                <div className="text-wrapper-2" style={{fontSize: 18, lineHeight: 2, textAlign: "justify"}}>{location.state.item.description} </div>
              </div>
            </div>
            <img className="pepicons-pencil" alt="Pepicons pencil" src="https://api.iconify.design/material-symbols/border-all.svg"/>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
    
    );
  }

  return (
  <div>
    <div className="desktop">
      <div className="div">
        <div className="overlap-group">
          <div className="overlap-group">
          <img className="imagen-fondo" alt="Imagen fondo" src={imagenFondo} />
            <div className="text-wrapper">{location.state.item.title}</div>
            <button onClick={()=>{navigate("cotizacion", {state:{itemPass}})}} className="button">!Cotiza aqui!</button>
            <div className="proveedor">
              <div className="rectangle" />
              <img className="imagen" alt="Imagen" src={location.state.item.photo} />
              <div className="titulo-experiencia">Anfitrion</div>
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
              <div className="text-wrapper-2">Duracion: {location.state.item.time}</div>
            </div>
            <div className="frame">
              <div className="text-wrapper-2">{location.state.item.includes} </div>
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

