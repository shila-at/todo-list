
import ReactDOM from "react-dom/client";
import App from "./App";
import MainProvider from "@provider/MainProvider";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <MainProvider>
    <ToastContainer />
    <App />
  </MainProvider>
);
