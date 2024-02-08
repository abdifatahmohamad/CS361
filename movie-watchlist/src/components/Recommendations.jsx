// Recommendations.jsx
import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../api';
import LoadingSpinner from './LoadingSpinner'; // Import LoadingSpinner component

function Recommendations() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading spinner

  useEffect(() => {
    const delay = setTimeout(async () => {
      try {
        const data = await fetchMovies();
        setMovies(data); // Set all movies
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false); // Set loading to false in case of error
      }
    }, 2000); // Add a delay of 2000 milliseconds (2 seconds)

    return () => clearTimeout(delay); // Clear the timeout on unmount

  }, []);

  const filteredMovies = movies.slice(6); // Exclude the first 6 movies

  return (
    <div className="movie-grid-container">
      {loading ? ( // Conditionally render spinner while loading
        <LoadingSpinner />
      ) : (
        <div className="movie-grid">
          {filteredMovies.map(movie => (
            <div className="movie-card" key={movie.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Movie {movie.id}</h5>
                  <p className="card-text">Movie Title: {movie.title}</p>
                  <p className="card-text">Genre: {movie.genre}</p>
                  <p className="card-text">Release Date: {movie.release_date}</p>
                  <p className="card-text">Rating: {movie.rating}</p>
                  <div className="button-group">
                    <button className="btn btn-primary">Add to Watchlist</button>
                    <button className="btn btn-secondary">Watched</button>
                    <button className="btn btn-info">Details</button>
                    <button className="btn btn-warning">Similar Movies</button>
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

export default Recommendations;
