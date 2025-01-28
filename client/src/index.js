import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary";


const root = ReactDOM.createRoot(document.getElementById("root")); // Use React 18 createRoot
root.render(
  <ErrorBoundary>
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
  </ErrorBoundary>

);
