import { MdDelete } from "react-icons/md";
import styles from "./styles.module.scss";

export const CartItemCard = ({ product, removeToCart }) => {
  return (
    <li>
      <div className={styles.cart__container}>
        <div className={styles.cart__info}>
          <img src={product.img} alt={product.name} />
          <div>
            <h3>{product.name}</h3>
            <span className={styles.price}>
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
            <span className={styles.quantity}>Qtd. {product.quantity}</span>
          </div>
        </div>
        <button
          aria-label="delete"
          title="Remover item"
          onClick={() => removeToCart(product.id)}
        >
          <MdDelete size={21} />
        </button>
      </div>
    </li>
  );
};
