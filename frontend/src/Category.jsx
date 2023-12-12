import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../src/css/category.css';
import More from './More';

function Category() {
    const [data, setData] = useState([]);
    const { category } = useParams();

    const [visibleArticles, setVisibleArticles] = useState(2); // Initial number of articles to display
    const articlesToLoad = 2; // Number of articles to load when "Load More" is clicked

    // Define and implement the handleLinkClick function to handle scrolling
    const handleLinkClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('articles/api');

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Find the category object from the data based on the category name
    const categoryData = data.find((item) => item.category.name === category || item.category.parent_category === category);

    // Define a variable to hold the category image URL
    let categoryImageURL = '';

    // Check if the categoryData object exists and has an image
    if (categoryData && categoryData.category.image) {
        categoryImageURL = categoryData.category.image;
    }

    return (
        <section className="scroller-column">
            <div
                className="scroller-column-banner"
                style={{
                    backgroundImage: `url(${categoryImageURL})`,
                    backgroundSize: 'cover', // Set the background image URL
                }}
            >
                <h2 className='scroller-column-header'>{category}</h2>
            </div>
            <hr width="80%" align="center" />
            <h2 className='header'>Latest {category} News </h2>
            <hr width="80%" align="center" height="30px" />
            {data
                .filter(
                    (article) =>
                        article.category.name === category ||
                        article.category.parent_category === category
                ).reverse()
                .map((article, index) => {
                    if (index < visibleArticles) {
                        return (
                            // Article card code
                            <div key={index} className={`article-scroller ${index + 1}`}>
                                <Link
                                    to={`/articles/${article.slug}`}
                                    onClick={handleLinkClick}
                                    style={{
                                        textDecoration: 'none',
                                        color: 'inherit',
                                    }}
                                >
                                    <div className="container-scroller">
                                        <div
                                            className="box1"
                                            style={{
                                                backgroundImage: `url(${article.thumbnail})`, // Set the background image URL
                                            }}
                                        >
                                            <h2 className="scroller-title">
                                                {article.title}
                                            </h2>
                                        </div>
                                        <div className="box2">
                                            <p
                                                className="scroller-snippet"
                                                dangerouslySetInnerHTML={{
                                                    __html: article.shortened_body,
                                                }}
                                            ></p>
                                        </div>
                                        <div className="box3">
                                            <h4>{article.author.name}</h4>
                                            <h4>{article.date}</h4>
                                        </div>
                                    </div>
                                    {/* Link should wrap the entire article card */}
                                </Link>
                            
                            </div>
                            
                        );
                    }
                    return null; // Return null for articles beyond the visible count
                })}
            {visibleArticles < data.length && (
                <div className="load-more">
                    <button
                        className="load-more-btn"
                        onClick={() => {
                            setVisibleArticles(visibleArticles + articlesToLoad);
                        }}
                    >
                        Load More
                    </button>
                </div>
            )}
             
        </section>
         
    );
}

export default Category;
