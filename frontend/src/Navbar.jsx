import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../static/Excelsior-News-Logo-544.png";
import "../src/css/nav.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setClick] = useState(false);

  const handleClick = () => {
    setClick(!isClicked);
  };

  const location = useLocation();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    // Close the navbar whenever the location (route) changes
    closeNavbar();
  }, [location]);

  return (
    <nav className={`navbar`}>
      <div className="navbar-header">
        <img src={logo} alt="Excelsior Logo" className="navbar-logo" />
        <button className="navbar-toggle" onClick={toggleNavbar}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <div className={`nav-links ${isOpen ? 'show-nav' : 'hide-nav'}`}>
        
        <NavLink to="/">HOME /</NavLink>
        <NavLink to="/category/Local">LOCAL /</NavLink>
        <NavLink to="/category/Sport">SPORT /</NavLink>
        <NavLink to="/category/Schools">SCHOOL /</NavLink>
        <NavLink to="/category/Accidents">ACCIDENTS /</NavLink>
        <NavLink to="/category/Crime">CRIME /</NavLink>
        <NavLink to="/#">LATEST /</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
