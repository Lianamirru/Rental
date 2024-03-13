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
import { useNavigate } from "react-router-dom";
import CartItem from "../page-item/cartItem";

const Cart = () => {
  const [cartItems, setItems] = useState<CartItemType[]>([]);

  const [modalActive, setModalActive] = useState(false);
  const [instrument, setInstrument] = useState<InstrumentType | null>(null);
  console.log(instrument);

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


  if (!cartItems.length) return <p>No cart items</p>;
  return (
    <div className="display-items">
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
      <Modal
        active={modalActive}
        handleClick={() => setModalActive(!modalActive)}
      >
        {instrument && <RentalForm instrument={instrument} />}
      </Modal>
    </div>
  );
};

export default Cart;
