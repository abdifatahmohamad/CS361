// MovieGrid.jsx
import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../api';
import { useNavigate } from 'react-router-dom';

function MovieGrid() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data.slice(0, 6));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchMovieData();
  }, []);

  const handleAddToWatchlist = (movie) => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    if (watchlist.some((item) => item.id === movie.id)) {
      alert('Movie already in the watchlist!');
    } else {
      localStorage.setItem('watchlist', JSON.stringify([...watchlist, movie]));
      alert('Movie added to Watchlist!');
    }
  };

  const handleRecommendationsClick = () => {
    navigate('/recommendations');
  };

  return (
    <div className="movie-grid-container">
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Movie {movie.id}</h5>
                  <p className="card-text">Movie Title: {movie.title}</p>
                  <p className="card-text">Genre: {movie.genre}</p>
                  <p className="card-text">Release Date: {movie.release_date}</p>
                  <p className="card-text">Rating: {movie.rating}</p>
                  <div className="button-group">
                    <button className="btn btn-primary" onClick={() => handleAddToWatchlist(movie)}>
                      Add to Watchlist
                    </button>
                    <button className="btn btn-secondary">Watched</button>
                    <button className="btn btn-info">Details</button>
                    <button className="btn btn-success" onClick={handleRecommendationsClick}>
                      Recommendations
                    </button>
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

export default MovieGrid;
