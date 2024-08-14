import React from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css"; // Assuming you have a CSS file for MovieCard styles

function MovieCard({ movie, genres }) {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-rating">Rating: {movie.vote_average}</p>
        <p className="movie-genres">Genres: {genres}</p>
      </Link>
    </div>
  );
}

export default MovieCard;
