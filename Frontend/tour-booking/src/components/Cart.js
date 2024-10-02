import React, { useState } from 'react';

const Cart = ({ cartItems, handleRemoveFromCart, handleClearCart }) => {
    const [showForm, setShowForm] = useState(false);
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
        setShowForm(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

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
            const response = await fetch('http://localhost:5001/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (response.ok) {
                alert('Booking confirmed and email sent!');
                handleClearCart();
                setShowForm(false);
            } else {
                alert('Failed to confirm booking. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div style={styles.cartContainer}>
            <h2 style={styles.heading}>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p style={styles.emptyCart}>Your cart is empty.</p>
            ) : (
                <ul style={styles.cartList}>
                    {cartItems.map((item) => (
                        <li key={item.id} style={styles.cartItem}>
                            <span>{item.title} - ${item.price}  </span>
                            <button style={styles.removeButton} onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}

            {cartItems.length > 0 && !showForm && (
                <button style={styles.confirmButton} onClick={handleConfirm}>Confirm Booking</button>
            )}

            {showForm && (
                <form style={styles.form} onSubmit={handleFormSubmit}>
                    <h3 style={styles.formHeading}>Enter your details to confirm booking:</h3>
                    <input
                        style={styles.input}
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={userData.name}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        style={styles.input}
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={userData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        style={styles.input}
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={userData.phone}
                        onChange={handleInputChange}
                        required
                    />
                    <button style={styles.submitButton} type="submit">Submit</button>
                </form>
            )}
        </div>
    );
};

// CSS-in-JS Styles
const styles = {
    cartContainer: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    },
    heading: {
        fontSize: '28px',
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
    },
    emptyCart: {
        textAlign: 'center',
        color: '#666',
    },
    cartList: {
        listStyle: 'none',
        padding: 0,
        marginBottom: '20px',
    },
    cartItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 0',
        borderBottom: '1px solid #ddd',
    },
    removeButton: {
        backgroundColor: '#f44336',
        color: '#fff',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    removeButtonHover: {
        backgroundColor: '#d32f2f',
    },
    confirmButton: {
        display: 'block',
        width: '100%',
        padding: '12px 0',
        backgroundColor: '#4caf50',
        color: '#fff',
        fontSize: '16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    confirmButtonHover: {
        backgroundColor: '#388e3c',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formHeading: {
        fontSize: '20px',
        color: '#333',
        marginBottom: '20px',
    },
    input: {
        padding: '10px',
        marginBottom: '15px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        transition: 'border-color 0.3s ease',
    },
    inputFocus: {
        borderColor: '#4caf50',
    },
    submitButton: {
        padding: '12px',
        backgroundColor: '#2196f3',
        color: '#fff',
        fontSize: '16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    submitButtonHover: {
        backgroundColor: '#1976d2',
    }
};

export default Cart;
