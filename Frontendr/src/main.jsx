import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/footer.jsx";
import "./index.css";
import App from "./App.jsx";
import ArticlePage from "./components/ArticlePage.jsx";
import CategoryPage from "./components/CategoryPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {" "}
      <Navbar />
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="articles/article/:slug" element={<ArticlePage />} />
        <Route path="categories/:category" element={<CategoryPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
