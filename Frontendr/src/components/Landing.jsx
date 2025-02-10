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
          "http://127.0.0.1:8000/api/articles/latest"
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
      <div className="landing-cnt">
        <div className="block-1">
          {data.map((article, index) => (
            <div className={`article article-${index + 1}`} key={index}>
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
                      src={`http://127.0.0.1:8000${article.thumbnail}`}
                      alt="Article Thumbnail"
                    />
                  </div>
                </div>{" "}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
