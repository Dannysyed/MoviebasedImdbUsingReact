import React, { useEffect, useState } from "react";
import fetchMovies from "../api/fetchMovies";
import MovieList from "../components/MovieList";
import "./Home.css"; // Assuming you have a CSS file for Home styles

function Home() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const { movies, genres } = await fetchMovies();
        setMovies(movies);
        setGenres(genres);
      } catch (error) {
        setError("Failed to fetch movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home">
      <header className="home-header">
        <h1 className="home-title">Popular Movies</h1>
      </header>
      <main className="home-content">
        <MovieList movies={movies} genres={genres} />
      </main>
      <footer className="home-footer">
        <p>© {new Date().getFullYear()} Movie App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
