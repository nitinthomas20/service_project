// src/components/TourCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const TourCard = ({ tour }) => {
  return (
    <div className="tour-card">
      <img src={tour.imageUrl} alt={tour.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      <h3>{tour.title}</h3>
      <p>{tour.shortDescription}</p>
      <p><strong>Price:</strong> ${tour.price}</p>
      <Link to={`/tour/${tour.id}`}>View Details</Link>
    </div>
  );
};

export default TourCard;
