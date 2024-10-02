import React from 'react';
import { useParams } from 'react-router-dom';

const TourDetail = ({ tours, addToCart }) => {
  const { id } = useParams();
  const tour = tours.find((tour) => tour.id === parseInt(id));

  if (!tour) return <div style={styles.notFound}>Tour not found!</div>;

  return (
    <div style={styles.container}>
      <img 
        src={require(`../data/${tour.imageUrl}`)} 
        alt={tour.title} 
        style={styles.image}
      />
      <div style={styles.content}>
        <h2 style={styles.title}>{tour.title}</h2>
        <p style={styles.description}>{tour.description}</p>
        <p style={styles.price}>
          <strong>Price:</strong> ${tour.price}
        </p>
        <button style={styles.button} onClick={() => addToCart(tour)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  content: {
    padding: '20px',
  },
  title: {
    fontSize: '2.4rem',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#343a40',
  },
  description: {
    fontSize: '1.1rem',
    color: '#495057',
    marginBottom: '20px',
    lineHeight: '1.6',
  },
  price: {
    fontSize: '1.2rem',
    fontWeight: '500',
    marginBottom: '25px',
    color: '#007bff',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1.1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  notFound: {
    fontSize: '1.5rem',
    textAlign: 'center',
    padding: '20px',
    color: '#dc3545',
  },
};

export default TourDetail;
