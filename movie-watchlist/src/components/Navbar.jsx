import React from 'react';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <h1 className="logo">Movie Watchlist</h1>
        <ul className="nav-links">
          <li><a href="#" className="active">Home</a></li>
          <li><a href="#">Watchlist</a></li>
          <li><a href="#">Watched</a></li>
          <li><a href="#">Recommendations</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
