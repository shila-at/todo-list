import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import MainProvider from "@provider/MainProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MainProvider>
      <App />
    </MainProvider>
  </React.StrictMode>
);
