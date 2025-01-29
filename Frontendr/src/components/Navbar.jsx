import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
          <a>Home</a>
          <a>Local </a>
          <a>Sport </a>
          <a>School </a>
          <a>Accidents</a>
          <a>Crime </a>
          <a>Latest </a>
        </div>
      </nav>
    </>
  );
}
