import { useEffect, useState } from "react";

export default function Carousels() {
  const [articles, setArticles] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/articles/top-articles/"
        );
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="scroller" id="scroller-1">
      {data
        .slice(0, 10)
        .sort((a, b) => b.views - a.views)
        .map((article) => (
          <Link
            to={`/articles/${article.slug}`}
            style={{ textDecoration: "none" }}
            key={article.id}
          >
            <div key={article.id} className="scroller-missed-articles">
              <div
                className="box"
                style={{
                  backgroundImage: `url(https://excelsior-imez7mjwgq-bq.a.run.app${article.thumbnail})`,
                }}
              >
                <h2 className="scroller-missed-title">{article.title}</h2>
              </div>
            </div>
          </Link>
        ))
        .reverse()}
    </div>
  );
}
