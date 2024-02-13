import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    }, 500); // Add a delay of 500 milliseconds (0.5 seconds)

    return () => clearTimeout(delay); // Clear the timeout on unmount

  }, []);

  const filteredMovies = movies.slice(6); // Exclude the first 6 movies

  const handleAddToWatched = (movie) => {
    const watchedList = JSON.parse(localStorage.getItem('watched')) || [];
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    if (watchedList.some((item) => item.id === movie.id)) {
      toast.error('Movie already in the watched list!');
    } else {
      const updatedWatchedList = [...watchedList, movie];
      localStorage.setItem('watched', JSON.stringify(updatedWatchedList));
      toast.success('Movie added to Watched list!');

      // Remove from watchlist if present
      const updatedWatchlist = watchlist.filter((item) => item.id !== movie.id);
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    }
  };

  const handleAddToWatchlist = (movie) => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    if (watchlist.some((item) => item.id === movie.id)) {
      toast.error('Movie already in the watchlist!');
    } else {
      localStorage.setItem('watchlist', JSON.stringify([...watchlist, movie]));
      toast.success('Movie added to Watchlist!');
    }
  };

  return (
    <div className="movie-grid-container">
      <ToastContainer position="top-center" />
      {loading ? ( // Conditionally render spinner while loading
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
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
                    <button className="btn btn-primary" onClick={() => handleAddToWatchlist(movie)}>
                      Add to Watchlist
                    </button>
                    <button className="btn btn-secondary" onClick={() => handleAddToWatched(movie)}>
                      Watched
                    </button>
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
