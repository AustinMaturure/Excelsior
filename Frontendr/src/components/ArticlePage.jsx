import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/detail.css";

export default function ArticlePage() {
  const [article, setArticle] = useState(null);
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/articles/article/${slug}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();
        setArticle(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="typing-div">
        <div className="skel skel-img"></div>
        <div className="skel skel-text-area">
          <div className="skel skel-title"></div>
          <div className="skel skel-text"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="article-section">
      <div className="article-container">
        <article>
          <div className="article-header">
            <h1 className="article-page-title">{article.title}</h1>
            <p>{article.author?.name || "Unknown Author"}</p>
            <p className="category-date">
              {new Date(article.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="image-cnt">
            <img
              src={`http://127.0.0.1:8000${article.thumbnail}`}
              alt="Article Thumbnail"
            />
          </div>
          <div className="article-body">{article.body}</div>
        </article>
      </div>
    </section>
  );
}
