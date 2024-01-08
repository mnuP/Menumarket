import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {AllyView} from './routes/allyView';
import "./style.css";
import UploadData from './routes/UploadData';
import Admin from './routes/Admin';
import {InvoicePage} from './routes/Invoice';
import AllyProfile from './routes/allyProfile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="ally" element={<AllyView/>}/>
      <Route path="user/Upload" element={<UploadData/>}/>
      <Route path="CFSHEBCH7/Admin" element={<Admin/>}/>
      <Route path="ally/cotizacion" element={<InvoicePage/>}/>
      <Route path="user" element={<AllyProfile/>}/>
    </Routes>
  </BrowserRouter>
);