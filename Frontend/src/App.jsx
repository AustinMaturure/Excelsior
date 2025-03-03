import { useState } from "react";

import Landing from "./components/Landing.jsx";
import Categories from "./components/Categories.jsx";
import Carousels from "./components/Carousels.jsx";
import Latest from "./components/Latest.jsx";

function App() {
  return (
    <>
      <Landing />
      <Categories />
      <Carousels />
      <Latest />
    </>
  );
}

export default App;
