import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../css/navbar.css";

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (window.scrollY > 10) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={isSticky ? "sticky" : ""}>
        <h2 className="nav-logo">
          <a href="/">Excelsior</a>
        </h2>{" "}
        <p>The latest news in your pocket</p>
        <hr />
      </header>
      <nav>
        <div className={`nav-links `}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/categories/local">Local</NavLink>
          <NavLink to="/categories/sport">Sport</NavLink>
          <NavLink to="/categories/schools">School</NavLink>
          <NavLink to="/categories/accidents">Accidents</NavLink>
          <NavLink to="/categories/crime">Crime</NavLink>
        </div>
      </nav>
    </>
  );
}
