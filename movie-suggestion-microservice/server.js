const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser'); // Import body-parser
const app = express();
const cors = require('cors');
app.use(cors());

const moviesData = fs.readFileSync('movies.json');
const movies = JSON.parse(moviesData);

// Welcome route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Movie Suggestion Microservice!');
});

app.get('/movies', (req, res) => {
    res.json(movies);
});

app.get('/movies/:id', (req, res) => {
    const movieId = parseInt(req.params.id);
    const movie = movies.find(movie => movie.id === movieId);

    if (movie) {
        res.json(movie);
    } else {
        res.status(404).json({ error: 'Movie not found' });
    }
});

// New endpoint for searching movies by genre
app.get('/search', (req, res) => {
    const genreQuery = req.query.genre;

    if (!genreQuery) {
        res.status(400).json({ error: 'Genre parameter is required' });
        return;
    }

    const matchingMovies = movies.filter(movie => movie.genre.toLowerCase() === genreQuery.toLowerCase());

    if (matchingMovies.length > 0) {
        res.json(matchingMovies);
    } else {
        res.status(404).json({ error: 'No movies found for the specified genre' });
    }
});

// Use body-parser to parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
