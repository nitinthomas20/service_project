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
              id: name+'1', // Replace with actual event ID
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
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '10px',
      width: '200px',
      height: '200px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      <h3>{name}</h3>
      <p>{date}</p>
      <button 
        onClick={handleNotifyClick}
        style={{
          marginTop: '10px',
          padding: '5px 10px',
          border: 'none',
          borderRadius: '4px',
          backgroundColor: '#007bff',
          color: '#fff',
          cursor: 'pointer'
        }}
      >
        Notify
      </button>
    </div>
  );
};

export default EventCard;
