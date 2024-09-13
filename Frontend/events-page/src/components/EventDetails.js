import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/events/${id}`)
      .then(response => setEvent(response.data))
      .catch(error => console.error('Error fetching event details:', error));
  }, [id]);

  if (!event) return <p>Loading event details...</p>;

  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      <p>Date: {new Date(event.date).toLocaleString()}</p>
      <p>Location: {event.location}</p>
      <button>Register for Event</button>
    </div>
  );
};

export default EventDetails;
