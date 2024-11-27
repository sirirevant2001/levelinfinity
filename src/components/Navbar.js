import React, { useState, useRef, useContext, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from '../pages/CartContext';
import "../styles/Navbar.css";

function Navbar() {
  const { cart } = useContext(CartContext);
  const cartCount = cart.length;
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownUser, setShowDropdownUser] = useState(false);
  const [userName, setUserName] = useState(null);
  const timeoutId = useRef(null);
  const navigate = useNavigate();

  // Check if user is logged in (from localStorage)
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
      
    }
  }, []);

  const handleMouseEnter = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutId.current = setTimeout(() => setShowDropdown(false), 300);
  };

  const handleMouseEnterUser = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    setShowDropdownUser(true);
  };

  const handleMouseLeaveUser = () => {
    timeoutId.current = setTimeout(() => setShowDropdownUser(false), 300);
  };

  const handleLogout = () => {
    localStorage.removeItem("userName");
    setUserName(null);
    window.location.href = "/";
  };

  const scrollToLatestDrop = () => {
    navigate("/"); // Navigate to the Home page first
    setTimeout(() => {
      const latestDropSection = document.querySelector(".products-section");
      if (latestDropSection) {
        latestDropSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // Delay to ensure the page loads first
  };

  return (
    <nav className="navbar">
      <div className="navbar-section navbar-brand">LEVELINFINITY</div>

      <div className="navbar-section navbar-links">
        <Link to="/" className="nav-link">
          HOME
        </Link>
        <span onClick={scrollToLatestDrop} className="nav-link">
          APPAREL
        </span>

        <div
          className="nav-link dropdown"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          STORE
          {showDropdown && (
            <div
              className="dropdown-menu"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/about" className="dropdown-item">
                ABOUT US
              </Link>
              <Link to="/contact" className="dropdown-item">
                CONTACT US
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="navbar-section navbar-icons">
        {userName ? (
          <div
          className="nav-link dropdown"
          onMouseEnter={handleMouseEnterUser}
          onMouseLeave={handleMouseLeaveUser} 
        >
          
          {userName}
          {showDropdownUser && (
            <div
              className="dropdown-menu-user"
              onMouseEnter={handleMouseEnterUser}
              onMouseLeave={handleMouseLeaveUser}
            >
              <Link to="/account-settings" className="dropdown-item">
                SETTINGS
              </Link>
              <Link onClick={handleLogout} className="dropdown-item">
                LOG OUT
              </Link>
            </div>
          )}
        </div>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              LOGIN
            </Link>
            {/* <Link to="/signup" className="nav-link">
              SIGN UP
            </Link> */}
          </>
        )}
        
        <Link to="/Cart" className="nav-icon">
          <FontAwesomeIcon icon={faShoppingCart} size="lg" />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
