import React from 'react';
import EventCard from '../components/EventCard.js';

const events = [
  { 
    date: '2024-09-20', 
    name: 'Art Exhibition: Modern Perspectives', 
    location: 'Art Gallery of Wollongong', 
    description: 'Explore contemporary art pieces from emerging artists.' 
  },
  { 
    date: '2024-09-21', 
    name: 'Wollongong Food Festival', 
    location: 'Lang Park', 
    description: 'A gastronomic journey featuring local delicacies, food trucks, and live music.' 
  },
  { 
    date: '2024-09-22', 
    name: 'Coding Bootcamp for Beginners', 
    location: 'University of Wollongong', 
    description: 'A hands-on workshop to learn the basics of coding and web development.' 
  },
  { 
    date: '2024-09-23', 
    name: 'Yoga and Wellness Retreat', 
    location: 'Wollongong Botanical Gardens', 
    description: 'A day of relaxation with yoga, meditation, and wellness workshops.' 
  },
  { 
    date: '2024-09-24', 
    name: 'Jazz Night at The Brewery', 
    location: 'Wollongong Brewery', 
    description: 'An evening of live jazz performances with local bands and artists.' 
  },
  { 
    date: '2024-09-25', 
    name: 'Startup Pitch Night', 
    location: 'Innovation Campus, Wollongong', 
    description: 'Watch local startups pitch their ideas to a panel of investors and industry experts.' 
  },
  { 
    date: '2024-09-26', 
    name: 'Coastal Cleanup Drive', 
    location: 'North Wollongong Beach', 
    description: 'Join us in cleaning up the coastline and preserving our beautiful beaches.' 
  },
  { 
    date: '2024-09-27', 
    name: 'Wollongong Marathon 2024', 
    location: 'Stuart Park', 
    description: 'Participate in the annual marathon with routes for all ages and abilities.' 
  },
  { 
    date: '2024-09-28', 
    name: 'Farmers Market and Craft Fair', 
    location: 'Crown Street Mall', 
    description: 'Shop for fresh produce, handmade crafts, and enjoy local performances.' 
  }
];


const EventsPage = () => {
  return (
    <div style={styles.container}>
      {events.map((event, index) => (
        <EventCard key={index} date={event.date} name={event.name} />
      ))}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
};

export default EventsPage;
