import { Link } from "react-router-dom";

import { InstrumentType } from "../types/instrumentType";
import Likes from "./common/likes";

import instrumentPhoto from "../images/instrument.png";
import { getCurrentUser } from "../services/authService";
import { addToCart } from "../services/cartServise";
import { toast } from "react-toastify";
import { logger } from "../services/logService";
import { useState } from "react";

type ProductsProps = {
  products: InstrumentType[];
  onLike: () => void;
};

type ProductProps = {
  product: InstrumentType;
  onLike: (product: InstrumentType) => void;
};

const Product = ({ product, onLike }: ProductProps) => {
  const [cartModal, setCartModal] = useState(false);
  const user = getCurrentUser();

  const handleAddToCart = async (productId: String) => {
    if (!user) {
      setCartModal(true);
    } else {
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

  return (
    <div className="instrument-card" key={product._id}>
      <Likes onClick={() => onLike(product)} like={product.like} />
      <Link to={`/instruments/${product._id}`}>
        <img src={instrumentPhoto} alt={product.model}></img>
      </Link>
      <div>
        <h3>
          {product.maker} {product.model}
        </h3>
        <p>{product.monthlyRentalPrice}$ per month</p>
        {/* <div className="button-container"> */}
        <button
          className="add-to-cart"
          onClick={() => handleAddToCart(product._id)}
        >
          +
        </button>
        {/* </div> */}
      </div>
    </div>
  );
};

const ProductsList = ({ products, onLike }: ProductsProps) => {
  return (
    <div id="products">
      {products.map((product) => (
        <Product product={product} onLike={onLike} key={product._id} />
      ))}
    </div>
  );
};

export default ProductsList;
