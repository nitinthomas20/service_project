import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = ({ cartItemCount }) => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.brand}>
        <Link to="/" style={styles.brandLink}>BookMyShow</Link>
      </div>
      <div style={styles.cart}>
        <Link to="/cart" style={styles.cartLink}>
          <FaShoppingCart size={24} style={styles.cartIcon} />
          {cartItemCount > 0 && (
            <span style={styles.cartCount}>{cartItemCount}</span>
          )}
        </Link>
      </div>
    </nav>
  );
};

// CSS styles in JavaScript object form for better control
const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333', // Dark background color for modern look
    color: '#fff',           // White text for contrast
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif', // Clean font
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
    position: 'sticky',
    top: 0,
    zIndex: 1000, // Keep the navbar on top when scrolling
  },
  brand: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  brandLink: {
    color: '#fff',  // White brand text color
    textDecoration: 'none',
    padding: '10px 0',
    transition: 'color 0.3s ease', // Smooth hover effect
  },
  brandLinkHover: {
    color: '#00bcd4', // Lighter color on hover
  },
  cart: {
    position: 'relative', // To position the cart count badge correctly
  },
  cartLink: {
    display: 'flex',
    alignItems: 'center',
    color: '#fff',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
  cartLinkHover: {
    color: '#00bcd4', // Lighter color on hover
  },
  cartIcon: {
    marginRight: '8px',
  },
  cartCount: {
    backgroundColor: '#f44336', // Red badge color for cart count
    borderRadius: '50%',
    padding: '4px 8px',
    fontSize: '12px',
    color: '#fff',
    position: 'absolute',
    top: '-8px',
    right: '-12px',
  }
};

export default Navbar;
