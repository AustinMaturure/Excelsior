import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Landing from "./components/Landing.jsx";
import Categories from "./components/Categories.jsx";
import Carousels from "./components/Carousels.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Landing />
      <Categories />
      <Carousels />
    </>
  );
}

export default App;
