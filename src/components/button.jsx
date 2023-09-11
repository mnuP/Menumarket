import PropTypes from "prop-types";
import React from "react";
import "../style.css";

export default function Button({ className, divClassName, text = "Button" }){
  return (
    <button className={`button ${className}`}>
      <div className={`text-wrapper ${divClassName}`}>{text}</div>
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
};
