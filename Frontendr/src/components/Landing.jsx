import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../css/landing.css";

export default function Landing() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://excelsior-373787610603.africa-south1.run.app/api/articles/latest"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="landing-cnt">
        {!isLoading ? (
          <div className="block-1">
            {data.map((article, index) => (
              <div
                className={`article ${
                  isLoading ? "article-loading skel" : ""
                } article-${index + 1}`}
                key={index}
              >
                <Link to={`articles/article/${article.slug}`}>
                  <div className={`content ${index === 0 ? "" : "sub"}`}>
                    <div className="title-cnt">
                      <h2>{article.title}</h2>
                      {index === 0 ? (
                        <div className="snippet-cnt">
                          <p
                            className="snippet"
                            dangerouslySetInnerHTML={{
                              __html:
                                article.shortened_body.slice(0, 150) + "...",
                            }}
                          ></p>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="image-cnt">
                      {" "}
                      <img
                        src={`https://excelsior-imez7mjwgq-bq.a.run.app${article.thumbnail}`}
                        alt="Article Thumbnail"
                      />
                    </div>
                  </div>{" "}
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="loading-block ">
            <div className="article-1 article-loading"></div>
            <div className="article-2  article-loading"></div>
            <div className="article-3  article-loading"></div>
            <div className="article-4  article-loading"></div>
            <div className="article-5  article-loading"></div>
            <div className="article-6  article-loading"></div>
            <div className="article-7  article-loading"></div>
          </div>
        )}
      </section>
    </>
  );
}
