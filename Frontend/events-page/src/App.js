import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import EventsPage from './pages/EventsPage';
import UpcomingEventsPage from './pages/UpcomingEventsPage';

const App = () => {
  return (
    <Router>
      <div>
        <nav style={{ padding: '10px', background: '#f0f0f0' }}>
          <Link to="/" style={{ margin: '10px' }}>Events</Link>
          <Link to="/upcoming" style={{ margin: '10px' }}>Upcoming Events</Link>
        </nav>
        <Routes>
          <Route path="/" element={<EventsPage />} />
          <Route path="/upcoming" element={<UpcomingEventsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
