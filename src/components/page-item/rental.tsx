import { Link } from "react-router-dom";
import { RentalType } from "../../services/rentalService";
import { getCurrentUser } from "../../services/authService";

type RentalProps = {
  rental: RentalType;
  onReturn: (rental: RentalType) => void;
};

const user = getCurrentUser();

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

      <div className={getClassName()}>
        {new Date(dateOut).toLocaleDateString()}
      </div>
      <div className={getClassName()}>
        {new Date(dateReturned).toLocaleDateString()}
      </div>
      <div className={getClassName()}>{String(rentalFee.toFixed(2))}$</div>
      {user?.isAdmin ? (
        <>
          <div className={getClassName()}>
            <Link
              className="customer-link"
              to={"/rentals/customer/" + customer._id}
            >
              {customer.name}
            </Link>
          </div>
          <button className="btn" onClick={() => onReturn(rental)}>
            return
          </button>
        </>
      ) : (
        <>
          <div></div>
          <div></div>
        </>
      )}
    </>
  );
};

export default Rental;
