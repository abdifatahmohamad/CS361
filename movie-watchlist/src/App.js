import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MovieGrid from './components/MovieGrid';
import Footer from './components/Footer';
import Recommendations from './components/Recommendations';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<MovieGrid />} />
          <Route path="/recommendations" element={<Recommendations />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
