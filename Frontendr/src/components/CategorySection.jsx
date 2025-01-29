import "../css/categories.css";
export default function CategorySection({ category, articles }) {
  return (
    <section className="category-section">
      <h2 className="section-header">{category}</h2>
      <hr />
      <div className="article-cnt">
        {articles.map((article, index) => (
          <div
            className={`article cat-article cat-article-${index + 1}`}
            key={index}
          >
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
                  <p
                    className="snippet"
                    dangerouslySetInnerHTML={{
                      __html: article.shortened_body.slice(0, 150) + "...",
                    }}
                  ></p>
                </div>
              </div>{" "}
              <p className="category-name">{article.category.name}</p>
              <div className="image-cnt">
                {" "}
                <img
                  src={`http://127.0.0.1:8000${article.thumbnail}`}
                  alt="Article Thumbnail"
                />
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
