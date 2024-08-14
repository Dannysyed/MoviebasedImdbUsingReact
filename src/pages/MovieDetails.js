import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const imageUrl = data
    ? `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`
    : "https://via.placeholder.com/500x750";

  const apiKey = "YOUR_API_KEY";
  const authToken = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmNmN2RjOTM1NTQ1ODkyMGFmZTdiYjAxZDg4MTI1MCIsInN1YiI6IjY2NDMzMDlmM2E4ZjdmYmNjODc3ZjJhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cOqulLZ1t4Lb3W8wWBec90DgMVVtd-Kp8izvc7hw9mg`;
  const apiItem = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(apiItem, {
          headers: {
            Authorization: authToken,
          },
        });
        setData(response.data);
      } catch (error) {
        setError("Failed to fetch movie details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [apiItem]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!data) return <div className="no-data">No movie details available.</div>;

  return (
    <div className="movie-details">
      <div className="movie-header">
        <img className="movie-backdrop" src={imageUrl} alt={data.title} />
        <div className="movie-title-overlay">
          <h1 className="movie-title">{data.title}</h1>
          <p className="movie-tagline">{data.tagline}</p>
        </div>
      </div>
      <div className="movie-info">
        <div className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
            alt={data.title}
          />
        </div>
        <div className="movie-details-info">
          <p className="movie-overview">{data.overview}</p>
          <div className="movie-extra-info">
            <p className="movie-rating">Rating: {data.vote_average} / 10</p>
            <p className="movie-release-date">
              Release Date: {data.release_date}
            </p>
            <p className="movie-genres">
              Genres: {data.genres.map((genre) => genre.name).join(", ")}
            </p>
            <a
              href={`https://www.imdb.com/title/${data.imdb_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="imdb-link"
            >
              View on IMDb
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
