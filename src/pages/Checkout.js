// Checkout.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Checkout.css';

function Checkout() {
  const location = useLocation();
  const { cart, total } = location.state || { cart: [], total: 0 }; // Default if no data is passed

  return (
    <div className="checkout-container">
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
          {/* <button className="apply-coupon">Apply Coupon</button> */}
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
            {/* <label>
              <input type="checkbox" /> Send me order updates and offers
            </label> */}
          </div>
          <button className="get-otp-button">Get OTP ➔</button>
          {/* <div className="secured-by">
            <span>Secured by</span>
            <img src="https://via.placeholder.com/80x20" alt="Secured Logo" />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
