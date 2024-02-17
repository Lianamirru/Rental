import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getMovie } from "../services/movieService";
import { logger } from "../services/logService";

import { MovieType } from "../types/movieType";

const MoviePage = () => {
  const [movie, setMovie] = useState<MovieType | null>(null);

  const { id: movieId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        if (movieId) {
          const { data } = await getMovie(movieId);
          setMovie(data);
        }
      } catch (ex: any) {
        if (ex.response && ex.response.status === 404) {
          navigate("/notFound");
        } else {
          logger(ex);
        }
      }
    })();
  }, [movieId, navigate]);

  return (
    <main className="container">
      <h1> {movie?.title}</h1>
      <div className="row">
        <div className="col">img</div>
        <div className="col">
          <p> description</p>
        </div>
      </div>
      <div>reviews</div>
    </main>
  );
};

export default MoviePage;
