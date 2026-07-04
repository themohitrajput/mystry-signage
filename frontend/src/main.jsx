import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const storedTheme = window.localStorage.getItem("theme");
const theme = storedTheme === "dark" ? "dark" : "light";

document.documentElement.setAttribute("data-theme", theme);
document.documentElement.style.colorScheme = theme;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
