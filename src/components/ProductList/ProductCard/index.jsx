import styles from "./styles.module.scss";

export const ProductCard = ({ product, addToCart }) => {
  return (
    <li className={styles.product__info}>
      <img src={product.img} alt={product.name} />
      <div>
        <h3>{product.name}</h3>
        <span className={styles.product__category}>{product.category}</span>
        <span className={styles.product__price}>
          {product.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
        <button className="button-default" onClick={() => addToCart(product)}>
          Adicionar
        </button>
      </div>
    </li>
  );
};
