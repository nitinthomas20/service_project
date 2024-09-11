// src/components/Cart.js
import React from 'react';

const Cart = ({ cartItems }) => {
  // Calculate total amount
  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="cart-items">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <div>
                  <h4>{item.title}</h4>
                  <p>Price: ${item.price}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
          </div>
          <button className="confirm-button" onClick={() => alert('Order Confirmed!')}>
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
