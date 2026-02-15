
import React from 'react';
import ReactDOM from 'react-dom/client';
//new
 import { BrowserRouter } from "react-router-dom";
//new
import App from './App';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
