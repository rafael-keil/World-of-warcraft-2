import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { GlobalCharacterProvider, GlobalUserProvider } from "./context";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalUserProvider>
        <GlobalCharacterProvider>
          <App />
        </GlobalCharacterProvider>
      </GlobalUserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
