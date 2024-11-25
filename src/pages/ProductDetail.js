import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import '../styles/ProductDetail.css';

const sizeChartData = [
  { size: "S", chest: "34-36", shoulder: "16", length: "26" },
  { size: "M", chest: "38-40", shoulder: "17", length: "27" },
  { size: "L", chest: "42-44", shoulder: "18", length: "28" },
  { size: "XL", chest: "46-48", shoulder: "19", length: "29" }
];

// Size Alert Modal Component
function SizeAlertModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Please select a size</h3>
        <p>You need to choose a size before adding this item to the cart or buying it.</p>
        <button onClick={onClose} className="modal-close-button">OK</button>
      </div>
    </div>
  );
}

function ProductDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};
  const { addToCart, cart } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [showSizeAlert, setShowSizeAlert] = useState(false);
  const [showItemAlreadyInCart, setShowItemAlreadyInCart] = useState(false);
  const [activeSection, setActiveSection] = useState('description');

  useEffect(() => {
    if (!product) {
      navigate('/');
    }
  }, [product, navigate]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = 'Are you sure you want to leave? Your changes will be lost.';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleQuantityChange = (increment) => {
    setQuantity((prev) => Math.max(1, prev + increment));
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowSizeAlert(true);
      return;
    }

    const item = {
      ...product,
      quantity,
      size: selectedSize,
      image: product.photos[currentImageIndex]
    };

    const existingItem = cart.find(
      (cartItem) =>
        cartItem.id === item.id &&
        cartItem.size === item.size &&
        cartItem.quantity === item.quantity
    );

    if (existingItem) {
      setShowItemAlreadyInCart(true);
      return;
    }

    addToCart(item);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setShowSizeAlert(true);
      return;
    }

    const item = {
      ...product,
      quantity,
      size: selectedSize,
      image: product.photos[currentImageIndex]
    };

    const existingItem = cart.find(
      (cartItem) =>
        cartItem.id === item.id &&
        cartItem.size === item.size &&
        cartItem.quantity === item.quantity
    );

    if (existingItem) {
      setShowItemAlreadyInCart(true);
      return;
    }

    navigate('/checkout', {
      state: {
        cart: [item],
        total: item.price * quantity
      },
    });
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % product.photos.length
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex - 1 + product.photos.length) % product.photos.length
    );
  };

  const handleToggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const goToCheckout = () => {
    navigate('/checkout', {
      state: {
        cart,
        total: cart.reduce((total, item) => total + item.price * item.quantity, 0),
      },
    });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="detail-container">
      <div className="product-main-content">
        <div className="image-carousel">
          <button className="carousel-arrow-left" onClick={handlePrevImage}>&#8249;</button>
          <img
            src={product.photos[currentImageIndex]}
            alt={`${product.name} - ${currentImageIndex + 1}`}
            className="carousel-main-image"
          />
          <button className="carousel-arrow-right" onClick={handleNextImage}>&#8250;</button>
        </div>

        <div className="product-details">
          <div className="collapsible-sections">
            <div
              className={`collapsible-header ${activeSection === 'description' ? 'active' : ''}`}
              onClick={() => handleToggleSection('description')}
            >
              <h4>DESCRIPTION</h4>
            </div>
            <div
              className={`collapsible-header ${activeSection === 'details' ? 'active' : ''}`}
              onClick={() => handleToggleSection('details')}
            >
              <h4>PRODUCT DETAILS</h4>
            </div>
            <div
              className={`collapsible-header ${activeSection === 'shipping' ? 'active' : ''}`}
              onClick={() => handleToggleSection('shipping')}
            >
              <h4>SHIPPING DETAILS</h4>
            </div>
          </div>

          <div className="collapsible-content">
            {activeSection === 'description' && <p>{product.description}</p>}
            {activeSection === 'details' && (
              <ul>
                <li>100% COTTON</li>
                <li>WEIGHT-260GSM</li>
                <li>SCREEN PRINT</li>
                <li>CUT AND SEW PANEL</li>
                <li>MACHINE REVERSE WASH</li>
              </ul>
            )}
            {activeSection === 'shipping' && (
              <ul>
                <li>PACKED WITHIN 24 HOURS</li>
                <li>FREE DELIVERY PAN-INDIA</li>
                <li>DISPATCHES NEXT DAY</li>
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="actions-container">
        <h2 className="detail-title">{product.name}</h2>
        <div className="quantity-selector">
          <button onClick={() => handleQuantityChange(-1)}>-</button>
          <span>{quantity}</span>
          <button onClick={() => handleQuantityChange(1)}>+</button>
        </div>

        <label>Select Size:</label>
        <div className="size-selector">
          {["S", "M", "L", "XL"].map((size) => (
            <button
              key={size}
              onClick={() => handleSizeSelect(size)}
              className={selectedSize === size ? "size-selected" : ""}
            >
              {size}
            </button>
          ))}
        </div>
        <button onClick={() => setShowSizeChart(true)} className="size-chart-button">
          Size Chart
        </button>

        <div className="action-buttons">
          <button onClick={handleAddToCart} className="cart-button">Add to Cart</button>
          <button onClick={handleBuyNow} className="buy-button">Buy Now</button>
        </div>
      </div>

      {showSizeChart && (
        <div className="size-chart-overlay">
          <div className="size-chart-modal">
            <button onClick={() => setShowSizeChart(false)} className="modal-close-button">OK</button>
            <h3>Size Chart</h3>
            <table className="size-chart-table">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Chest</th>
                  <th>Shoulder</th>
                  <th>Length</th>
                </tr>
              </thead>
              <tbody>
                {sizeChartData.map((sizeInfo, index) => (
                  <tr key={index}>
                    <td>{sizeInfo.size}</td>
                    <td>{sizeInfo.chest}</td>
                    <td>{sizeInfo.shoulder}</td>
                    <td>{sizeInfo.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showSizeAlert && <SizeAlertModal onClose={() => setShowSizeAlert(false)} />}

      {showItemAlreadyInCart && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Item Already in Cart</h3>
            <p>The selected item is already in your cart with the same size and quantity.</p>
            <button onClick={() => setShowItemAlreadyInCart(false)} className="modal-close-button">OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
