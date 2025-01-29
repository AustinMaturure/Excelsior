import { useEffect, useState } from "react";
import "../css/carousels.css";

export default function Carousels() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/articles/top-articles/"
        );
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchData();
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
            <a style={{ textDecoration: "none" }} key={article.id}>
              <div className="carousel-inner" id="carousel-inner">
                <div
                  className="article-box"
                  style={{
                    backgroundImage: `url(https://excelsior-imez7mjwgq-bq.a.run.app${article.thumbnail})`,
                  }}
                >
                  <h2 className="article-box-title">{article.title}</h2>
                </div>
              </div>
            </a>
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
      </section>
    </>
  );
}
