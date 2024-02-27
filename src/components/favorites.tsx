import { useEffect, useState } from "react";
import {
  CartItemType,
  addToCart,
  deleteFromCart,
  getCartItems,
} from "../services/cartServise";
import { InstrumentType } from "../types/instrumentType";
import { useInstrumentsReducer } from "../reducer/instrumentsReducer";
import { toast } from "react-toastify";
import { logger } from "../services/logService";
import { getLikedInstruments } from "../services/likeService";

const Favorites = () => {
  const [favorites, setFavorites] = useState<String[]>([]);
  console.log("rer");
  useEffect(() => {
    (async () => {
      const { data } = await getLikedInstruments();
      setFavorites(data);
    })();
  }, []);

  //   const handleBuy = async (itemId: String) => {
  //     // try {
  //     //   await addToCart(itemId);
  //     // } catch (ex: any) {
  //     //   if (ex.response && ex.response.status === 404) {
  //     //     toast.error("unable to handle adding to cart");
  //     //   } else {
  //     //     logger(ex);
  //     //   }
  //     // }
  //     // setItems([...cartItems, item]);
  //   };

  return (
    <div className="cart">
      {/* <h2>Favourites</h2>
       <div className="cart__heading">
         <h3>Instrument</h3>
         <h3>Price</h3>
       </div>
       {favorites.length >= 1 */}
      {/* //         ? favorites.map((item) => ( */}
      {/* //             <CartItem */}
      {/* //               key={item._id}
//               item={item.instrument}
//               onBuy={() => handleBuy(item._id)}
//               onDelete={() => handleDelete(item.instrument._id)}
//             />
//           ))
//         : null} */}
    </div>
  );
};

export default Favorites;

// type CartItemProps = {
//   item: InstrumentType;
//   onBuy: () => void;
//   onDelete: () => void;
// };
// const CartItem = ({ item, onBuy, onDelete }: CartItemProps) => {
//   console.log(item);
//   const { _id, maker, model, year, monthlyRentalPrice } = item;
//   return (
//     <div className="cart-item">
//       <h4>
//         {maker} {model} {year}
//       </h4>
//       <div className="cart-item__info">
//         <h4>${monthlyRentalPrice}</h4>
//         <div>
//           <button className="cart-item__rent">Rent</button>
//           <button className="cart-item__delete" onClick={onDelete}>
//             <i className="fa fa-trash " aria-hidden="true"></i>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
