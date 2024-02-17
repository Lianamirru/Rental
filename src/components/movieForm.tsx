import {
  useState,
  useEffect,
  useCallback,
  FormEvent,
  ChangeEvent,
} from "react";
import { NavigateFunction } from "react-router-dom";

import { useParams, useNavigate } from "react-router-dom";

import Input from "./common/input";
import SelectInput from "./common/selectInput";
import Button from "./common/formButton";

import { validateProperty, validateAll } from "../services/validateForm";
import schema from "./schemas/movieFormSchema";

import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";
import { GenreType } from "../types/genreType";
import { MovieDataType, MovieType } from "../types/movieType";
import { logger } from "../services/logService";

type DataTypeKeys = keyof MovieDataType;

const MovieForm = () => {
  const [state, setState] = useState<{
    data: MovieDataType;
    genres: GenreType[];
    errors: MovieDataType;
  }>({
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
  });

  const { data, errors, genres } = state;

  const { id: movieId } = useParams();
  const navigate = useNavigate();
  const populateMovies = usePopulateMovies(movieId, navigate);

  useEffect(() => {
    const fetchData = async () => {
      const movie = await populateMovies();
      const { data: genres } = await getGenres();
      setState((state) => ({
        ...state,
        genres,
        data: movie ? mapToViewModel(movie) : { ...state.data },
      }));
    };

    fetchData().catch((err) => console.error(err));
  }, [populateMovies]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await saveMovie(data);
    navigate("/");
  };

  const handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const updatedErrors = { ...errors };
    const updatedData = { ...data };
    const { name, value } = target;

    const errorMessage = validateProperty(schema, { name, value });

    const nameKey = name as DataTypeKeys;

    if (errorMessage) updatedErrors[nameKey] = errorMessage;
    else delete updatedErrors[nameKey];
    updatedData[nameKey] = value;
    setState({ ...state, data: updatedData, errors: updatedErrors });
  };

  const renderInput = (
    type: "text" | "password",
    name: DataTypeKeys,
    label: string
  ) => {
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={name === "_id" ? "" : data[name]}
        onChange={handleChange}
        error={name === "_id" ? "" : errors[name]}
      />
    );
  };

  const renderSelectInput = <T extends { _id: string; name: string }>(
    name: DataTypeKeys,
    label: string,
    options: T[]
  ) => {
    return (
      <SelectInput
        name={name}
        label={label}
        value={name === "_id" ? "" : data[name]}
        onChange={handleChange}
        error={name === "_id" ? "" : errors[name]}
        options={options}
      />
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Movie Form</h1>
      {renderInput("text", "title", "Title")}
      {renderSelectInput<GenreType>("genreId", "Genre", genres)}
      {renderInput("text", "numberInStock", "Number in stock")}
      {renderInput("text", "dailyRentalRate", "Rate")}
      <Button label="Save" disabled={!!validateAll(schema, data)} />
    </form>
  );
};

export default MovieForm;

function usePopulateMovies(
  movieId: string | undefined,
  navigate: NavigateFunction
) {
  return useCallback(
    async function () {
      try {
        if (movieId === "new") return;
        if (movieId) {
          const { data } = await getMovie(movieId);
          return data;
        }
      } catch (ex: any) {
        if (ex.response && ex.response.status === 404) {
          navigate("/notFound");
        } else {
          logger(ex);
        }
      }
    },
    [movieId, navigate]
  );
}

function mapToViewModel(movie: MovieType) {
  const { _id, title, genre, numberInStock, dailyRentalRate } = movie;
  return {
    _id: _id?.toString(),
    title: title,
    genreId: genre._id.toString(),
    numberInStock: numberInStock.toString(),
    dailyRentalRate: dailyRentalRate.toString(),
  };
}
