import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../src/css/detail.css"
import More from "./More";
import DOMPurify from 'dompurify';
function Details() {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState(false); // Track expansion state
  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api');

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

  const matchingItem = data.find(item => item.slug === slug);
  const csrfToken = window.csrf_token;

  // Set the CSRF token as a default header for Axios requests
    axios.defaults.headers.common['X-CSRFToken'] = csrfToken;

  useEffect(() => {
    // Send a POST request to increment the view count when the component mounts
    if (matchingItem) {
      axios.post(`/api/articles/${matchingItem.id}/increment_views/increment_views`)
        .then(() => {
          // View count updated successfully
          // Reload the data if you want to display the updated view count
          fetchData() // This will re-fetch the data including the updated view count
        })
        .catch((error) => {
          console.error('Error incrementing article views:', error);
        });
    }
  }, [matchingItem]);

  if (!matchingItem) {
    return <div>
      <h1>Typing Article...</h1></div>; // Add a loading state
  }




  const toggleExpand = () => {
    setExpanded(!expanded); // Toggle the expanded state
  };
  const author = matchingItem.author.name; 
    const date = matchingItem.date;
    
    return (
        <div className="details-section">
          <div className={`article ${expanded ? 'expanded' : ''}`}>
            <div className="article-details">
              <p className="category">
              {matchingItem.category.parent_category} |  {matchingItem.category.name} | views~ {matchingItem.views}
              </p>
            <h1 className="article-title">{matchingItem.title}</h1>
            
              <label className="author-date-label">
                <span className="author"> {author}</span>
                <span className="date">{new Date(matchingItem.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </label>
              <article
                className="article-text"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(matchingItem.body) }}
              ></article>
              <input
                type="checkbox"
                className="expand-btn"
                name="expand-btn"
                onChange={toggleExpand}
                checked={expanded}
              />
            </div>
            <div className={`article-image ${expanded ? 'sticky' : ''}`}>
              <img src={matchingItem.thumbnail} alt="" />
              <div className="additional-images">
                {matchingItem.images.map(image => (
                  <img
                    key={image.id}
                    src={image.image}
                    className="additional-image"
                    alt={image.description}
                  />
                ))}
              </div>
            </div>
        </div>
        <div className="line" style={{ display:"flex", alignItems: "center", marginTop:"40px", justifyContent:"center"}}>
          <hr width="80%" align="center"/>
        </div>
        
        <h1 className="more-title"> More</h1>
        
       { <More category={matchingItem.category.name} id={matchingItem.id} articles={data}></More> } 
        
        </div>
       
      );
      
      
}

export default Details;
