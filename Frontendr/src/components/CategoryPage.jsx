import { useEffect, useState } from "react";
import "../css/categorypage.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function CategoryPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [missingLoading, setMissingLoading] = useState(true);
  const [MissedArticles, setMissedArticles] = useState([]);
  const [error, setError] = useState("");
  const [pageNr, setPageNr] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const { category } = useParams();

  const handleNextPage = () => {
    setPageNr((prevPage) => prevPage + 1);
  };
  useEffect(() => {
    setArticles([]);
    let isMounted = true;

    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/categories/${category}?page=${pageNr}`
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
    const fetchMissedArticles = async () => {
      setMissingLoading(true);
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/articles/missed-articles/"
        );
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setMissedArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setMissingLoading(false);
      }
    };

    fetchArticles();
    fetchMissedArticles();

    return () => {
      isMounted = false;
    };
  }, [pageNr, category]);

  return (
    <>
      {" "}
      <h2 className="category-header">{category}</h2>
      <section className="category-page-cnt">
        <div
          className={`category article-cnt ${
            loading ? "category-loading skel" : ""
          }`}
        >
          {" "}
          {articles.map((article, index) => (
            <Link to={`articles/article/${article.slug}`} key={index}>
              <div
                className={`category article cat-article cat-article-${
                  index + 1
                }`}
              >
                <article className="category content">
                  <div className="title-cnt">
                    <h2 className="category-article-title">{article.title}</h2>{" "}
                    <p className="category-date">
                      {new Date(article.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <div className="snippet-cnt">
                      <p className="category snippet">
                        {" "}
                        {article.shortened_body.slice(0, 150) + "..."}
                      </p>
                    </div>
                  </div>

                  <div className="image-cnt">
                    <img
                      src={`http://127.0.0.1:8000${article.thumbnail}`}
                      alt="Article Thumbnail"
                    />
                  </div>
                </article>
              </div>
            </Link>
          ))}{" "}
          {hasNext && (
            <div className={`load-cnt ${loading ? "loading-cnt " : ""}`}>
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
        </div>
        <div className="category-missed-cnt">
          {" "}
          <div className="category-missed-articles">
            {" "}
            <p>Other Articles</p>
            {MissedArticles.map((article) => (
              <div
                className={` category-missed-tile ${
                  missingLoading ? "missed-loading skel" : ""
                }`}
              >
                <Link to={`/articles/article/${article.slug}`} key={article.id}>
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
