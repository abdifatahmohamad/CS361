import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Watched() {
  const [watched, setWatched] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedWatched = JSON.parse(localStorage.getItem('watched')) || [];
    setWatched(storedWatched);

    // Simulate loading delay
    const delay = setTimeout(() => {
      setLoading(false); // Set loading to false after delay
    }, 500); // Add a delay of 500 milliseconds (0.5 seconds)

    return () => clearTimeout(delay); // Clear the timeout on unmount
  }, []);

  const removeFromWatched = (movieId) => {
    const updatedWatched = watched.filter((movie) => movie.id !== movieId);
    setWatched(updatedWatched);
    localStorage.setItem('watched', JSON.stringify(updatedWatched));
    toast.success('Movie removed from Watched list!');
  };

  return (
    <div className="movie-grid-container">
      <ToastContainer position="top-center" />
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          <h2 className="watchlist-heading">Watched</h2>
          {watched.length === 0 ? (
            <p className="empty-watchlist">
              Your watched list is empty. <Link to="/">Discover some movies!</Link>
            </p>
          ) : (
            <div className="movie-grid">
              {watched.map((movie) => (
                <div className="movie-card" key={movie.id}>
                  <div className="card">
                    <div className="card-body">
                      {/* Movie Details */}
                    <div className="movie-details">
                      <div className="movie-card-box">
                      <h5 className="card-title">Movie {movie.id}</h5>
                      <p className="card-text">Movie Title: {movie.title}</p>
                      <p className="card-text">Genre: {movie.genre}</p>
                      <p className="card-text">Release Date: {movie.release_date}</p>
                      <p className="card-text">Rating: {movie.rating}</p>
                      </div>
                      {/* Display Movie Poster Image */}
                      <div className="movie-poster">
                        <img src={`https://movie-poster-microservice.onrender.com/${movie.id}`} alt={`Poster for ${movie.title}`} />
                      </div>
                    </div>
                      <div className="button-group">
                        {/* Do not render the "Watched" button */}
                        <button className="btn btn-info">Details</button>
                        <button className="btn btn-success">Recommendations</button>
                        <button className="btn btn-warning">Similar Movies</button>
                        <button className="btn btn-danger" onClick={() => removeFromWatched(movie.id)}>
                          Remove from Watched
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

export default Watched;
