import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Checkout.css';

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, total } = location.state || { cart: [], total: 0 }; // Default if no data is passed
  const [checkoutFailed, setCheckoutFailed] = useState(false);

  // Set up the beforeunload event listener to prompt user
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (cart.length > 0) {
        const message = "Your progress will be lost. Are you sure you want to reload?";
        e.returnValue = message; // Standard for most browsers
        return message; // For some older browsers
      }
    };

    // Add event listener when component mounts
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [cart]);

  const handleReload = () => {
    if (cart.length > 0 && window.confirm("Your progress will be lost. Are you sure you want to reload?")) {
      // Clear cart and show "Checkout Failed" message
      setCheckoutFailed(true);
    }
  };

  useEffect(() => {
    if (checkoutFailed) {
      // Clear the checkout page and show checkout failed message
      setTimeout(() => {
        navigate('/cart', { state: { cart: [], total: 0 } });
      }, 2000); // Redirect after 2 seconds
    }
  }, [checkoutFailed, navigate]);

  return (
    <div className="checkout-container">
      {checkoutFailed ? (
        <div className="checkout-failed">
          <h3>Checkout Failed</h3>
          <p>Your checkout process was interrupted. Please try again.</p>
        </div>
      ) : (
        <div className="checkout-content">
          {/* Order Summary Section */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            {cart.map((item, index) => (
              <div key={index} className="order-item">
                <img src={item.image} alt={item.name} />
                <div className="order-item-details">
                  <p>{item.name} - {item.size}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ₹{item.price}</p>
                </div>
              </div>
            ))}
            <div className="order-totals">
              <div className="subtotal">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div className="shipping">
                <span>Shipping</span>
                <span>To be calculated</span>
              </div>
              <div className="total">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="contact-form">
            <div className="step-indicator">
              <span>1. Contact</span>
              <span>2. Address</span>
              <span>3. Payment</span>
            </div>
            <h2>Enter Mobile Number</h2>
            <div className="mobile-number-input">
              <input type="text" placeholder="+91 Mobile Number" />
            </div>
            <button className="get-otp-button">Get OTP ➔</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
