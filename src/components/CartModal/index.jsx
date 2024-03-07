import { MdClose } from "react-icons/md";
import { CartItemCard } from "./CartItemCard";

export const CartModal = ({
  cartList,
  removeToCart,
  removeAll,
  setIsOpen,
  amount,
}) => {
  return (
    <div role="dialog">
      <div>
        <h2>Carrinho de compras</h2>
        <button
          aria-label="close"
          title="Fechar"
          onClick={() => setIsOpen(false)}
        >
          <MdClose size={21} />
        </button>
      </div>
      <div>
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
      <div>
        <div>
          <span>Total </span>
          <span>
            {amount.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
        <button onClick={() => removeAll()}>Remover todos</button>
      </div>
    </div>
  );
};
