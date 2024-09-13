import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventList from './components/EventList';
import EventDetails from './components/EventDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/events" element={<EventList />} />
          <Route path="/events/:id" element={<EventDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
