import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Navbar from "./components/Navbar.jsx";
import "./index.css";
import App from "./App.jsx";
import ArticlePage from "./components/ArticlePage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Navbar />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="articles/article/:slug" element={<ArticlePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
