import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import '../styles/Cart.css';

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <h1 style={{fontFamily: 'Josefin Sans, serif', fontSize: 'small', fontStyle: 'normal', textAlign: 'center'}}>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-price">   Total   : {item.price}</p>
              <p className="cart-item-size">    Size    : {item.size}</p>
              <p className="cart-item-quantity">Quantity: {item.quantity}</p>
              <button className="remove-btn" onClick={() => removeFromCart(index)}><FontAwesomeIcon icon={faTrash} /></button>
            </div>
          </div>
        ))
      )}
      <div className="cart-summary">
        <p>Estimated Total: Rs. {calculateTotal()}</p>
        <p>(Tax included. Shipping and discounts calculated at checkout.)</p>
        {/* <label>
          <input type="checkbox" /> Have a gift card?
        </label> */}
        <button className="checkout-btn">Check Out</button>
      </div>
    </div>
  );
}

export default Cart;
