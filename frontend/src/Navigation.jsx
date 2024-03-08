import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import "../src/css/navigation.css"
function Navigaton() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://excelsior-news-backend-3vwjmxepcq-bq.a.run.app/api/categories');
    
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
    
    function countChildCategories(parentId) {
        return data.filter((category) => category.parent === parentId).length;
      }

    const sortedCategories = data
      .filter((category) => category.parent === null)
        .sort((a, b) => countChildCategories(b.id) - countChildCategories(a.id));
    
    return (
        <div className="navigation-container">
            
            <h1 className="top_stories_title">Top Topics</h1>
            {sortedCategories.map((category, index) => (
        <h2 key={index} className={`category-name ${index}`}>
          <NavLink to = {`/category/${category.name}`}  style={{
          textDecoration:"none", color:"#1f1f1f"
      }}> {category.name} ------- {countChildCategories(category.id)}</NavLink>
        </h2>
             
            
            ))

            }

        </div>
    )
}

export default Navigaton