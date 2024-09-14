import React from "react";

function Footer() {
  return (
    <footer className="bg-light text-center text-lg-start">
      <div className="text-center p-3">
        <span>© {new Date().getFullYear()} Music Store: </span>
        <a className="text-dark" href="/" aria-label="Music Store Home">
          musicstore.com
        </a>
      </div>
    </footer>
  );
}

export default Footer;
