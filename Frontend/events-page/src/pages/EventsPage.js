import React from 'react';
import EventCard from '../components/EventCard.js';

const events = [
  { date: '2024-09-20', name: 'Event 1' },
  { date: '2024-09-21', name: 'Event 2' },
  { date: '2024-09-22', name: 'Event 3' },
  { date: '2024-09-23', name: 'Event 4' },
  { date: '2024-09-24', name: 'Event 5' },
  { date: '2024-09-25', name: 'Event 6' },
  { date: '2024-09-26', name: 'Event 7' },
  { date: '2024-09-27', name: 'Event 8' },
  { date: '2024-09-28', name: 'Event 9' }
];

const EventsPage = () => {
  return (
    <div style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {events.map((event, index) => (
        <EventCard key={index} date={event.date} name={event.name} />
      ))}
    </div>
  );
};

export default EventsPage;
