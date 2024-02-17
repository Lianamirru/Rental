import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { GenreType } from "../types/genreType";

import { logger } from "../services/logService";
import { deleteGenre, getGenres, saveGenre } from "./../services/genreService";

const GenresList = () => {
  const [genres, setGenres] = useState<GenreType[] | []>([]);
  const [error, setError] = useState("");
  const [disableDelete, setDisableDelete] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await getGenres();
      setGenres(data);
    })();
  }, []);

  const handleDelete = async (id: string) => {
    setDisableDelete(true);
    await deleteGenre(id).catch((ex) => {
      if (ex.response && ex.response.status === 404) {
        toast.error("no genre with given id");
      } else {
        logger(ex);
      }
    });
    setDisableDelete(false);

    const newGenres = genres?.filter((genre) => genre._id !== id);
    setGenres(newGenres);
  };

  const genreRef = useRef("");

  const handleAdd = async () => {
    let name = genreRef.current;
    if (!name) return setError("Name should be provided");
    setError("");
    const { data } = await saveGenre({ name });
    const newGenres = genres.slice();
    newGenres.push(data);
    setGenres(newGenres);
  };

  return (
    <ul className="genreList">
      <div className="form-group">
        <label htmlFor="genre"> Genre's name </label>
        <input
          id="genre"
          className="form-control"
          onChange={(e) => {
            genreRef.current = e.target.value;
          }}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
      <button
        onClick={handleAdd}
        className="btn btn-primary"
        style={{ marginBottom: 20 }}
      >
        Add New Genre
      </button>
      {genres &&
        genres.map((genre) => (
          <div className="row" key={genre._id}>
            <li className="col">{genre.name}</li>
            <button
              onClick={() => handleDelete(genre._id)}
              className="btn btn-danger btn-sm m-1"
              disabled={disableDelete}
            >
              Delete
            </button>
          </div>
        ))}
    </ul>
  );
};

export default GenresList;
