import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { CartProvider } from '../src/pages/CartContext'


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <CartProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </CartProvider>  
);


