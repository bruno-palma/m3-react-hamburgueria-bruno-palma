import { useState, useEffect } from "react";
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";
import { api } from "../../services";

export const HomePage = () => {
  const localCartList = localStorage.getItem("@BurguerKenzie:CartList");

  const [isOpen, setIsOpen] = useState(false);
  const [productList, setProductList] = useState([]);
  const [cartList, setCartList] = useState(
    localCartList ? JSON.parse(localCartList) : []
  );

  const getProducts = async () => {
    try {
      const { data } = await api.get("/products");
      const newData = data.map((product) => {
        return { ...product, quantity: 1 };
      });
      setProductList(newData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("@BurguerKenzie:CartList", JSON.stringify(cartList));
  }, [cartList]);

  const addToCart = (product) => {
    const productFound = cartList.find((item) => item.id == product.id);

    if (productFound) {
      alert("Produto já adicionado ao carrinho.");

      const newProduct = {
        ...productFound,
        quantity: productFound.quantity + 1,
        price: product.price * (productFound.quantity + 1),
      };

      const filteredList = cartList.filter((item) => {
        return item.id == product.id ? newProduct : item;
      });

      console.log(filteredList);
      setCartList(filteredList);
    } else {
      setCartList([...cartList, product]);
    }
  };

  const removeToCart = (productID) => {
    const newCartList = cartList.filter((product) => product.id !== productID);
    setCartList(newCartList);
  };

  const removeAll = () => {
    setCartList([]);
  };

  return (
    <>
      <Header
        getProducts={getProducts}
        productList={productList}
        setProductList={setProductList}
        cartList={cartList}
        setIsOpen={setIsOpen}
      />
      <main>
        <ProductList productList={productList} addToCart={addToCart} />
        {isOpen ? (
          <CartModal
            cartList={cartList}
            removeToCart={removeToCart}
            removeAll={removeAll}
            setIsOpen={setIsOpen}
          />
        ) : null}
      </main>
    </>
  );
};
