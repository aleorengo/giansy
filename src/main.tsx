import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";
import "./creation-gallery.css";
import "./assortment.css";
import "./hero-values.css";
import "./burgundy-theme.css";
import "./packaging.css";
import "./order-request.css";
import "./product-gallery.css";
import "./timeless.css";
import "./cart.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
