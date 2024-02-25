import React from "react";
import "../src/css/more.css"
import { Link } from "react-router-dom";
import Navigaton from "./Navigation";



function More({ category,id, articles }) {
    
    function handleLinkClick() {
        // Scroll to the top of the page smoothly

        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }

      const removeTags = (html) => {
        const regex = /(<([^>]+)>)/gi;
        return html.replace(regex, '');
      };

    return (
        
        
        <div className="More-section">
  

  <div className="columns-container">
    <section className="column">
      <h2 className="column-header">{category}</h2>
      {articles
        .filter((article) => article.id != id && article.category.name == category || article.category.parent_category ==category )
        .slice(0, 3) // Display up to 3 articles
        .map((article, index) => (
            // Article card code here
            <div key={index} className={`article-card card-${index + 1}`}>
            <Link to={`/articles/${article.slug}`} onClick={handleLinkClick} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="content-block">
              <div className="content-text">
                <div className="thumb">
                <img loading="lazy" className="article-card-image" src={`https://excelsior-news-backend-3vwjmxepcq-bq.a.run.app/${article.thumbnail}`} alt="" srcSet="" />
              </div>
                <h2 className="snippet-title">{article.title}</h2>
                <p className="snippet" >{removeTags(article.shortened_body)}</p>
                
                
              </div>
              
            </div>
            
              {/* Link should wrap the entire article card */}
            </Link>
          </div>
        ))}
    </section>

    <section className="column">
      <h2 className="column-header">Sport</h2>
      {articles
        .filter((article) => article.id != id && article.category.name == "Sport" || article.category.parent_category =="Sport"  )
        .slice(0, 3) // Display up to 3 articles
        .map((article, index) => (
            // Article card code here
            <div key={index} className={`article-card card-${index + 1}`}>
            <Link to={`/articles/${article.slug}`} onClick={handleLinkClick} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="content-block">
              <div className="content-text"><div className="thumb">
                <img loading="lazy" className="article-card-image" src={`https://excelsior-news-backend-3vwjmxepcq-bq.a.run.app/${article.thumbnail}`} alt="" srcSet="" />
              </div>
                <h2 className="snippet-title">{article.title}</h2>
                <p className="snippet" >{removeTags(article.shortened_body)}</p>
                
              </div>
              
            </div>
            
              {/* Link should wrap the entire article card */}
            </Link>
          </div>
        ))}
    </section>

    <section className="column">
      <h2 className="column-header">Local</h2>
      {articles
        .filter((article) => article.id != id && article.category.name == "Local" || article.category.parent_category =="Local" )
        .slice(0, 3) // Display up to 3 articles
        .map((article, index) => (
            // Article card code here
            <div key={index} className={`article-card card-${index + 1}`}>
            <Link to={`/articles/${article.slug}`} onClick={handleLinkClick} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="content-block">
              <div className="content-text"><div className="thumb">
                <img loading="lazy" className="article-card-image" src={`https://excelsior-news-backend-3vwjmxepcq-bq.a.run.app/${article.thumbnail}`} alt="" srcSet="" />
              </div>
                <h2 className="snippet-title">{article.title}</h2>
                <p className="snippet" > {removeTags(article.shortened_body)}</p>
                
                
              </div>
              
            </div>
            
            </Link>
          </div>
        ))}
                </section>
                <Navigaton />
  </div>

  
</div>

    )
}

export default More;