// Modal.jsx
import React, { useState, useEffect } from 'react';
import '../Modal.css'; // Import CSS for styling

function Modal({ isOpen, onClose, movieId }) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://movie-suggestion-microservice.onrender.com/movies/${movieId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched movie details:', data);
        setMovieDetails(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
      setLoading(false);
    };
  
    if (isOpen && movieId) {
      console.log('Fetching movie details...');
      fetchMovieDetails();
    }
  }, [isOpen, movieId]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>X</button>
        <div className="modal-content">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <h2>Movie Details</h2>
              {movieDetails ? (
                <div>
                  <p><strong>Details:</strong> {movieDetails.details}</p>
                  <p><strong>Similar Movies:</strong> {movieDetails.similar_movies.join(', ')}</p>
                </div>
              ) : (
                <p>No details available for this movie.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
