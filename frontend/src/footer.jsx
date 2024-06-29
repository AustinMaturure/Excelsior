import React from "react";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import '../src/css/footer.css'


export default function Footer() {
    return (
        <footer className="footer-section">
            <section className="logo-footer">
                <h1>Excelsior</h1>
            </section>
           
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