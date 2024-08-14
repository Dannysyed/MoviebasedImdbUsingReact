import React from "react";
import MovieCard from "./MovieCard";

function MovieList({ movies, genres = [] }) {
  const getGenreNames = (genreIds) => {
    return genreIds
      .map((id) => {
        const genre = genres.find((g) => g.id === id);
        return genre ? genre.name : null;
      })
      .filter((name) => name)
      .join(", ");
  };

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          genres={getGenreNames(movie.genre_ids)}
        />
      ))}
    </div>
  );
}

export default MovieList;
