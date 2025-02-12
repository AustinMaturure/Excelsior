import React from "react";

import "../css/footer.css";

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="about-us">
        <h1>About us</h1>
        <p className="about-us-text">
          The <span style={{ color: "#ca212a" }}>Only</span> Registered,
          Recognised and Approved Local Newspaper Servicing Piet Rietief,
          Mkhondo and Surronding Districts.
        </p>
        <p>
          Contact us:{" "}
          <a className="contact-us" href="mailto:austinmaturure@gmail.com">
            austinmaturure@gmail.com
          </a>
        </p>
      </div>

      <div className="legal">
        <p className="copy-right">
          &copy; {new Date().getFullYear()} Excelsior News. All rights reserved.
        </p>
        <p className="author">
          Designed and developed by{" "}
          <a
            className="austin-portfolio"
            href="https://austinmaturure.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Austin ⚡
          </a>
        </p>
      </div>
    </footer>
  );
}
