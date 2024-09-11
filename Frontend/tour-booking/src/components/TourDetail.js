// src/components/TourDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';

const TourDetail = ({ tours, addToCart }) => {
  const { id } = useParams();
  const tour = tours.find((tour) => tour.id === parseInt(id));

  if (!tour) return <div>Tour not found!</div>;

  return (
    <div>
      <img src={tour.imageUrl} alt={tour.title} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
      <h2>{tour.title}</h2>
      <p>{tour.description}</p>
      <p><strong>Price:</strong> ${tour.price}</p>
      <button onClick={() => addToCart(tour)}>Add to Cart</button>
    </div>
  );
};

export default TourDetail;
