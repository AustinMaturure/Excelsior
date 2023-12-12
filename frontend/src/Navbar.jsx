import React, { useState,  useEffect } from "react";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { NavLink, useLocation  } from 'react-router-dom';
import "../src/css/nav.css";


function Navbar() {
  const [isOpen, setIsOpen] = useState(window.innerWidth <= 726);
  const location = useLocation();
 
  const toggleNavbar = () => {
   
      setIsOpen(!isOpen);
    
  };

  const closeNavbar = () => {
    setIsOpen(true);
  };
  useEffect(() => {
    // Close the navbar whenever the location (route) changes
    closeNavbar()
  }, [location]);
  return (
    
      

      <nav className={isOpen ? "responsive-nav" : "navbar"}>
      <section className="logo-footer">
                <h1 style={{backgroundColor:"rgb(179, 50, 50)",color: "white",boxShadow: "5px 5px #1f1f1f", marginTop:"0px" , marginLeft:"1rem",padding:"1rem", fontSize:"2.4rem"}}>Excelsior</h1>
            </section>
        <div className={isOpen ? "responsive-links" : "links"}>
          <a href="/#">LATEST /</a>
          <NavLink to="/">HOME /</NavLink>
          <NavLink to="category/Local">LOCAL /</NavLink>
          <a href="/#">CRIME /</a>
          <a href="/#">YOUTH /</a>
          <NavLink to="category/Sport">SPORT /</NavLink>
        <NavLink to="category/Schools">SCHOOL</NavLink>
        <FaSearch></FaSearch>
        
        </div>

        
      <button className="nav-btn" onClick={toggleNavbar} >
      
        {isOpen ?  <FaBars  /> : <FaTimes/>}
        
      </button>
      
     
      </nav>
      
   
  );
}

export default Navbar;
