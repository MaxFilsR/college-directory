import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useNavigate } from "react-router";
import "./index.css";
import App from "./App.jsx";

function RedirectHandler({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectPath = sessionStorage.getItem("redirectPath");
    if (redirectPath) {
      sessionStorage.removeItem("redirectPath");
      // Remove the basename from the stored path before navigating
      navigate(redirectPath.replace("/college-directory", ""));
    }
  }, [navigate]);

  return children;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/college-directory">
      <RedirectHandler>
        <App />
      </RedirectHandler>
    </BrowserRouter>
  </StrictMode>
);
