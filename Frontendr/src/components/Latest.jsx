import { useEffect, useState } from "react";
import "../css/carousels.css";
import axios from "axios";

export default function Latest() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pageNr, setPageNr] = useState(1);
  const [hasNext, setHasNext] = useState(true);

  const handleNextPage = () => {
    setPageNr((prevPage) => prevPage + 1);
  };
  useEffect(() => {
    let isMounted = true;

    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/articles?page=${pageNr}`
        );
        if (isMounted) {
          setArticles((prevArticles) => [
            ...prevArticles,
            ...response.data.results,
          ]);
          setHasNext(response.data.next != null);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
        if (isMounted) setError("Failed to fetch articles");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchArticles();

    return () => {
      isMounted = false;
    };
  }, [pageNr]);

  return (
    <section className="top-stories-cnt">
      <hr />
      <h2>Latest</h2>

      <div className="article-cnt">
        {articles.map((article, index) => (
          <div
            className={`article cat-article cat-article-${index + 1}`}
            key={index}
          >
            <article className="content">
              <p className="category-date">
                {new Date(article.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <div className="title-cnt">
                <h2>{article.title}</h2>
                <div className="snippet-cnt">
                  <p
                    className="snippet"
                    dangerouslySetInnerHTML={{
                      __html: article.shortened_body.slice(0, 150) + "...",
                    }}
                  ></p>
                </div>
              </div>
              <p className="category-name">{article.category.name}</p>
              <div className="image-cnt">
                <img
                  src={`http://127.0.0.1:8000${article.thumbnail}`}
                  alt="Article Thumbnail"
                />
              </div>
            </article>
          </div>
        ))}
      </div>
      {hasNext && (
        <div className="load-cnt">
          <button
            className="load-more"
            onClick={() => {
              handleNextPage();
            }}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </section>
  );
}
