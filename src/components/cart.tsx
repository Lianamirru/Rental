import { useEffect, useState } from "react";
import { CartItemType, getCartItems } from "../services/cartServise";
import { InstrumentType } from "../types/instrumentType";

const Cart = () => {
  const [cartItems, setItems] = useState<CartItemType[]>([]);
  console.log(cartItems);
  useEffect(() => {
    (async () => {
      const { data } = await getCartItems();
      setItems(data);
    })();
  }, []);

  const handleBuy = (itemId: String) => {
    console.log(`Buying item with id ${itemId}`);
  };

  const handleDelete = (itemId: String) => {
    const updatedCart = cartItems.filter((item) => item._id !== itemId);
    setItems(updatedCart);
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
              onBuy={() => handleBuy(item._id)}
              onDelete={() => handleDelete(item._id)}
            />
          ))
        : null}
    </div>
  );
};

export default Cart;

type CartItemProps = {
  item: InstrumentType;
  onBuy: () => void;
  onDelete: () => void;
};
const CartItem = ({ item, onBuy, onDelete }: CartItemProps) => {
  console.log(item);
  const { _id, maker, model, year, monthlyRentalPrice } = item;
  return (
    <div className="cart-item">
      <h4>
        {maker} {model} {year}
      </h4>
      <div className="cart-item__info">
        <h4>${monthlyRentalPrice}</h4>
        <div>
          <button className="cart-item__rent">Rent</button>
          <button className="cart-item__delete" onClick={onDelete}>
            <i className="fa fa-trash " aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
