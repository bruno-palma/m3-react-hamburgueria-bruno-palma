import { ProductCard } from "./ProductCard";

export const ProductList = ({ productList, addToCart }) => {
  return (
    <ul>
      {productList.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </ul>
  );
};
