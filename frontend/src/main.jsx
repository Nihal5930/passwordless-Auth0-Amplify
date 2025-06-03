import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain="dev-f530xgt7nx124cxi.us.auth0.com"
    clientId="CzrNbFiV73Jx5PAk7uGyBxdtB35JG80I"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://dev-f530xgt7nx124cxi.us.auth0.com/api/v2/"
    }}
  >
    <App />
  </Auth0Provider>
);