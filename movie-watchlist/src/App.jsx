// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MovieGrid from './components/MovieGrid';
import Footer from './components/Footer';
import Recommendations from './components/Recommendations';
import Watchlist from './components/Watchlist';
import Watched from './components/Watched'; // Import Watched component
import LoadingSpinner from './components/LoadingSpinner';
import withLoadingSpinner from './components/WithLoadingSpinner';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<MovieGrid />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/watched" element={<Watched />} /> {/* Add Watched route */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default withLoadingSpinner(App);
