import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../api';

function MovieGrid() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data.slice(0, 6)); // Limit to 6 movies
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovieData();
  }, []);

  return (
    <div className="movie-grid-container">
      <div className="movie-grid">
        {movies.map(movie => (
          <div className="movie-card" key={movie.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Movie {movie.id}</h5>
                <p className="card-text">Movie Title: {movie.title}</p>
                <p className="card-text">Movie Genre: {movie.genre}</p>
                <div className="button-group">
                  <button className="btn btn-primary">Add to Watchlist</button>
                  <button className="btn btn-secondary">Watched</button>
                  <button className="btn btn-info">Details</button>
                  <button className="btn btn-success">Recommendations</button>
                  <button className="btn btn-warning">Similar Movies</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieGrid;
