import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "./assets/scss/all.scss";

import "quill/dist/quill.snow.css"; //先安裝quill -> bash: npm install quill
import * as bootstrap from "bootstrap";
import Quill from "quill";

/* 所有頁面:popover跳出式視窗初始化 */
document.addEventListener("DOMContentLoaded", () => {
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  [...popoverTriggerList].map((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl));
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
