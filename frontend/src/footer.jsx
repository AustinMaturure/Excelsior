import React from "react";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import '../src/css/footer.css'


export default function Footer() {
    return (
        <footer className="footer-section">
            <section className="logo-footer">
                <h1>Excelsior</h1>
            </section>
            <div className="map">
  <iframe
    title="Google Map"
    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14219.326960029346!2d30.8050949!3d-27.0038719!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1eeee35b32a52019%3A0x11759755b5983635!2sExcelsior%20News!5e0!3m2!1sen!2sza!4v1709914531250!5m2!1sen!2sza" 
    width="400"
  
    height="200"
    className="map-frame"
    style={{ border: '2px solid #213547', borderRadius: "22px" }}
    allowFullScreen=""
    loading="async"  
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>
            <div className="about-us">
                <h1>About us</h1>
                <p className="about-us-text">The <span style={{ color: '#ca212a'}}>Only</span> Registered, Recognised and Approved Local Newspaper Servicing Piet Rietief, Mkhondo and 
                    Surronding Districts.
                </p>
                <p >
                    Contact us: <a className="contact-us" href="mailto:manager@excelsiornews.co.za">manager@excelsiornews.co.za</a>
                </p>
            </div><h1>Find us</h1>
            <div className="Find-us">
                
                <div className="icons">
                   <a href="https://www.facebook.com/excelsiornewspr" className="icon-link" >
                       <FaFacebook /> 
                    </a>
                    <a href="https://twitter.com/Excelsior__News" className="icon-link" >
                        <FaTwitter />
                    </a>
                    <a href="https://www.youtube.com/channel/UCSeAGcRh_TGjSceri4gxG-g" className="icon-link" >
                    <FaYoutube />
                    </a>
                </div>
                    
                
            </div>
        </footer>
    )
    
}