// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TourCard from './components/TourCard';
import TourDetail from './components/TourDetail';
import Cart from './components/Cart';
import Navbar from './components/Navbar'; // Import Navbar component
import toursData from './data/tours';

const App = () => {
  const [tours] = useState(toursData);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (tour) => {
    setCartItems([...cartItems, tour]);
  };

  return (
    <Router>
      <div className="App">
        <Navbar cartItemCount={cartItems.length} /> {/* Include Navbar with cart items count */}
        <Routes>
          <Route
            path="/"
            element={
              <div>
                {tours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            }
          />
          <Route path="/tour/:id" element={<TourDetail tours={tours} addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
