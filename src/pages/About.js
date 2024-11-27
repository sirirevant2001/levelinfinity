import React from 'react';
import '../styles/About.css'; // CSS file for styling
import img from '../assets/pictures/picture9.webp'; // Update with your image path

function AboutUs() {
  return (
    <div className="about-us-container">
      <div className="about-us-photo">
        <img src={img} alt="About Us" className="about-photo" />
      </div>
      <div className="about-us-text">
        <h1>About Us</h1>
        <p>
          Welcome to Level Infinity, where affordable luxury meets timeless elegance. Our brand is dedicated to redefining luxury fashion, 
          offering meticulously crafted clothing that combines high-end aesthetics with accessible pricing. At Level Infinity, we believe 
          that sophistication and quality should be within everyone's reach, which is why we meticulously source premium materials and employ
          skilled artisans to create each piece in our collections.
        </p>
        <p>
          Join our journey and elevate your wardrobe with our exquisite designs that transcend trends, making a statement of redefined taste
          taste and modern elegance. Embrace the infinite possibilities of style with Level Infinity - where luxury knows no bounds. Follow us 
          for the latest updates and exclusive offers, and be a part of our community that celebrates fashion without compromise.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
