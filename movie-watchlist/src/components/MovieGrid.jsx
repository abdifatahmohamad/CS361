// MovieGrid.jsx
import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../api';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './Modal'; // Import the Modal component
import '../Modal.css'; // Import the CSS for the Modal

function MovieGrid() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null); // State to track selected movie for modal
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate();
  const [movieId, setMovieId] = useState(null); // State to store movie id for modal

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        // Simulate delay before fetching data
        await new Promise(resolve => setTimeout(resolve, 500)); // Delay 500 milliseconds (0.5 seconds)
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
      toast.error('Movie already in the watchlist!');
    } else {
      localStorage.setItem('watchlist', JSON.stringify([...watchlist, movie]));
      toast.success('Movie added to Watchlist!');
    }
  };

  const handleAddToWatched = (movie) => {
    const watched = JSON.parse(localStorage.getItem('watched')) || [];
    if (watched.some((item) => item.id === movie.id)) {
      toast.error('Movie already in the watched list!');
    } else {
      localStorage.setItem('watched', JSON.stringify([...watched, movie]));
      toast.success('Movie added to Watched list!');
    }
  };

  const handleRecommendationsClick = () => {
    navigate('/recommendations');
  };

  // Function to handle the click event of the Details button
  const handleDetailsClick = (movie) => {
    setSelectedMovie(movie);
    setMovieId(movie.id); // Set the movieId state
    setShowModal(true); // Show the modal
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false); // Hide the modal
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
          <div className="movie-grid">
            {movies.map((movie) => (
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
                      <button className="btn btn-primary" onClick={() => handleAddToWatchlist(movie)}>
                        Add to Watchlist
                      </button>
                      <button className="btn btn-secondary" onClick={() => handleAddToWatched(movie)}>
                        Watched
                      </button>
                      {/* Open the modal on Details button click */}
                      <button className="btn btn-info" onClick={() => handleDetailsClick(movie)}>
                        Details
                      </button>
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
        </div>
      )}

      {/* Render Modal component if showModal is true */}
      <Modal isOpen={showModal} onClose={handleCloseModal} movieId={movieId}>
        {selectedMovie && (
          <div className="modal-content">
            <h2>Movie Details</h2>
            <p>Title: {selectedMovie.title}</p>
            <p>Genre: {selectedMovie.genre}</p>
            <p>Release Date: {selectedMovie.release_date}</p>
            <p>Rating: {selectedMovie.rating}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default MovieGrid;
