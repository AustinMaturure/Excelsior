import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import "../css/navbar.css";
import searchImg from "../assets/search.svg";
import closeImg from "../assets/close.svg";

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [open, setOpen] = useState(false);
  const [articles, setArticles] = useState([]);
  const [image, setImage] = useState(searchImg);
  const [searchOpen, setSearchOpen] = useState("closed");
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const toggleSearch = () => {
    setOpen(!open);
    if (open) {
      setSearchOpen("");
      setImage(closeImg);
    } else {
      setSearchOpen("closed");
      setImage(searchImg);
    }
  };

  const handleSearch = async (event) => {
    const query = event.target.value;

    if (!query || query == "") {
      setArticles([]);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/articles/search/?query=${query}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      setArticles(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (window.scrollY > 6) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setArticles([]);
    setSearchOpen("closed");
    setImage(searchImg);
  }, [location]);

  return (
    <>
      <header className={isSticky ? "sticky" : ""}>
        <h2 className="nav-logo">
          <a href="/">Excelsior</a>
        </h2>
        <div className="search-box-img" onClick={() => toggleSearch()}>
          <button>
            <img src={image} alt="" />
          </button>
        </div>
        <div className={`search-box ${searchOpen}`}>
          <h2>Search</h2>
          <input
            type="search"
            name="search-box"
            id="search-box"
            placeholder="Enter your Search Query"
            onChange={handleSearch}
          />
          <div className="category-missed-articles">
            <p></p>
            {isLoading ? (
              <p>Searching...</p>
            ) : (
              articles.map((article) => (
                <div key={article.id} className="category-missed-tile">
                  <Link to={`/articles/article/${article.slug}`}>
                    <h2>{article.title}</h2>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
        <hr />
      </header>{" "}
      <p className="slogan">The latest news in your pocket</p>
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
