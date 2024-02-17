import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import Input from "./common/input";
import SelectInput from "./common/selectInput";
import Button from "./common/formButton";
import Calendar, { RangeType } from "./common/calendar/calendar";
import PhoneInput from "./common/phoneInput";

import { validateProperty, validateAll } from "../services/validateForm";
import schema from "./schemas/rentalFormSchema";

import { getMovies } from "../services/movieService";
import {
  editCustomer,
  getCustomer,
  saveCustomer,
} from "../services/userService";
import { getRentedDates, saveRental } from "../services/rentalService";
import { getCurrentUser } from "../services/authService";

import { MovieType } from "../types/movieType";
import { getDisabledDates } from "./common/calendar/getDisabledDates";
import { getFirstFreeDay } from "./common/calendar/getFirstFreeDay";
import { useRentals } from "../context/RentalsContext";

const RentalForm = ({ movie }: { movie: MovieType | null }) => {
  const [movies, setMovies] = useState<MovieInRental[]>([]);
  const [data, setData] = useState({
    movieId: "",
    customerName: "",
  });
  const [phone, setPhone] = useState("");

  const [rentedDates, setRentedDates] = useState<Date[]>([]);
  const [range, setRange] = useState<RangeType[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [errors, setErrors] = useState({
    customerName: "",
    phone: "",
    movieId: "",
  });
  const [isSaved, setIsSaved] = useState(false);

  const movieId = movie?._id;
  const userId = getCurrentUser()?._id;

  const { rentals, updateRentals } = useRentals();

  useEffect(() => {
    (async () => {
      const { data: moviesData } = await getMovies();
      const movies: MovieInRental[] = [];
      moviesData.forEach((movie) =>
        movies.push({ _id: movie._id.toString(), name: movie.title })
      );
      setMovies(movies);

      if (userId) {
        const { data: customer } = await getCustomer(userId);
        if (customer) {
          const { name: customerName, phone } = customer;
          setData((data) => ({ ...data, customerName }));
          setPhone(phone);
        }
      }

      setData((data) => ({ ...data, movieId: movieId ?? "" }));

      if (movieId) {
        const { data } = await getRentedDates(movieId);
        const rentedPeriods = data.map((rental) => {
          const startDate = new Date(rental.dateOut);
          startDate.setHours(0, 0, 0, 0);
          const endDate = new Date(rental.dateReturned);
          endDate.setHours(0, 0, 0, 0);

          return { startDate, endDate };
        });
        const rentedDates = getDisabledDates(rentedPeriods);
        setRentedDates(rentedDates);
        const firstFreeDay = getFirstFreeDay(rentedDates);
        setRange([
          {
            startDate: firstFreeDay,
            endDate: firstFreeDay,
            key: "selection",
          },
        ]);
      }
    })();
    setIsSaved(false);
  }, [movieId, userId]);

  const validateInput = (name: string, value: string) => {
    const nameKey = name as DataTypeKeys;

    const updatedErrors = { ...errors };
    const errorMessage = validateProperty(schema, { name, value });
    if (errorMessage) updatedErrors[nameKey] = errorMessage;
    else delete updatedErrors[nameKey];
    setErrors(updatedErrors);
  };

  const handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = target;
    const nameKey = name as DataTypeKeys;

    const updatedData = { ...data };
    updatedData[nameKey] = value;
    setData(updatedData);

    validateInput(name, value);
  };

  const renderInput = (
    name: DataTypeKeys,
    label: string,
    type: "text" | "number" | "tel"
  ) => {
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        onChange={handleChange}
        error={errors[name]}
      />
    );
  };

  function renderSelectInput<T extends MovieInRental>(
    name: DataTypeKeys,
    label: string,
    options: T[]
  ): JSX.Element {
    return (
      <SelectInput
        name={name}
        label={label}
        value={data[name]}
        onChange={handleChange}
        error={errors[name]}
        options={options}
      />
    );
  }

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { customerName, movieId } = data;

    const { data: customer } = await getCustomer(userId);
    let customerId: string;
    if (!customer) {
      const { data } = await saveCustomer(userId, customerName, phone);
      customerId = data;
    } else {
      customerId = customer._id;
      if (customer.name !== customerName || customer.phone !== phone) {
        await editCustomer(customer._id, userId, customerName, phone);
      }
    }
    const { startDate: dateOut, endDate: dateReturned } = range[0];
    try {
      const { data: rental } = await saveRental(
        customerId,
        movieId,
        dateOut,
        dateReturned
      );
      setIsSaved(true);
      updateRentals(rental);
    } catch (ex) {}
  };

  const handleDateSelect = (item: { selection: RangeType }) => {
    const range = [item.selection];
    setRange(range);
  };

  return isSaved ? (
    <>
      <p>Rental saved successfully!</p>
      <button
        className="btn btn-primary"
        onClick={() => {
          setIsSaved(false);
          navigate("/");
        }}
      >
        New Rental
      </button>
    </>
  ) : (
    <form onSubmit={handleSubmit}>
      <h1>Rental Form</h1>
      {renderInput("customerName", "Name", "text")}
      <PhoneInput
        phone={phone}
        onChange={(value) => {
          setPhone(value || "");
          validateInput("phone", value?.toString() || "");
        }}
        error={errors["phone"]}
      />
      <Calendar
        range={range}
        onChange={handleDateSelect}
        disabledDates={rentedDates}
      />
      {renderSelectInput<MovieInRental>("movieId", "Movie", movies)}
      <Button
        label="Save"
        disabled={!!validateAll(schema, { ...data, phone })}
      />
    </form>
  );
};

export default RentalForm;

type DataTypeKeys = keyof {
  movieId: string;
  customerName: string;
};

type MovieInRental = { _id: string; name: string };

export type RentedDates = {
  dateOut: Date;
  dateReturned: Date;
}[];
