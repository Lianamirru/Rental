import Product from "./displayInstrument";
import { InstrumentType } from "../../types/instrumentType";

type ProductsProps = {
  products: InstrumentType[];
  onLike: (instrumentId: string) => void;
  onAddToCart: (instrumentId: string) => void;
  onDeleteFromCart: (instrumentId: string) => void;
  cartItemsIds: string[];
};

const ProductsList = ({
  products,
  cartItemsIds,
  onLike,
  onDeleteFromCart,
  onAddToCart,
}: ProductsProps) => {
  return (
    <div id="products">
      {products.map((product) => (
        <Product
          product={product}
          onLike={onLike}
          onAddToCart={onAddToCart}
          key={product._id}
          cartItemsIds={cartItemsIds}
          onDeleteFromCart={onDeleteFromCart}
        />
      ))}
    </div>
  );
};

export default ProductsList;
