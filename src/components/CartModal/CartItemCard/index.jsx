import { MdDelete } from "react-icons/md";

export const CartItemCard = ({ product, removeToCart }) => {
  return (
    <li>
      <div>
        <img src={product.img} alt={product.name} />
        <h3>{product.name}</h3>
      </div>
      <button
        aria-label="delete"
        title="Remover item"
        onClick={() => removeToCart(product.id)}
      >
        <MdDelete size={21} />
      </button>
    </li>
  );
};
