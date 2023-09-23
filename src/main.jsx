import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { QuestionProvider } from "./Context/QuestionContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QuestionProvider>
        <App />
      </QuestionProvider>
    </AuthProvider>
  </React.StrictMode>
);
