import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  // Function to determine if the Home link should be active
  const isHomeActive = () => {
    return location.pathname === '/';
  };

  return (
    <nav className="navbar">
      <div className="container">
        <h1 className="logo">Movie Watchlist</h1>
        <ul className="nav-links">
          <li>
            <Link to="/" className={isHomeActive() ? 'active' : ''}>Home</Link>
          </li>
          <li>
            <Link to="/watchlist" className={location.pathname === '/watchlist' ? 'active' : ''}>Watchlist</Link>
          </li>
          <li>
            <Link to="/watched" className={location.pathname === '/watched' ? 'active' : ''}>Watched</Link>
          </li>
          <li>
            <Link to="/recommendations" className={location.pathname === '/recommendations' ? 'active' : ''}>Recommendations</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;