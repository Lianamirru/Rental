import { Link } from "react-router-dom";

import { InstrumentType } from "../types/instrumentType";
import Likes from "./common/likes";

import instrumentPhoto from "../images/instrument.png";

type ProductsProps = {
  products: InstrumentType[];
  onLike: () => void;
};

type ProductProps = {
  product: InstrumentType;
  onLike: (product: InstrumentType) => void;
};

const Product = ({ product, onLike }: ProductProps) => {
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
        <div className="button-container">
          <button className="add-to-cart">+</button>
        </div>
      </div>
    </div>
  );
};

const ProductsList = ({ products, onLike }: ProductsProps) => {
  return (
    <div className="products">
      {products.map((product) => (
        <Product product={product} onLike={onLike} key={product._id} />
      ))}
    </div>
  );
};

export default ProductsList;
