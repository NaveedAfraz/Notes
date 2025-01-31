import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "../store/store";
import { Provider } from "react-redux";
import "@radix-ui/themes/styles.css";
import { Toaster } from "./ui/toaster";
import "./index.css"; 
import "./App.css";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <Toaster />
  </Provider>
);
