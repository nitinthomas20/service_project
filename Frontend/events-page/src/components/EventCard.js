import React from 'react';

const EventCard = ({ date, name }) => {
  const handleNotifyClick = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name, // Send the event name
          email: 'nitinkuthukallunkal@gmail.com', // Replace with the recipient's email or use a form input
          tours: [
            {
              id: name + '1', // Replace with actual event ID
              title: name,
              date: new Date(date).getTime(), // Convert date to timestamp
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      alert('Notification sent successfully!');
      console.log(result);
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification.');
    }
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.name}>{name}</h3>
      <p style={styles.date}>{new Date(date).toDateString()}</p>
      <button onClick={handleNotifyClick} style={styles.button}>
        Notify
      </button>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '20px',
    width: '250px',
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    margin: '10px',
  },
  name: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  date: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

// Add hover effect to card and button
styles.card[':hover'] = {
  transform: 'scale(1.05)',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
};

styles.button[':hover'] = {
  backgroundColor: '#0056b3',
};

export default EventCard;
