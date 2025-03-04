import React from "react";
import ReactDOM from "react-dom/client";
import { MsalProvider } from "@azure/msal-react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from "react-router-dom";
import { msalInstance } from "./authConfig";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

const GOOGLE_CLIENT_ID = "139284069745-9maangp7r1m7jeno7fsvitaft4nvhpo6.apps.googleusercontent.com";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <MsalProvider instance={msalInstance}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MsalProvider>
  </GoogleOAuthProvider>
);
