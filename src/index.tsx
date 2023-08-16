import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { setupAxios } from "./utils/AuthUtils";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();
setupAxios(axios);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID ?? ""}
    >
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
