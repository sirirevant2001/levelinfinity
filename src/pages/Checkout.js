import React from 'react';
import '../styles/Checkout.css';

function Checkout() {
  return (
    <div className="checkout-container">
      <div className="checkout-content">
        {/* Order Summary Section */}
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="order-item">
            <img src="https://via.placeholder.com/100" alt="Product" />
            <div className="order-item-details">
              <p>FIRE WHEEL POLO T-SHIRT - XXXS</p>
              <p>Quantity: 1</p>
              <p>Price: ₹4,495.00</p>
            </div>
          </div>
          <div className="order-totals">
            <div className="subtotal">
              <span>Subtotal</span>
              <span>₹4,495.00</span>
            </div>
            <div className="shipping">
              <span>Shipping</span>
              <span>To be calculated</span>
            </div>
            <div className="total">
              <span>Total</span>
              <span>₹4,495.00</span>
            </div>
          </div>
          <button className="apply-coupon">Apply Coupon</button>
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
            <label>
              <input type="checkbox" /> Send me order updates and offers
            </label>
          </div>
          <button className="get-otp-button">Get OTP ➔</button>
          <div className="secured-by">
            <span>Secured by</span>
            <img src="https://via.placeholder.com/80x20" alt="Secured Logo" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
