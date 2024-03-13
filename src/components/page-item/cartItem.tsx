import { InstrumentType } from "../../types/instrumentType";

type CartItemProps = {
  item: InstrumentType;
  onDelete: () => void;
  onRent: () => void;
};

const CartItem = ({ item, onRent, onDelete }: CartItemProps) => {
  const { maker, model, year, monthlyRentalPrice } = item;
  return (
    <>
      <div>
        {maker} {model} {year}
      </div>
      <div>${monthlyRentalPrice}</div>
      <div className="cart-buttons">
        <button className="btn" onClick={onRent}>
          rent
        </button>
        <button className="btn--delete" onClick={onDelete}>
          <i className="fa fa-trash " aria-hidden="true"></i>
        </button>
      </div>
    </>
  );
};

export default CartItem;
