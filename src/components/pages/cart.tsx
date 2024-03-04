import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import RentalForm from "../forms/rentalForm";
import Modal from "../common/modal";

import {
  CartItemType,
  deleteFromCart,
  getCartItems,
} from "../../services/cartServise";
import { logger } from "../../services/logService";
import { InstrumentType } from "../../types/instrumentType";

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
    <div className="display-items">
      {cartItems.length ? (
        <>
          <h2 className="display-items__heading">Cart</h2>
          <div className="grid cart-grid">
            <h3>Instrument</h3>
            <h3>Price</h3>
            <h3></h3>
            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                item={item.instrument}
                onDelete={() => handleDelete(item.instrument._id)}
                onRent={() => handleRent(item.instrument)}
              />
            ))}
          </div>
        </>
      ) : (
        <p>No cart items</p>
      )}
      <Modal active={modalActive} setActive={setModalActive}>
        <RentalForm instrument={instrument} />
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
