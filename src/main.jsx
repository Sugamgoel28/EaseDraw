import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Routes } from 'react-router-dom';
import { SpeedInsights } from "@vercel/speed-insights/next"

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Routes>
    <App />
    <SpeedInsights/>
  </Routes>
);
