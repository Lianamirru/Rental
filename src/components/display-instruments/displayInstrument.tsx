import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Likes from "../common/likes";

import instrumentPhoto from "../../images/instrument.png";
import { InstrumentType } from "../../types/instrumentType";

import { getCurrentUser } from "../../services/authService";
import { addToCart, deleteFromCart } from "../../services/cartServise";
import { logger } from "../../services/logService";

type ProductProps = {
  product: InstrumentType;
  onLike: (instrumentId: string) => void;
  onAddToCart: (instrumentId: string) => void;
  onDeleteFromCart: (instrumentId: string) => void;
  cartItemsIds: String[];
};

const Product = ({
  product,
  onLike,
  onAddToCart,
  onDeleteFromCart,
  cartItemsIds,
}: ProductProps) => {
  const user = getCurrentUser();

  const handleAddToCart = async (productId: String) => {
    onAddToCart(product._id);
    if (user) {
      try {
        await addToCart(product._id);
      } catch (ex: any) {
        if (ex.response && ex.response.status === 404) {
          toast.error("unable to handle adding to cart");
        } else {
          logger(ex);
        }
      }
    }
  };

  const handleDeleteFromCart = async (productId: String) => {
    onDeleteFromCart(product._id);
    try {
      await deleteFromCart(product._id);
    } catch (ex: any) {
      if (ex.response && ex.response.status === 404) {
        toast.error("unable to handle deleting from cart");
      } else {
        logger(ex);
      }
    }
  };

  return (
    <div className="instrument-card" key={product._id}>
      <Likes onClick={() => onLike(product._id)} like={product.like} />
      <Link to={`/instruments/${product._id}`}>
        <img src={instrumentPhoto} alt={product.model}></img>
      </Link>
      <h3>
        {product.maker} {product.model}
      </h3>
      <p>{product.monthlyRentalPrice}$ per month</p>
      {cartItemsIds.includes(product._id) ? (
        <button
          className="instrument-card__action delete-from-cart"
          onClick={() => handleDeleteFromCart(product._id)}
        >
          <i className="fa fa-trash " aria-hidden="true"></i>
        </button>
      ) : (
        <button
          className="instrument-card__action add-to-cart"
          onClick={() => handleAddToCart(product._id)}
        >
          <i className="fa fa-plus" aria-hidden="true"></i>
        </button>
      )}
    </div>
  );
};

export default Product;
