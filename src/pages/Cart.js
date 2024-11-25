import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import '../styles/Cart.css';

// Modal Component
function EmptyCartModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Your cart is empty</h3>
        <p>Please add items to your cart before proceeding to checkout.</p>
        <button onClick={onClose} className="modal-close-button">Close</button>
      </div>
    </div>
  );
}

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [showEmptyCartModal, setShowEmptyCartModal] = useState(false);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      // Show the empty cart modal
      setShowEmptyCartModal(true);
      return;
    }
    navigate('/checkout', { state: { cart, total: calculateTotal() } });
  };

  const closeEmptyCartModal = () => {
    setShowEmptyCartModal(false);
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "Your progress will be lost if you leave this page.";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="cart-container">
      <h1 style={{ fontFamily: 'Josefin Sans, serif', fontSize: 'small', fontStyle: 'normal', textAlign: 'center' }}>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-price">Total: ₹{item.price}</p>
              <p className="cart-item-size">Size: {item.size}</p>
              <p className="cart-item-quantity">Quantity: {item.quantity}</p>
              <button className="remove-btn" onClick={() => removeFromCart(index)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))
      )}
      <div className="cart-summary">
        <p>Estimated Total: ₹. {calculateTotal()}</p>
        <p>(Tax included. Shipping and discounts calculated at checkout.)</p>
        <button className="checkout-btn" onClick={handleCheckout}>Check Out</button>
      </div>

      {/* Empty Cart Modal */}
      {showEmptyCartModal && <EmptyCartModal onClose={closeEmptyCartModal} />}
    </div>
  );
}

export default Cart;
