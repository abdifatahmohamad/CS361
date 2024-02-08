import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchMovies } from '../api';

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading spinner

  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlist(storedWatchlist);
    
    // Simulate loading delay
    const delay = setTimeout(() => {
      setLoading(false); // Set loading to false after delay
    }, 1000); // Add a delay of 1000 milliseconds (1 second)

    return () => clearTimeout(delay); // Clear the timeout on unmount
  }, []);

  const removeFromWatchlist = (movieId) => {
    const updatedWatchlist = watchlist.filter(movie => movie.id !== movieId);
    setWatchlist(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  };

  return (
    <div className="movie-grid-container">
      {loading ? ( // Conditionally render spinner while loading
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          <h2 className="watchlist-heading">Watchlist</h2>
          {watchlist.length === 0 ? (
            <p className="empty-watchlist">
              Your watchlist is empty. <Link to="/">Discover some movies!</Link>
            </p>
          ) : (
            <div className="movie-grid">
              {watchlist.map((movie) => (
                <div className="movie-card" key={movie.id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Movie {movie.id}</h5>
                      <p className="card-text">Movie Title: {movie.title}</p>
                      <p className="card-text">Genre: {movie.genre}</p>
                      <p className="card-text">Release Date: {movie.release_date}</p>
                      <p className="card-text">Rating: {movie.rating}</p>
                      <div className="button-group">
                        <button className="btn btn-secondary">Watched</button>
                        <button className="btn btn-info">Details</button>
                        <button className="btn btn-success">Recommendations</button>
                        <button className="btn btn-warning">Similar Movies</button>
                        <button className="btn btn-danger" onClick={() => removeFromWatchlist(movie.id)}>
                          Remove from Watchlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Watchlist;
