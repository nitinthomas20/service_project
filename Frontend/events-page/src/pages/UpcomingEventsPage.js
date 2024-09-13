import React from 'react';
import EventCard from '../components/EventCard.js';

const upcomingEvents = [
  { date: '2024-10-01', name: 'Upcoming Event 1' },
  { date: '2024-10-02', name: 'Upcoming Event 2' },
  { date: '2024-10-03', name: 'Upcoming Event 3' },
  { date: '2024-10-04', name: 'Upcoming Event 4' },
  { date: '2024-10-05', name: 'Upcoming Event 5' },
  { date: '2024-10-06', name: 'Upcoming Event 6' },
  { date: '2024-10-07', name: 'Upcoming Event 7' },
  { date: '2024-10-08', name: 'Upcoming Event 8' },
  { date: '2024-10-09', name: 'Upcoming Event 9' }
];

const UpcomingEventsPage = () => {
  return (
    <div style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {upcomingEvents.map((event, index) => (
        <EventCard key={index} date={event.date} name={event.name} />
      ))}
    </div>
  );
};

export default UpcomingEventsPage;
