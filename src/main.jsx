import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { Toaster } from "sonner";

import { NextUIProvider } from "@nextui-org/react";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthenticationContextProvider from "./Context/AuthenticationContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthenticationContextProvider>
        <GoogleOAuthProvider clientId="220876944567-b609gs9pbjrrjpaapm3mlvtft3hjhn45.apps.googleusercontent.com">
          <NextUIProvider>
            <Toaster
              richColors
              position="top-center"
              toastOptions={{ style: { padding: "15px" } }}
            />
            <App />
          </NextUIProvider>
        </GoogleOAuthProvider>
      </AuthenticationContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
