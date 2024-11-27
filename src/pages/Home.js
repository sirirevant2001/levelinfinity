import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"; // Import Axios for API calls
import "../styles/Home.css";
import img1 from '../assets/pictures/picture1.webp';
import img2 from '../assets/pictures/picture2.webp';
import img3 from '../assets/pictures/picture3.webp';
import img4 from '../assets/pictures/picture4.webp';
import img5 from '../assets/pictures/picture5.webp';
import img6 from '../assets/pictures/picture6.webp';
import img7 from '../assets/pictures/picture7.webp';
import img8 from '../assets/pictures/picture8.jpg';
import img9 from '../assets/pictures/picture9.webp';
import vid1 from '../assets/videos/examplevid.mp4';

const imageMap = {
  img1: img1,
  img2: img2,
  img3: img3,
  img4: img4,
  img5: img5,
  img6: img6,
  img7: img7,
  img8: img8,
  img9: img9,
};

function Home() {
  const productsSectionRef = useRef(null); // Ref for LATEST DROP section
  const [products, setProducts] = useState([]); // State for fetched products
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const navigate = useNavigate();

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products'); // Update with your backend URL
        setProducts(response.data); // Set the fetched data into state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage < products.length ? prevIndex + itemsPerPage : prevIndex
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - itemsPerPage >= 0 ? prevIndex - itemsPerPage : 0));
  };

  const handleProductClick = (product) => {
    // Map photos using imageMap
    const mappedProduct = {
      ...product,
      photos: product.photos.map((photo) => imageMap[photo]),
    };

    // Pass the mapped product to the ProductDetail page
    navigate(`/product/${product._id}`, { state: { product: mappedProduct } });
  };

  return (
    <div>
      {/* Top Division - Video Section */}
      <div className="video-section">
        <video autoPlay loop muted>
          <source src={vid1} type="video/mp4" />
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
                key={product._id}
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

      {/* Bottom Division - Flex Card Section */}
      <div className="slideshow-section">
        <div className="slideshow">
          <img src={img1} alt="1" />
          <img src={img2} alt="2" />
          <img src={img3} alt="3" />
          <img src={img4} alt="4" />
          <img src={img5} alt="5" />
          <img src={img6} alt="6" />
          <img src={img7} alt="7" />
          <img src={img8} alt="8" />
          <img src={img9} alt="9" />
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onClick }) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

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

  const handleMouseEnter = () => {
    setIsHovered(true);
    startSlideshow();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    stopSlideshow();
    setCurrentPhotoIndex(0);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div
      className="product-card"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h3 style={{letterSpacing:'3px', wordSpacing: '5px'}}>{product.name}</h3>
      <p style={{color:'gray'}}>₹. {product.price}</p>
      <div className="product-images">
        <img
          src={imageMap[product.photos[currentPhotoIndex]]} // Map string to imported path
          alt={`${product.name} - ${currentPhotoIndex + 1}`}
          style={{ width: '100%', height: '85%', borderRadius: '8px' }}
        />
      </div>
    </div>
  );
}

export default Home;
