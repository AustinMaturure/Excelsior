import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import "../src/css/nav.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(window.innerWidth <= 726);
  const [isClicked, setClick] = useState(false);

  const handleClick = () => {
    setClick(!isClicked);
  };

  const location = useLocation();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    // Close the navbar whenever the location (route) changes
    closeNavbar();
  }, [location]);

  return (
    <nav className={isOpen ? "responsive-nav" : "navbar"}>
      <section className="logo-footer">
        <h1
          className="logo-header"
         
            style={{
              backgroundColor: "#cf2e2e",
              color: "white",
              marginTop: "0px",
              marginLeft: "1rem",
              padding: "1rem",
              fontSize: "2rem",
            
          }}
        >
          Excelsior
        </h1>
      </section>
      <div className={isOpen ? "responsive-links" : "links"}>
        <a href="/#">LATEST /</a>
        <NavLink to="/">HOME /</NavLink>
        <NavLink to="category/Local">LOCAL /</NavLink>
        <NavLink to="category/Sport">SPORT /</NavLink>
        <NavLink to="category/Schools">SCHOOL</NavLink>
        <NavLink to="category/Accidents">ACCIDENTS /</NavLink>
        <NavLink to="category/Crime">CRIME /</NavLink>
       
        <FaSearch className="search-btn" onClick={handleClick} />
        <input
          type="search"
          name="search-box"
          id="search-box"
          style={{ display: isClicked ? "block" : "none" }}
        />
      </div>

      <button className="nav-btn" onClick={toggleNavbar}>
        {isOpen ? <FaBars /> : <FaTimes />}
      </button>
    </nav>
  );
}

export default Navbar;
