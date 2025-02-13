import React from "react";

import "../css/footer.css";

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="about-us">
        <h1>Excelsior</h1>
        <p className="about-us-text">
          All the <span style={{ color: "#ca212a" }}>latest news</span> in your
          pocket.
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
