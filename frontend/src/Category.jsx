import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../src/css/category.css';
import More from './More';



function Category() {
    const [data, setData] = useState([]);
    const { category } = useParams();
    const [visibleArticles, setVisibleArticles] = useState(4);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://excelsior-imez7mjwgq-bq.a.run.app/articles/api');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setData(jsonData);
                setVisibleArticles(4); // Reset visibleArticles when data is fetched
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [category]); // Fetch data and reset visibleArticles when category changes

    const loadMoreArticles = () => {
        setVisibleArticles(visibleArticles + 5); // Load 5 more articles
    };

    const removeTags = (html) => {
        const regex = /(<([^>]+)>)/gi;
        return html.replace(regex, '');
      };

    return (
        <section>
            { data ? 
            <section className="scroller-column">
                {data
                    .filter(
                        (article) =>
                            article.category.name === category ||
                            article.category.parent_category === category
                    ).reverse()
                    .slice(0, visibleArticles)
                    
                    .map((article, index) => (
                        <section className={`cat-section ${category}`} key={article.id}>
                            <Link to={`/articles/${article.slug}`} style={{ textDecoration: 'none' }}>
                                <div className='cat-card' id={`cat-card-${index}`}>
                                    <div className="cat-card-content">
                                        <div className='cat-card-image-ct'>
                                            <img loading="lazy" className="cat-card-image" src={`https://excelsior-imez7mjwgq-bq.a.run.app/${article.thumbnail}`} alt={article.title} />
                                        </div>
                                        <div className="cat-card-text">
                                            <p className='cat-card-info'>{article.author.name} - {new Date(article.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })} </p>
                                            <div className="cat-card-title-ct">
                                                <h2 className='cat-card-title'>{article.title}</h2>
                                            </div>
                                            <div className="cat-card-snip-ct">
                                                <p className='cat-card-snip'>{removeTags(article.shortened_body)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </section>
                    ))}
                {visibleArticles <= data.length &&  (
                    <div className="load-more">
                        <button
                            className="load-more-btn"
                            onClick={loadMoreArticles}
                        >
                            Load More
                        </button>
                    </div>
                )}
            </section>:<><div className="typing-div">
      <div className="skel skel-img">
        </div>   
        <div className="skel skel-text-area">
    
        <div className="skel skel-text"></div></div>
         </div></>}
        </section>
    );
}

export default Category;
