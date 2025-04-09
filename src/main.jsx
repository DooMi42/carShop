/**
 * Application Entry Point
 * 
 * Initializes the React application by rendering the root App component
 * into the DOM element with id "root". Applies StrictMode for development
 * assistance and imports global styles from index.css.
 */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Import global styles

// Create root and render App component with StrictMode enabled
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);