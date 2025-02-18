import { useEffect, useState } from "react";
import "../css/carousels.css";
import { Link } from "react-router-dom";

export default function Carousels() {
  const [articles, setArticles] = useState([]);
  const [MissedArticles, setMissedArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/articles/top-articles/`
        );
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    const fetchMissedArticles = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/articles/missed-articles/`
        );
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setMissedArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchData();
    fetchMissedArticles();
  }, []);

  const handleClick = (direction) => {
    const carousel = document.getElementById("carousel-1");
    if (carousel) {
      const remToPx = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );
      const scrollAmount = 19 * remToPx;
      carousel.scrollLeft += direction * scrollAmount;
    }
  };

  return (
    <>
      <section className="top-stories-cnt">
        <h2>Top Stories</h2>
        <hr />
        <div className="carousel" id="carousel-1">
          {articles.map((article) => (
            <Link to={`articles/article/${article.slug}`} key={article.id}>
              <div className="carousel-inner" id="carousel-inner">
                <div
                  className="article-box"
                  style={{
                    backgroundImage: `url(${import.meta.env.VITE_API_URL}${
                      article.thumbnail
                    })`,
                  }}
                >
                  {" "}
                  <div className="overlay"></div>
                  <h2 className="article-box-title">{article.title}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="carousel-nav">
          <button
            className="carousel-button btn-left"
            onClick={() => handleClick(-1)}
          >
            {"←"}
          </button>
          <button
            className="carousel-button btn-right"
            onClick={() => handleClick(1)}
          >
            {"→"}
          </button>
        </div>
        <h2>You might have missed</h2>
        <hr />
        <div className="missed-cnt">
          {" "}
          <div className="missed-articles">
            {MissedArticles.map((article) => (
              <div className="missed-tile" key={article.id}>
                <Link to={`articles/article/${article.slug}`} key={article.id}>
                  <h2>{article.title}</h2>
                </Link>
              </div>
            ))}{" "}
          </div>
        </div>
      </section>
    </>
  );
}
