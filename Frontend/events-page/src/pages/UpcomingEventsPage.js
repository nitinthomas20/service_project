import React from 'react';
import EventCard from '../components/EventCard.js';

const upcomingEvents = [
  { 
    date: '2024-10-01', 
    name: 'Wollongong Film Festival', 
    location: 'Wollongong Town Hall', 
    description: 'A showcase of short films from local filmmakers, followed by Q&A sessions.' 
  },
  { 
    date: '2024-10-02', 
    name: 'Tech and Innovation Expo 2024', 
    location: 'Innovation Campus, UOW', 
    description: 'Explore the latest advancements in technology with exhibitions and keynote speakers.' 
  },
  { 
    date: '2024-10-03', 
    name: 'Wollongong Art Walk', 
    location: 'Various Art Galleries', 
    description: 'A guided tour of the city’s top art galleries, featuring contemporary and classic art.' 
  },
  { 
    date: '2024-10-04', 
    name: 'Oktoberfest Celebration', 
    location: 'The German Club, Kembla Grange', 
    description: 'Enjoy traditional German food, beer, and live music to celebrate Oktoberfest.' 
  },
  { 
    date: '2024-10-05', 
    name: 'Wollongong Science Fair', 
    location: 'Science Space, Innovation Campus', 
    description: 'Interactive science exhibits and activities for all ages, exploring the wonders of science.' 
  },
  { 
    date: '2024-10-06', 
    name: 'Live Theatre: Shakespeare in the Park', 
    location: 'Stuart Park, Wollongong', 
    description: 'An outdoor theatre performance of Shakespeare’s classics, under the evening sky.' 
  },
  { 
    date: '2024-10-07', 
    name: 'Fitness Bootcamp Challenge', 
    location: 'North Wollongong Beach', 
    description: 'Join the city’s biggest outdoor bootcamp, with challenges for fitness enthusiasts.' 
  },
  { 
    date: '2024-10-08', 
    name: 'International Food and Wine Festival', 
    location: 'Wollongong Harbour', 
    description: 'Sample food and wines from around the world, with live entertainment and cooking demos.' 
  },
  { 
    date: '2024-10-09', 
    name: 'Wollongong Music Festival', 
    location: 'WIN Entertainment Centre', 
    description: 'A day of live music performances from local bands and international artists.' 
  }
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
