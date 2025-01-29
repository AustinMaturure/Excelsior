import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Landing from "./components/Landing.jsx";
import Categories from "./components/Categories.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Landing />
      <Categories />
    </>
  );
}

export default App;
