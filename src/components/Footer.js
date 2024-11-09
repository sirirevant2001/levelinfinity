import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      {/* Top Announcement Section */}
      <div className="footer-top">
        <div className="footer-marquee">
          {/* <span style={{ wordSpacing: "40px" }}>
            SHIPPING-WORLDWIDE &nbsp; SHIPPING-WORLDWIDE &nbsp;
            SHIPPING-WORLDWIDE &nbsp; SHIPPING-WORLDWIDE &nbsp;
            SHIPPING-WORLDWIDE &nbsp; SHIPPING-WORLDWIDE &nbsp;
            SHIPPING-WORLDWIDE
          </span> */}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-logo">
          <h1>Levelinfinity</h1>
          <p>© 2024 LEVELINFINITY, ALL RIGHTS RESERVED.</p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>HELP</h4>
            {/* <Link to="/login">MEMBERS LOGIN</Link> */}
            <Link to="/exchange">PLACE AN EXCHANGE/RETURN REQUEST</Link>
            <Link to="/policy">EXCHANGE/RETURNS POLICY</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/terms">TERMS</Link>
            <Link to="/shipping">SHIPPING</Link>
          </div>
          <div className="footer-column">
            <h4>COMPANY</h4>
            <Link to="/story">STORY</Link>
            <Link to="/contact">CONTACT US</Link>
            <Link to="/stores">OUR STORES</Link>
            {/* <Link to="/careers">CAREERS</Link>
            <Link to="/collaborations">COLLABORATIONS</Link> */}
          </div>
        </div>
      </div>

      {/* Bottom Social Media Links */}
      <div className="footer-bottom">
        <Link to="/instagram">INSTAGRAM</Link>
        <Link to="/youtube">YOUTUBE</Link>
        <Link to="/linkedin">LINKEDIN</Link>
      </div>
    </footer>
  );
}

export default Footer;
