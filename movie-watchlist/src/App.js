import React from 'react';
import Navbar from './components/Navbar';
import MovieGrid from './components/MovieGrid';
import Footer from './components/Footer';
import './styles.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <MovieGrid />
      </main>
      <Footer />
    </div>
  );
}

export default App;
