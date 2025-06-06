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
import CartItem from "../page-item/cartItem";

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
      <h2 className="display-items__heading">Cart</h2>
      <div className="grid cart-grid">
        <h3>Instrument</h3>
        <h3>Price</h3>
        <h3></h3>
        <h3></h3>
        {cartItems.length === 0 && <p>Cart is empty</p>}
        {cartItems.map((item) => (
          <CartItem
            key={item._id}
            item={item.instrument}
            onDelete={() => handleDelete(item.instrument._id)}
            onRent={() => handleRent(item.instrument)}
          />
        ))}
      </div>
      <Modal
        active={modalActive}
        handleClick={() => setModalActive(!modalActive)}
      >
        {instrument && (
          <RentalForm cartItems={cartItems} instrument={instrument} />
        )}
      </Modal>
    </div>
  );
};

export default Cart;
