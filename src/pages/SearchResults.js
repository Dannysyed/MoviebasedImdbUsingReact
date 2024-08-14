import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MovieList from "../components/MovieList";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery().get("q");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=${query}`
      )
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error("There was an error searching for movies!", error);
      });
  }, [query]);

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default SearchResults;
