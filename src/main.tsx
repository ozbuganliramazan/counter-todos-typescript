import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import "bootstrap/dist/css/bootstrap.min.css";
const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  alert("Root element not found.");
}
