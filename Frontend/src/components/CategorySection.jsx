import { Link } from "react-router-dom";
import "../css/categories.css";
import { marked } from "marked";
export default function CategorySection({ category, articles, loading }) {
  return (
    <section className="category-section">
      <h2 className="section-header">{category}</h2>
      <hr style={{ marginBottom: "0px" }} />
      <hr />
      {loading ? (
        <div className="categories-loading"></div>
      ) : (
        <div className="article-cnt">
          {articles.map((article, index) => (
            <Link to={`articles/article/${article.slug}`} key={index}>
              <div className={`article cat-article cat-article-${index + 1}`}>
                <article className={`content `}>
                  <p>
                    <p className="category-date">
                      {new Date(article.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </p>
                  <div className="title-cnt">
                    <h2>{article.title}</h2>

                    <div className="snippet-cnt">
                      <p className="snippet">
                        {marked(article.shortened_body.slice(0, 150)).replace(
                          /<\/?[^>]+(>|$)/g,
                          ""
                        )}
                      </p>
                    </div>
                  </div>{" "}
                  <p className="category-name">{article.category.name}</p>
                  <div className="image-cnt">
                    {" "}
                    <img
                      src={`${import.meta.env.VITE_API_URL}${
                        article.thumbnail
                      }`}
                      alt="Article Thumbnail"
                    />
                  </div>
                </article>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
