import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {AllyView} from './routes/allyView';
import "./style.css";
import UploadData from './routes/UploadData';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="ally" element={<AllyView/>}/>
      <Route path="Upload" element={<UploadData/>}/>
    </Routes>
  </BrowserRouter>
);