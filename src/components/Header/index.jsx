import { useEffect, useState } from "react";
import Logo from "../../assets/Logo.svg";
import { MdSearch, MdShoppingCart } from "react-icons/md";

export const Header = ({
  getProducts,
  productList,
  setProductList,
  cartList,
  setIsOpen,
}) => {
  const [value, setValue] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (value == "") {
      getProducts();
    }

    const newProductList = productList.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );

    setProductList(newProductList);
  };

  return (
    <header>
      <img src={Logo} alt="Logo Kenzie Burguer" />
      <div>
        <button onClick={() => setIsOpen(true)}>
          <MdShoppingCart size={21} />
          <span>{cartList.length}</span>
        </button>
        <form onSubmit={(e) => submit(e)}>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit">
            <MdSearch size={21} />
          </button>
        </form>
      </div>
    </header>
  );
};
