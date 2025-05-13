import React from "react";

import { App, appStarted } from "@app";
import ReactDOM from "react-dom/client";

import "./globals.css";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/500.css";
import "@fontsource/nunito/700.css";

const container = document.querySelector("#root") as HTMLElement;
const root = ReactDOM.createRoot(container);

appStarted();

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
