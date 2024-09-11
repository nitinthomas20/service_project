// Cart.js
import React, { useState } from 'react';

const Cart = ({ cartItems, handleRemoveFromCart, handleClearCart }) => {
    const [showForm, setShowForm] = useState(false);  // State to control form visibility
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleConfirm = () => {
        setShowForm(true);  // Show the form on confirm button click
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        // Prepare the data to send to the server
        const bookingData = {
            ...userData,
            tours: cartItems.map(item => ({
                id: item.id,
                title: item.title,
                price: item.price,
                quantity: item.quantity
            }))
        };

        try {
            const response = await fetch('http://localhost:5000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (response.ok) {
                alert('Booking confirmed and email sent!');
                handleClearCart();  // Clear cart after successful booking
                setShowForm(false); // Hide the form
            } else {
                alert('Failed to confirm booking. Please try again.');
                alert(response.statusText)
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="cart-container">
            <h2>Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            {item.title} - ${item.price} x {item.quantity}
                            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}

            {cartItems.length > 0 && !showForm && (
                <button onClick={handleConfirm}>Confirm</button>
            )}

            {/* Show the form when showForm is true */}
            {showForm && (
                <form onSubmit={handleFormSubmit}>
                    <h3>Enter your details to confirm booking:</h3>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={userData.name}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={userData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={userData.phone}
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
};

export default Cart;
