import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import img1 from '../assests/pictures/picture1.webp';
import img2 from '../assests/pictures/picture2.webp';
import img3 from '../assests/pictures/picture3.webp';
import img4 from '../assests/pictures/picture4.webp';
import img5 from '../assests/pictures/picture5.webp';
import img6 from '../assests/pictures/picture6.webp';
import img7 from '../assests/pictures/picture7.webp';
import img8 from '../assests/pictures/picture8.jpg';
import img9 from '../assests/pictures/picture9.webp';
import vid from '../assests/videos/examplevid.mp4';

import "../styles/Home.css";

function Home() {
  const productsSectionRef = useRef(null); // Ref for LATEST DROP section
  const products = [
    {
      id: 1,
      name: 'Item 1',
      description: 'Description for Item 1',
      photos: [img1, img2, img3], // Multiple images
    },
    {
      id: 2,
      name: 'Item 2',
      description: 'Description for Item 2',
      photos: [img4, img5, img6], // Multiple images
    },
    {
      id: 3,
      name: 'Item 3',
      description: 'Description for Item 3',
      photos: [img7, img8, img9], // Multiple images
    },
    {
      id: 4,
      name: 'Item 4',
      description: 'Description for Item 4',
      photos: ['/public/assets/images/item4-1.jpg', '/public/assets/images/item4-2.jpg', '/public/assets/images/item4-3.jpg'], // Multiple images
    },
    {
      id: 5,
      name: 'Item 5',
      description: 'Description for Item 5',
      photos: ['/public/assets/images/item5-1.jpg', '/public/assets/images/item5-2.jpg', '/public/assets/images/item5-3.jpg'], // Multiple images
    },
    {
      id: 6,
      name: 'Item 6',
      description: 'Description for Item 6',
      photos: ['/public/assets/images/item6-1.jpg', '/public/assets/images/item6-2.jpg', '/public/assets/images/item6-3.jpg'], // Multiple images
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage < products.length ? prevIndex + itemsPerPage : prevIndex
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - itemsPerPage >= 0 ? prevIndex - itemsPerPage : 0));
  };

  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div>
      {/* Top Division - Video Section */}
      <div className="video-section">
        <video autoPlay loop muted>
          <source src={vid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Middle Division - Flex Card Section */}
      <div className="products-section" ref={productsSectionRef}>
        <h2 style={{ letterSpacing: '15px', wordSpacing: '10px' }}>LATEST DROP</h2>
        <div className="products-wrapper">
          <button className="arrow-button" onClick={handlePrev} disabled={currentIndex === 0}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <div className="products-container">
            {products.slice(currentIndex, currentIndex + itemsPerPage).map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
          <button className="arrow-button" onClick={handleNext} disabled={currentIndex + itemsPerPage >= products.length}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>

      {/* Bottom Division - Slideshow Section */}
      <div className="slideshow-section">
        <div className="slideshow">
          <img src={img1} alt="Slide 1" />
          <img src={img2} alt="Slide 2" />
          <img src={img3} alt="Slide 3" />
          <img src={img4} alt="Slide 4" />
          <img src={img5} alt="Slide 5" />
          <img src={img6} alt="Slide 6" />
          <img src={img7} alt="Slide 7" />
          <img src={img8} alt="Slide 8" />
          <img src={img9} alt="Slide 9" />
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onClick }) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // Track hover state
  const intervalRef = useRef(null); // Reference for the slideshow interval

  // Start slideshow when hovered
  const startSlideshow = () => {
    intervalRef.current = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % product.photos.length);
    }, 2000);
  };

  // Stop slideshow when not hovered
  const stopSlideshow = () => {
    clearInterval(intervalRef.current);
  };

  // Handle hover start
  const handleMouseEnter = () => {
    setIsHovered(true);
    startSlideshow();
  };

  // Handle hover end
  const handleMouseLeave = () => {
    setIsHovered(false);
    stopSlideshow();
    setCurrentPhotoIndex(0); // Optionally reset the slideshow when hover ends
  };

  useEffect(() => {
    // Clean up the interval on component unmount
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div
      className="product-card"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h3>{product.name}</h3>
      {/* Show slideshow of product photos */}
      <div className="product-images">
        <img
          src={product.photos[currentPhotoIndex]}
          alt={`${product.name} - ${currentPhotoIndex + 1}`}
          style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
        />
      </div>
    </div>
  );
}

export default Home;
