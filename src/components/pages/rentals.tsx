import { useEffect, useState } from "react";

import Modal from "../common/modal";
import Rental from "../page-item/rental";

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

  if (!rentals.length) return <p>No rented instruments</p>;
  return (
    <div>
      <h2 className="display-items__heading">Rented Instruments</h2>
      <div className="grid rentals-grid">
        <h3>Instrument</h3>
        <h3>Date Out</h3>
        <h3>Return Date</h3>
        <h3>Rental Fee</h3>
        {user?.isAdmin ? <h3>Customer</h3> : <h3></h3>}
        <h3></h3>
        {rentals.map((rental) => (
          <Rental
            key={rental._id}
            rental={rental}
            onReturn={() => handleReturn(rental)}
          />
        ))}
      </div>
      <div onClick={() => setModalActive(!modalActive)}>
        <Modal
          active={modalActive}
          handleClick={() => setModalActive(!modalActive)}
        >
          <p>Rental is returned successfully</p>
          <p>Rental Fee: {rentalFee.toFixed(2).toString()}</p>
        </Modal>
      </div>
    </div>
  );
};

export default Rentals;
