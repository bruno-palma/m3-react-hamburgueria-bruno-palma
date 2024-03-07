import { MdDelete } from "react-icons/md";

export const CartItemCard = ({ product, removeToCart }) => {
  return (
    <li>
      <div>
        <div>
          <img src={product.img} alt={product.name} />
          <span>Qtd. {product.quantity}</span>
        </div>
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
