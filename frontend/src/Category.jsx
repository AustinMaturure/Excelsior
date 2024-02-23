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
                const response = await fetch('https://excelsior-news-backend-3vwjmxepcq-bq.a.run.app/articles/api');
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

    return (
        <section>
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
                                            <img loading="lazy" className="cat-card-image" src={article.thumbnail} alt={article.title} />
                                        </div>
                                        <div className="cat-card-text">
                                            <p className='cat-card-info'>{article.author.name} - {new Date(article.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })} </p>
                                            <div className="cat-card-title-ct">
                                                <h2 className='cat-card-title'>{article.title}</h2>
                                            </div>
                                            <div className="cat-card-snip-ct">
                                                <p className='cat-card-snip'>{new DOMParser().parseFromString(article.shortened_body, 'text/html').body.innerText}</p>
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
            </section>
        </section>
    );
}

export default Category;
