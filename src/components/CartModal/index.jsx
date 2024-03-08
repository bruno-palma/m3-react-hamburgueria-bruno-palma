import { MdClose } from "react-icons/md";
import { CartItemCard } from "./CartItemCard";
import styles from "./styles.module.scss";

export const CartModal = ({
  cartList,
  removeToCart,
  removeAll,
  setIsOpen,
  amount,
}) => {
  return (
    <div className={styles.modal__overlay} role="dialog">
      <div className={styles.modal__container}>
        <div className={styles.modal__top}>
          <h2>Carrinho de compras</h2>
          <button
            aria-label="close"
            title="Fechar"
            onClick={() => setIsOpen(false)}
          >
            <MdClose size={21} />
          </button>
        </div>
        <div className={styles.modal__info}>
          <ul>
            {cartList.map((product) => (
              <CartItemCard
                key={product.id}
                product={product}
                removeToCart={removeToCart}
              />
            ))}
          </ul>
        </div>
        <div className={styles.modal__bottom}>
          <div>
            <span className={styles.total}>Total</span>
            <span className={styles.amount}>
              {amount.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
          <button className={styles.button} onClick={() => removeAll()}>
            Remover todos
          </button>
        </div>
      </div>
    </div>
  );
};
