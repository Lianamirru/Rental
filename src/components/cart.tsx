import { useEffect, useState } from "react";
import {
  CartItemType,
  deleteFromCart,
  getCartItems,
} from "../services/cartServise";
import { InstrumentType } from "../types/instrumentType";
import { toast } from "react-toastify";
import { logger } from "../services/logService";
import Modal from "./common/modal/modal";
import RentalForm from "./rentalForm";
import ProtectedRoute from "./common/protectedRoute";

const Cart = () => {
  const [cartItems, setItems] = useState<CartItemType[]>([]);

  const [modalActive, setModalActive] = useState(false);
  const [instrument, setInstrument] = useState<InstrumentType | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await getCartItems();
      setItems(data);
    })();
  }, []);

  const handleRent = (instrument: InstrumentType) => {
    setInstrument(instrument);
    setModalActive(true);
  };

  const handleDelete = async (instrumentId: String) => {
    const originalCartItems = cartItems;

    setItems((prevCartItems) =>
      prevCartItems.filter((item) => item.instrument._id !== instrumentId)
    );

    try {
      await deleteFromCart(instrumentId);
    } catch (ex: any) {
      if (ex.response && ex.response.status === 404) {
        toast.error("cartItem has already been deleted");
        setItems(originalCartItems);
      } else {
        logger(ex);
      }
    }
  };

  return (
    <div className="cart">
      <h2>Cart</h2>
      <div className="cart__heading">
        <h3>Instrument</h3>
        <h3>Price</h3>
      </div>
      {cartItems.length >= 1
        ? cartItems.map((item) => (
            <CartItem
              key={item._id}
              item={item.instrument}
              onDelete={() => handleDelete(item.instrument._id)}
              onRent={() => handleRent(item.instrument)}
            />
          ))
        : null}
      <Modal active={modalActive} setActive={setModalActive}>
        <ProtectedRoute>
          <RentalForm instrument={instrument} />
        </ProtectedRoute>
      </Modal>
    </div>
  );
};

export default Cart;

type CartItemProps = {
  item: InstrumentType;
  onDelete: () => void;
  onRent: () => void;
};
const CartItem = ({ item, onRent, onDelete }: CartItemProps) => {
  const { _id, maker, model, year, monthlyRentalPrice } = item;
  return (
    <div className="cart-item">
      <h4>
        {maker} {model} {year}
      </h4>
      <div className="cart-item__info">
        <h4>${monthlyRentalPrice}</h4>
        <div>
          <button className="cart-item__rent" onClick={onRent}>
            Rent
          </button>
          <button className="cart-item__delete" onClick={onDelete}>
            <i className="fa fa-trash " aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
