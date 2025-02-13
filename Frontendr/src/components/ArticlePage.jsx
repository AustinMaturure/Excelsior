import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../css/detail.css";
import axios from "axios";

export default function ArticlePage() {
  const [article, setArticle] = useState(null);
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [snippets, setSnippets] = useState([]);

  const [snippetsLoading, setSnippetsLoading] = useState(true);

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
          `https://excelsior-373787610603.africa-south1.run.app/api/articles/article/${slug}`
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

  const fetchSnippets = async () => {
    setSnippetsLoading(true);
    try {
      const response = await axios.get(
        `https://excelsior-373787610603.africa-south1.run.app/api/articles/snippets/${slug}`
      );
      setSnippets(response.data);
    } catch (error) {
      console.error("Error fetching snippets:", error);
    } finally {
      setSnippetsLoading(false);
    }
  };
  useEffect(() => {
    fetchSnippets();
  }, []);

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
        <div className="article-main">
          <article className="article-body">
            <div className="article-page image-cnt">
              <img
                src={`https://excelsior-imez7mjwgq-bq.a.run.app${article.thumbnail}`}
                alt="Article Thumbnail"
              />
            </div>
            <div className="article-text">{article.body}</div>
            <hr />
            <p>General views: {article.views}</p>
          </article>
          <div className="more-articles">
            <h3 className="more-articles-header">More Articles</h3>
            <hr />
            <div className="snippets">
              {snippets.map((snippet) =>
                snippet.slug != slug ? (
                  <Link
                    className="snippet"
                    to={`/articles/article/${snippet.slug}`}
                    key={snippet.id}
                  >
                    <h2>{snippet.title}</h2>
                  </Link>
                ) : (
                  <></>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
