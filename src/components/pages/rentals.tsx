import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Modal from "../common/modal";

import {
  RentalType,
  deleteRental,
  getRentals,
} from "../../services/rentalService";
import { getCurrentUser } from "../../services/authService";
import { postReturn } from "../../services/returnService";

const user = getCurrentUser();

const Rentals = () => {
  const [modalActive, setModalActive] = useState(false);
  const [rentalFee, setRentalFee] = useState<Number>(0);
  const [rentals, setRentals] = useState<RentalType[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await getRentals();
      setRentals(data);
    })();
  }, []);

  const handleReturn = async (rental: RentalType) => {
    setModalActive(true);
    const originalRentals = [...rentals];
    const updatedRentals = rentals.filter((rent) => rent._id !== rental._id);
    setRentals(updatedRentals);
    try {
      await deleteRental(rental._id);
      const { data: returnedRental } = await postReturn(rental);
      setRentalFee(returnedRental.rentalFee);
    } catch (ex) {
      setRentals(originalRentals);
    }
  };

  return (
    <div>
      {rentals.length ? (
        <>
          <h2 className="display-items__heading">Rented Instruments</h2>
          <div className="grid rentals-grid">
            <h3>Instrument</h3>
            {user?.isAdmin ? <h3>Customer</h3> : null}
            <h3>Date Out</h3>
            <h3>Return Date</h3>
            <h3>Rental Fee</h3>
            <h3></h3>
            {rentals.map((rental) => (
              <Rental
                key={rental._id}
                rental={rental}
                onReturn={() => handleReturn(rental)}
              />
            ))}
          </div>
        </>
      ) : (
        <p>No cart items</p>
      )}
      <Modal active={modalActive} setActive={setModalActive}>
        <div className="">
          <p>Rental is returned successfully</p>
          <p>Rental Fee: {rentalFee.toFixed(2).toString()}</p>
        </div>
      </Modal>
    </div>
  );
};

type RentalProps = {
  rental: RentalType;
  onReturn: (rental: RentalType) => void;
};

const Rental = ({ rental, onReturn }: RentalProps) => {
  const { customer, rentalFee, dateOut, dateReturned } = rental;
  const { maker, model, year } = rental.instrument;

  const getClassName = () => {
    return new Date(dateReturned).getTime() < new Date().setHours(0, 0, 0, 0)
      ? "table-warning"
      : "";
  };

  return (
    <>
      <div className={getClassName()}>
        {maker} {model} {year}
      </div>
      {user?.isAdmin ? (
        <div className={getClassName()}>
          <Link
            className="customer-link"
            to={"/rentals/customer/" + customer._id}
          >
            {customer.name}
          </Link>
        </div>
      ) : null}

      <div className={getClassName()}>
        {new Date(dateOut).toLocaleDateString()}
      </div>
      <div className={getClassName()}>
        {new Date(dateReturned).toLocaleDateString()}
      </div>
      <div className={getClassName()}>{String(rentalFee.toFixed(2))}$</div>
      {user?.isAdmin ? (
        <button className="btn" onClick={() => onReturn(rental)}>
          return
        </button>
      ) : null}
    </>
  );
};

export default Rentals;
