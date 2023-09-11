import PropTypes from "prop-types";
import React from "react";
import "../style.css";

export default function ProveedorP({ imagenPe = "imagen-PE.png" }){
  return (
    <div className="proveedor-p">
      <div className="rectangle" />
      <img className="imagen-PE" alt="Imagen PE" src={imagenPe} />
      <div className="titulo-experiencia">Titulo</div>
    </div>
  );
};

ProveedorP.propTypes = {
  imagenPe: PropTypes.string,
};
