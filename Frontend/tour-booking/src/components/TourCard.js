import React from 'react';
import { Link } from 'react-router-dom';

const TourCard = ({ tour }) => {
  return (
    <div style={styles.card}>
      <img 
        src={require(`../data/${tour.imageUrl}`)} 
        alt={tour.title} 
        style={styles.image} 
      />
      <div style={styles.content}>
        <h3 style={styles.title}>{tour.title}</h3>
        <p style={styles.shortDescription}>{tour.shortDescription}</p>
        <p style={styles.price}><strong>Price:</strong> ${tour.price}</p>
        <Link to={`/tour/${tour.id}`} style={styles.button}>
          View Details
        </Link>
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease-in-out',
    margin:'auto',
    padding:'5%',
    width: '80%',
    textAlign: 'center',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
  },
  content: {
    padding: '15px',
  },
  title: {
    fontSize: '1.4rem',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#343a40',
  },
  shortDescription: {
    fontSize: '1rem',
    color: '#6c757d',
    marginBottom: '15px',
  },
  price: {
    fontSize: '1.2rem',
    fontWeight: '500',
    color: '#007bff',
    marginBottom: '20px',
  },
  button: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

// Add hover effect using CSS-in-JS (optional)
styles.card[':hover'] = {
  transform: 'scale(1.05)',
};

export default TourCard;
