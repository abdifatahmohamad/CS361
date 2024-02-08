// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MovieGrid from './components/MovieGrid';
import Footer from './components/Footer';
import Recommendations from './components/Recommendations';
import Watchlist from './components/Watchlist'; // Import Watchlist component
import LoadingSpinner from './components/LoadingSpinner'; // Import the LoadingSpinner component
import withLoadingSpinner from './components/WithLoadingSpinner'; // Import the withLoadingSpinner HOC
import './styles.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<MovieGrid />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/watchlist" element={<Watchlist />} /> {/* Add Watchlist route */}
          {/* Add more routes here */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default withLoadingSpinner(App); // Wrap the App component with withLoadingSpinner HOC
