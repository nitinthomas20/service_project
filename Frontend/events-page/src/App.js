import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import EventsPage from './pages/EventsPage';
import UpcomingEventsPage from './pages/UpcomingEventsPage';

const App = () => {
  return (
    <Router>
      <div style={styles.container}>
        <nav style={styles.navbar}>
          <NavLink to="/" style={styles.link} activeStyle={styles.activeLink} exact>
            Events
          </NavLink>
          <NavLink to="/upcoming" style={styles.link} activeStyle={styles.activeLink}>
            Upcoming Events
          </NavLink>
        </nav>
        <div style={styles.content}>
          <Routes>
            <Route path="/" element={<EventsPage />} />
            <Route path="/upcoming" element={<UpcomingEventsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
    backgroundColor: '#f7f8fa',
    display: 'flex',
    flexDirection: 'column',
  },
  navbar: {
    padding: '15px 20px',
    backgroundColor: '#007bff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  link: {
    margin: '0 15px',
    textDecoration: 'none',
    color: '#fff',
    fontSize: '16px',
    transition: 'color 0.3s',
  },
  activeLink: {
    fontWeight: 'bold',
    borderBottom: '2px solid #fff',
  },
  content: {
    padding: '20px',
    flex: 1,
  },
};

export default App;
