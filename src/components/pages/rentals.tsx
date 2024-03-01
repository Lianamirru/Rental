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

const Rentals = () => {
  const [modalActive, setModalActive] = useState(false);
  const [rentalFee, setRentalFee] = useState<Number>(0);
  const [rentals, setRentals] = useState<RentalType[]>([]);

  const user = getCurrentUser();

  useEffect(() => {
    (async () => {
      const { data } = await getRentals();
      setRentals(data);
    })();
  }, []);

  const handleReturn = async (rental: RentalType) => {
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
  console.log(rentals);
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Instrument</th>
            {user?.isAdmin ? <th>Customer</th> : null}
            <th>Date Out</th>
            <th>Return Date</th>
            <th>Rental Fee</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental) => (
            <tr
              className={
                new Date(rental.dateReturned).getTime() <
                new Date().setHours(0, 0, 0, 0)
                  ? "table-warning"
                  : ""
              }
              key={rental._id}
            >
              <td>
                {rental.instrument.maker} {rental.instrument.model}{" "}
                {rental.instrument.year}
              </td>
              {user?.isAdmin ? (
                <td>
                  <Link to={"/rentals/customer/" + rental.customer._id}>
                    {rental.customer.name}
                  </Link>
                </td>
              ) : null}
              <td>{new Date(rental.dateOut).toLocaleDateString()}</td>
              <td>{new Date(rental.dateReturned).toLocaleDateString()}</td>
              <td>{rental.rentalFee.toString()}</td>
              {user?.isAdmin ? (
                <td>
                  <button
                    className=""
                    onClick={async () => {
                      await handleReturn(rental);
                      setModalActive(true);
                    }}
                  >
                    Return
                  </button>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
      <Modal active={modalActive} setActive={setModalActive}>
        <div>
          <p>Rental is returned successfully</p>
          <p>Rental Fee: {rentalFee.toString()}</p>
        </div>
      </Modal>
    </>
  );
};

export default Rentals;
