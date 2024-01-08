import React from "react";
import "../styleInvoice.css";
import imagenLogo from "../images/MMWLOGO.png";
import { useLocation } from "react-router-dom";
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";

    
export const InvoicePage = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [numeroFactura, setNumeroFactura] = useState(localStorage.getItem('numeroFactura')
  
  );
  const location = useLocation();
  console.log(location);
  const price = location.state.itemPass.price;
  let date = new Date().toUTCString().slice(5, 16);
  


  const handleQTChange = (event) => {
    const newQ = parseFloat(event.target.value);
    setQuantity(isNaN(newQ) ? 0 : newQ); 
  };

  const totalServicio = (parseInt(price)*quantity).toFixed(2);

  function printCotizacion(){
    window.print();
    const numeroActual = localStorage.getItem('numeroFactura');

    const nuevoNumero = numeroActual ? parseInt(numeroActual) + 1 : 1;

    setNumeroFactura(nuevoNumero);
    localStorage.setItem('numeroFactura', nuevoNumero.toString());
  };

  return( 
<div className = "invoice-wrapper" id = "print-area">
            <div className = "invoice">
                <div className = "invoice-container">
                    <div className = "invoice-head">
                        <div className = "invoice-head-top">
                            <div className = "invoice-head-top-left text-start">
                                <img src = {imagenLogo}/>
                            </div>
                            <div className = "invoice-head-top-right text-end">
                                <h3>Cotizacion</h3>
                            </div>
                        </div>
                        <div className = "hr"></div>
                        <div className = "invoice-head-middle">
                            <div className = "invoice-head-middle-left text-start">
                                <p><span className = "text-bold">Fecha</span>: {date}</p>
                            </div>
                            <div className = "invoice-head-middle-right text-end">
                                <p><spanf className = "text-bold">Cotizacion No:</spanf>{numeroFactura}</p>
                            </div>
                        </div>
                        <div className = "hr"></div>
                        <div className = "invoice-head-bottom">
                            <div className = "invoice-head-bottom-left">
                                <ul>
                                <li className = 'text-bold'>Pago a:</li>
                                    <li>Menumarket.co</li>
                                    <li>Carrera 77 #43-17</li>
                                    <li>Medellin, Antioquia</li>
                                    <li>atencionalcliente@menumarket.co</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className = "overflow-view">
                        <div className = "invoice-body">
                            <table>
                                <thead>
                                    <tr>
                                        <td className = "text-bold">Servicio</td>
                                        <td className = "text-bold">Descripcion</td>
                                        <td className = "text-bold">Valor</td>
                                        <td className = "text-bold">Ctd</td>
                                        <td className = "text-bold">Total</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{location.state.itemPass.class}</td>
                                        <td>{location.state.itemPass.title}: {location.state.itemPass.includes}</td>
                                        <td>${price}</td>
                                        <td><input type="text" name="comisionMenu" id="comisionMenu" value={quantity} onChange={handleQTChange}></input></td>
                                        <td className = "text-end">${totalServicio}</td>
                                    </tr>
                                    <tr>
                                        <td>Comision</td>
                                        <td>Comision por parte de Menumarket</td>
                                        <td>${parseInt(price)*0.15}</td>
                                        <td>-</td>
                                        <td className = "text-end">${(totalServicio*0.15).toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className = "invoice-body-bottom">
                                <div className = "invoice-body-info-item border-bottom">
                                    <div className = "info-item-td text-end text-bold">Sub Total:</div>
                                    <div className = "info-item-td text-end">${(totalServicio*1.15).toFixed(2)}</div>
                                </div>
                                <div className = "invoice-body-info-item border-bottom">
                                    <div className = "info-item-td text-end text-bold">IVA:</div>
                                    <div className = "info-item-td text-end">${(totalServicio*1.15*0.19).toFixed(2)}</div>
                                </div>
                                <div className = "invoice-body-info-item">
                                    <div className = "info-item-td text-end text-bold">Total:</div>
                                    <div className = "info-item-td text-end">${(totalServicio*(1.3685)).toFixed(2)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className = "invoice-foot text-center">
                        <p><span className = "text-bold text-center">NOTA:&nbsp;</span>Esta es una cotizacion realizada por computador y no necesita firma fisica.</p>

                        <div className = "invoice-btns">
                        <button type="button" className="invoice-btn" onClick={printCotizacion}>
                            <span>
                                <i className="fa-solid fa-print"></i>
                            </span>
                            <span>Imprimir</span>
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};