
import "../src/css/top.css";

import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";







function Top_Stories() {
  const [data, setData] = useState([]);
  const [weather, setWeather] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://excelsior-news-backend-3vwjmxepcq-bq.a.run.app/articles/api');

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
  const apiKey = '08aa1491da2f1b37eb1107936b922036';
  const city = 'piet retief'; // Replace with your desired city

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  
  
  // Fetch weather data
  useEffect(() => {
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(weatherData => {
        console.log('Weather data:', weatherData); // Log the received data
        setWeather(weatherData);
      })
      .catch(error => console.error('Error fetching weather data:', error));
  }, []); // Em
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (direction, containerSelector) => {
    const container = document.getElementById(containerSelector);
    const prevBut = document.querySelector('.btnPrev');
    const scrollAmount = 900; // Adjust the scroll amount as needed
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (container) {
      let newPosition =
        direction === 'next' ? scrollPosition + scrollAmount : scrollPosition - scrollAmount;
      container.scrollLeft = newPosition;
      
      if (newPosition < 0)
        {setScrollPosition(0)}
      else if (newPosition > maxScroll) {
          newPosition = maxScroll;
        }
      else{
        setScrollPosition(newPosition);
      }

    
      
    }
    
    
  };

  const [tickerTitles, setTickerTitles] = useState([]);

  useEffect(() => {
    // Update the tickerTitles state with the titles from the first 4 articles
    setTickerTitles(data.map(item => item));
  }, [data]);


  
  return (
    <div className="hi">
      
     <div className="weather-info" id="weather-info"></div>
     {/* data.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4).map((item, index) => ( */}
    <section className="container">
        {data.slice(0,4).reverse().map((item, index) => (
          <div
            className={`item item-${index + 1}`}
            key={index}
            style={{
              backgroundImage: `url(https://excelsior-news-backend-3vwjmxepcq-bq.a.run.app/${item.thumbnail})`,
            }}
          >
            <Link to={`/articles/${item.slug}`} style={{ textDecoration: 'none' }}>
              <div className="content">
                <h2 className="title1">{item.title}</h2>
                <div className="title-container">
                  <h2
                    className="title"
                    dangerouslySetInnerHTML={{ __html: item.shortened_body }}
                  ></h2>
                </div>
              </div>
            </Link>
          </div>
        ))} <div className="item-5">
          <h1 className="lfy-title">Latest For You</h1>
          {data.map((article) => 
            <section className="latest-for-you-list"> 
              <Link to={`/articles/${article.slug}`} style={{ textDecoration: 'none', color:"#f1f1f1" }}>
                <div className="latest-artcile-title">{article.title}</div>
                
              </Link>
            </section>
           
  )}
        </div>
        <div className="item-6">
          <p className="sign-up-box-title">Be The First To Know</p>
          <h2 className="sign-up-box-news">News, in <span style={{color:"#ca212a"}}>your</span> inbox!</h2>
          <p className="sign-up-box-notif" style={{fontSize:"0.7rem"}}> Get Notified whenever a new article is posted</p>
          <div className="mail" style={{display:"flex"}}>
            <input type="email"  className="email-box" name="email-box" id="email-box" title={'Email Adress'} />
            <button className="btn-email"  ><FaArrowRight/></button>
          </div>
            
        </div></section>

        <div className="news-ticker">
        <div className="anchor">
          <p className="anchor-text">All News</p>
        </div>  
      <ul >
        {tickerTitles.map((title, index) => (
           <Link to={`/articles/${title.slug}`} style={{ textDecoration: 'none', color:"black" }} key={title.id}>
          
            <li key={index} className="ticker-title">{title.title}</li>
            </Link>
         
          
        ))}
      </ul>
    </div>
   
      <div className="more-news">
        <div className="local-header-container">
          
        
          <h1 className="header-local" >LOCAL/ <span className="category-desc" >all your latest town news</span></h1>
          <hr color="#1f1f1f" width="98%" style={{  borderwidth: "0.5px" }} />
          <hr color="#1f1f1f" width="98%" style={{  borderwidth: "0.5px" }} />
          
          
        </div>
      <div className="local">
        
      {data
  .filter((article) => article.category.name === "Local" || article.parent_category === "Local")
  .slice(0, 6)
  .map((article, index) => (
    <Link to={`/articles/${article.slug}`} style={{ textDecoration: 'none' }} key={article.id}>
      { [2, 6, 10].includes(index) ? (
        <div key={article.id} className={`latest-local local-${index}`} style={
          {  backgroundImage: `url(https://excelsior-news-backend-3vwjmxepcq-bq.a.run.app/${article.thumbnail})` }
           
        }>
          <h2 className="extended-card-title">{article.title}</h2> 
         
          <h2
                    className="title" style={{display:"none"}}
                    dangerouslySetInnerHTML={{ __html: article.shortened_body }}
                  ></h2>
        </div>
      ) : (
          <div key={article.id} className={`latest-local local-${index}`}>
            
          <div className="theback">
            <p className="article-card-snippet" dangerouslySetInnerHTML={{ __html: article.shortened_body }}></p>
          </div>
            <div className="thefront">
              <div className="local-image-container">
                
              </div>
            <img loading="lazy" src={`https://excelsior-news-backend-3vwjmxepcq-bq.a.run.app/${article.thumbnail}`} className="local-image" alt={article.thumbnail.description} srcSet="" />
            <div className="latest-local-text">
            <h2 className="latest-local-date">
                {article.category.name}
              </h2>
              <h2 className="latest-local-title">{article.title}</h2>
              <p className="latest-local-cat">{new Date(article.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
        </div>
      )}
    </Link>
  ))
  }

        </div>
        <div className="local-header-container">
        <hr color="#1f1f1f" width="98%" style={{  borderWidth: "0.5px" }} />
          <h1 className="header-local">SPORT/ <span className="category-desc" > all your exciting sport news</span></h1>
        <hr color="#1f1f1f" width="98%" style={{  borderWidth: "0.5px" }} ></hr>
        <hr color="#1f1f1f" width="98%" style={{  borderwidth: "0.5px" }} />
        </div>
      <div className="local">
        
        {data
          .filter(
            (article) =>
              article.category.name === "Sport" ||
              article.category.parent_category === "Sport"
          )
          .slice(0, 6)
  .map((article, index) => (
    <Link to={`/articles/${article.slug}`} style={{ textDecoration: 'none' }} key={article.id}>
      { [2, 6, 10].includes(index) ? (
        <div key={article.id} className={`latest-local local-${index}`} style={
          { backgroundImage: `url(https://excelsior-news-backend-3vwjmxepcq-bq.a.run.app/${article.thumbnail})`, }
           
        }>
          <h2 className="extended-card-title">{article.title}</h2> 
       
          <h2
                    className="title" style={{display:"none"}}
                    dangerouslySetInnerHTML={{ __html: article.shortened_body }}
                  ></h2>
        </div>
      ) : (
          <div key={article.id} className={`latest-local local-${index}`}>
            
          <div className="theback">
            <p className="article-card-snippet" dangerouslySetInnerHTML={{ __html: article.shortened_body }}></p>
          </div>
            <div className="thefront">
              <div className="local-image-container">
                
              </div>
            <img loading="lazy" src={`https://excelsior-news-backend-3vwjmxepcq-bq.a.run.app/${article.thumbnail}`} className="local-image" alt={article.thumbnail.description} srcSet="" />
            <div className="latest-local-text">
              <h2 className="latest-local-date">
                {article.category.name}
              </h2>
              <h2 className="latest-local-title">{article.title}</h2>

              <p className="latest-local-cat">{new Date(article.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
        </div>
        /* {new Date(article.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}*/
      )}
    </Link>
  ))
 }
        </div>
        <div className="local-header-container">
        <hr color="#1f1f1f" width="98%" style={{  borderWidth: "1px" }} />
         
          <h1 className="header-local">SCHOOL/ <span className="category-desc" >all your latest school news</span></h1>
       
          
          <hr color="#1f1f1f" width="98%" style={{  borderWidth: "1px" }} ></hr>
          <hr color="#1f1f1f" width="98%" style={{  borderwidth: "0.5px" }} />
        </div>
      <div className="local">
        
        {data
          .filter(
            (article) =>
              article.category.name === "Schools" ||
              article.category.parent_category === "Schools"
          )
          .slice(0, 6)
          .map((article, index) => (
            <Link to={`/articles/${article.slug}`} style={{ textDecoration: 'none' }} key={article.id}>
            { [2, 6, 10].includes(index) ? (
              <div key={article.id} className={`latest-local local-${index}`} style={
                {  backgroundImage: `url(https://excelsior-news-backend-3vwjmxepcq-bq.a.run.app/${article.thumbnail})` }
                 
              }>
                <h2 className="extended-card-title">{article.title}</h2> 
               
                <h2
                          className="title" style={{display:"none"}}
                          dangerouslySetInnerHTML={{ __html: article.shortened_body }}
                        ></h2>
              </div>
            ) : (
                <div key={article.id} className={`latest-local local-${index}`}>
                  
                <div className="theback">
                  <p className="article-card-snippet" dangerouslySetInnerHTML={{ __html: article.shortened_body }}></p>
                </div>
                  <div className="thefront">
                  <div className="content-block">
              <div className="content-text"><div className="thumb">
                <img loading="lazy" className="article-card-image" src={`https://excelsior-news-backend-3vwjmxepcq-bq.a.run.app/${article.thumbnail}`} alt="" srcSet="" />
              </div>
                <h2 className="snippet-title">{article.title}</h2>
                <p className="snippet" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.shortened_body) }}></p>
                
              </div>
              </div>
                    </div>
                   
              </div>
            )}
          </Link>
          ))
            }
        </div>
        <div className="local-header-container">
      
        <hr color="#1f1f1f" width="98%" style={{  borderWidth: "0.5px" }} />
          <h1 className="header-local">LATEST/ <span className="category-desc" >all your latest, latest news</span></h1>
          <hr color="#1f1f1f" width="98%" style={{  borderWidth: "0.5px" }} />
          <hr color="#1f1f1f" width="98%" style={{  borderwidth: "0.5px" }} />
        </div>
            <div className="local">
        
        {data
          .slice(0, 11)
          .map((article, index=0) => (
            <Link to={`/articles/${article.slug}`} style={{ textDecoration: 'none' }} key={article.id}>
      { [2, 6, 10].includes(index) ? (
        <div key={article.id} className={`latest-local local-${index}`} style={
          { backgroundImage: `url(https://excelsior-news-backend-3vwjmxepcq-bq.a.run.app/${article.thumbnail})`, }
           
        }>
          <h2 className="extended-card-title">{article.title}</h2> 
          
          <h2
                    className="title" style={{display:"none"}}
                    dangerouslySetInnerHTML={{ __html: article.shortened_body }}
                  ></h2>
        </div>
      ) : (
          <div key={article.id} className={`latest-local local-${index}`}>
            
          <div className="theback">
            <p className="article-card-snippet" dangerouslySetInnerHTML={{ __html: article.shortened_body }}></p>
          </div>
            <div className="thefront">
              <div className="local-image-container">
                
              </div>
            <img loading="lazy" src={`https://excelsior-news-backend-3vwjmxepcq-bq.a.run.app/${article.thumbnail}`}  className="local-image" alt={article.thumbnail.description} srcSet="" />
            <div className="latest-local-text">
              <h2 className="latest-local-date">
              {article.category.name}
              </h2>
              <h2 className="latest-local-title">{article.title}</h2>
              <p className="latest-local-cat">{new Date(article.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
        </div>
      )}
    </Link>
          ))
          }
      </div>
      <div className="news-ticker">
        <div className="anchor">
          <p className="anchor-text">All News</p>
        </div>  
      <ul >
        {tickerTitles.map((title, index) => (
           <Link to={`/articles/${title.slug}`} style={{ textDecoration: 'none', color:"black" }} key={title.id}>
          
            <li key={index} className="ticker-title">{title.title}</li>
            </Link>
         
          
        ))}
      </ul>
      
    </div>
    <hr color="#1f1f1f" width="80%" style={{  borderWidth: "0.1px", border:'none', height:"1px" }} />
      <div className="missed-header-container">
        <h1 className="header-missed" id="header-missed-msd">You Might Have <span style={{textShadow:"1px 1px #ca412a",paddingRight:"10px", fontStyle:"italic"}}>Missed</span></h1>
      </div>
      
      <div className="scroller-media">
      

      <div className="scroller-overlay">
    <div className="navigation-buttons">
      <div><button className="btnPrev" onClick={() => handleScroll('prev', 'scroller-1')}><FaArrowLeft/></button></div>
      <div> <button className="btnNext" onClick={() => handleScroll('next', 'scroller-1')}><FaArrowRight/></button>
    </div></div>
     
  </div>
  <div className="scroller" id="scroller-1">

  
        {data
          .slice(0, 10)
          .sort((a, b) => b.views - a.views)
          .map((article) => (
            <Link to={`/articles/${article.slug}`} style={{ textDecoration: 'none' }} key={article.id}>
              <div key={article.id} className="scroller-missed-articles">
                <div
                  className="box"
                  style={{
                    backgroundImage: `url(https://excelsior-news-backend-3vwjmxepcq-bq.a.run.app/${article.thumbnail})`
                  }}
                >
                  <h2 className="scroller-missed-title">{article.title}</h2>
                </div>
              </div>

            </Link>
          ))
          .reverse()}
         
       
      </div>
      
      <div className="missed-header-container">
        <h1 className="header-missed"><span style={{textShadow:"1px 1px #ca412a",paddingRight:"15px", fontStyle:"italic", marginBottom:"2rem"}}>Top</span>Stories This Week</h1>
      </div>
      <div className="scroller-overlay">
    <div className="navigation-buttons">
      <button className="btnPrev" onClick={() => handleScroll('prev', 'scroller-2')}><FaArrowLeft/></button>
      <button className="btnNext" onClick={() => handleScroll('next', 'scroller-2')}><FaArrowRight/></button>
    </div>
  </div>
      <div className="scroller" id="scroller-2">
        {data
          .slice() // Create a copy of the data array
          .sort((a, b) => {
            const viewsComparison = b.views - a.views;
            if (viewsComparison === 0) {
              return new Date(b.date) - new Date(a.date);
            }
            return viewsComparison;
          })
          .slice(0, 10)
          .map((article) => (
            <Link to={`/articles/${article.slug}`} style={{ textDecoration: 'none' }} key={article.id}>
              <div key={article.id} className="scroller-missed-articles">
                <div
                  className="box"
                  style={{
                    backgroundImage: `url(https://excelsior-news-backend-3vwjmxepcq-bq.a.run.app/${article.thumbnail})`,
                  }}
                >
                  <h2 className="scroller-missed-title">{article.title}</h2>
                </div>
              </div>
            </Link>
          ))}
      </div>
      </div>
      <div className="local-header-container">
      
        <hr color="#1f1f1f" width="98%" style={{  borderWidth: "0.5px" }} />
          <h1 className="header-local" id='header-local-editors' style={{fontFamily:'Excon', textShadow:'none'}}>Editor's Pick's</h1>
          <hr color="#1f1f1f" width="98%" style={{  borderWidth: "0.5px" }} />
         
        </div>
<section className="editors-pick" style={{marginBottom:"0px"}}>
      <div className="editors-grid" style={{marginBottom:"0px"}}>
        {data.slice(0, 4).map((article) => (
          <div key={article.id} className={`article edit${article.id}`} id={`editors-article-${article.id}`}>
            <Link to={`/articles/${article.slug}`} style={{ textDecoration: 'none' }}>
              <div className="edt-div">
                <div className="edt-ttl-div">
                  <h2 className="editors-title">{article.title}</h2>
                  <h3 className="editors-snippet" >{article.shortened_body.slice(0, 100) + '...'}</h3>
                </div>
                <div className="editors-box"><img loading="lazy" className="editors-img" src={`https://excelsior-news-backend-3vwjmxepcq-bq.a.run.app/${article.thumbnail}`} alt="article-image" /></div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
    <hr color="#868e97" width="80%" style={{  borderWidth: "0.1px", border:'none', height:"1px" }} />
      </div>
      <section className="tools">
        <div className="tool1">
          
        
      <div className="local-header-container" id="header-business">
        <h1 className="header-missed" style={{alignSelf:"center"}}>Business Board</h1>
      </div>
      <div className="scroller" id="scroller-business">
        <h3 className="Ad">Advertise Your Business Here!</h3>
        {data
          .slice(0, 10)
          .filter(
            (article) =>
              article.category.name === "Business" ||
              article.category.parent_category === "Business"
          )
          .map((article) => (
            <Link to={`/articles/${article.slug}`} style={{ textDecoration: 'none' }} key={article.id}>
              <div key={article.id} className="scroller-missed-articles">
                <div
                  className="box"
                  style={{
                    backgroundImage: `url(https://excelsior-news-backend-3vwjmxepcq-bq.a.run.app/${article.thumbnail})`,
                  }}
                >
                  <h2 className="scroller-missed-title">{article.title}</h2>
                </div>
              </div>
            </Link>
          ))
          .reverse()}</div>
          </div>
          <div className="tool2">
          <div className="local-header-container" id="header-business">
        <h1 className="header-missed" style={{alignSelf:"center"}}>Recipe</h1>
        
      </div>
          </div>
          <div className="tool3">
            
          <span className="tdt-title">Today's Temp</span>{  (weather?.main?.temp * 0.1).toFixed(0) + 'ºC' ?? 'Loading...'}
          </div>
     
      </section>
      
      </div>
      
    
  );
  
}

export default Top_Stories;
