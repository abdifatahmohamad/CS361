// Watchlist.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = (movie) => {
    if (watchlist.some((item) => item.id === movie.id)) {
      alert('Movie already in the watchlist!');
    } else {
      setWatchlist([...watchlist, movie]);
    }
  };

  return (
    <div className="movie-grid-container">
      <h2 className="watchlist-heading">Watchlist</h2>
      {watchlist.length === 0 ? (
        <p className="empty-watchlist">Your watchlist is empty. <Link to="/">Discover some movies!</Link></p>
      ) : (
        <div className="movie-grid">
          {watchlist.map(movie => (
            <div className="movie-card" key={movie.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Movie {movie.id}</h5>
                  <p className="card-text">Movie Title: {movie.title}</p>
                  <p className="card-text">Genre: {movie.genre}</p>
                  <p className="card-text">Release Date: {movie.release_date}</p>
                  <p className="card-text">Rating: {movie.rating}</p>
                  <div className="button-group">
                    <button className="btn btn-danger disabled">Added to Watchlist</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;
