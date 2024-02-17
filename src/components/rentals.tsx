import { useEffect, useState } from "react";
import {
  RentalType,
  deleteRental,
  getRentals,
} from "../services/rentalService";
import { getCurrentUser } from "../services/authService";
import { Link } from "react-router-dom";
import { postReturn } from "../services/returnService";
import Modal from "./common/modal/modal";

const Rentals = () => {
  const [modalActive, setModalActive] = useState(false);
  const [rentalFee, setRentalFee] = useState<Number>(0);

  const user = getCurrentUser();
  const [rentals, setRentals] = useState<RentalType[] | []>([]);
  useEffect(() => {
    (async () => {
      const { data: rentals } = await getRentals();
      setRentals(rentals);
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

  console.log(rentalFee);
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Movie</th>
            {user?.isAdmin ? <th>Customer</th> : null}
            <th>Date Out</th>
            <th>Date Returned</th>
            <th>Rental Fee</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental, index) => (
            <tr
              className={
                new Date(rental.dateReturned).getTime() <
                new Date().setHours(0, 0, 0, 0)
                  ? "table-warning"
                  : ""
              }
              key={rental._id}
            >
              <td>{rental.movie.title}</td>
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
                    className="btn btn-primary btn-sm"
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
