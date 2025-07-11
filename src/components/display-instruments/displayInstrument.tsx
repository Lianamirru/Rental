import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Buffer } from "buffer";
import { InstrumentType } from "../../types/instrumentType";
import Likes from "./likes";
import { getCurrentUser } from "../../services/authService";
import { addToCart, deleteFromCart } from "../../services/cartServise";
import { logger } from "../../services/logService";

type ProductProps = {
  product: InstrumentType;
  onLike: (instrumentId: string) => void;
  onAddToCart: (instrumentId: string) => void;
  onDeleteFromCart: (instrumentId: string) => void;
  cartItemsIds: string[];
};

const Product = ({
  product,
  onLike,
  onAddToCart,
  onDeleteFromCart,
  cartItemsIds,
}: ProductProps) => {
  const user = getCurrentUser();

  const handleAddToCart = async (productId: string) => {
    onAddToCart(productId);
    if (user) {
      try {
        await addToCart(productId);
      } catch (ex: any) {
        if (ex.response && ex.response.status === 404) {
          toast.error("unable to handle adding to cart");
        } else {
          logger(ex);
        }
      }
    }
  };

  const handleDeleteFromCart = async (productId: string) => {
    onDeleteFromCart(productId);
    try {
      await deleteFromCart(productId);
    } catch (ex: any) {
      if (ex.response && ex.response.status === 404) {
        toast.error("unable to handle deleting from cart");
      } else {
        logger(ex);
      }
    }
  };

  const buffer = Buffer.from(product.image.data);
  const instrumentPhoto = `data:${
    product.image.contentType
  };base64,${buffer.toString("base64")}`;

  return (
    <div className="instrument-card" key={product._id}>
      <Likes onClick={() => onLike(product._id)} like={product.like} />
      <Link
        onClick={() => window.scrollTo(0, 0)}
        to={`/instruments/${product._id}`}
      >
        <img
          className="instrument-photo"
          src={instrumentPhoto}
          alt={product.model}
        ></img>
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
          <i className="fa fa-trash" aria-hidden="true"></i>
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
