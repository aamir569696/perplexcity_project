import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App/index.css";
import App from "./App/App.jsx";
import { store } from "./App/app.store.js";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#18181b",
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
          },
        }}
      />
    </Provider>
  </StrictMode>
);