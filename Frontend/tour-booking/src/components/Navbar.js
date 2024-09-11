// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = ({ cartItemCount }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">BookMyShow</Link>
      </div>
      <div className="navbar-cart">
        <Link to="/cart">
          <FaShoppingCart size={24} />
          <span className="cart-count">{cartItemCount}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
