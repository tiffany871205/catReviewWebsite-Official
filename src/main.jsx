import React from "react";
import { createRoot } from "react-dom/client";

import { createHashRouter, RouterProvider } from "react-router";
import routes from "./routers/router.jsx";
const router = createHashRouter(routes);

import "./assets/scss/all.scss";

import "quill/dist/quill.snow.css"; //先安裝quill -> bash: npm install quill
import * as bootstrap from "bootstrap";
import Quill from "quill";

/* 所有頁面:popover跳出式視窗初始化 */
document.addEventListener("DOMContentLoaded", () => {
  const popoverTriggerList = document.querySelectorAll(
    '[data-bs-toggle="popover"]'
  );
  [...popoverTriggerList].map(
    (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
  );
});

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
