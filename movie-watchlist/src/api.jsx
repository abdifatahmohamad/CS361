export const fetchMovies = async () => {
  const response = await fetch('https://movie-suggestion-microservice.onrender.com/movies');
  const data = await response.json();
  return data;
};
