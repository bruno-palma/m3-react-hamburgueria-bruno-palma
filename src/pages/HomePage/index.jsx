import { useState, useEffect } from "react";
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";
import { api } from "../../services";
import { toast } from "react-toastify";

export const HomePage = () => {
  const localCartList = localStorage.getItem("@BurguerKenzie:CartList");

  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
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
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("@BurguerKenzie:CartList", JSON.stringify(cartList));
  }, [cartList]);

  const total = () => {
    const totalSum = cartList.reduce((prevValue, product) => {
      return prevValue + product.price;
    }, 0);

    setAmount(totalSum);
  };

  useEffect(() => {
    total();
  }, [cartList]);

  const addToCart = (product) => {
    const productFound = cartList.find((item) => item.id == product.id);

    if (productFound) {
      toast.success("Mais uma unidade adicionada.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      const newProduct = {
        ...productFound,
        quantity: productFound.quantity + 1,
        price: product.price * (productFound.quantity + 1),
      };

      const newList = cartList.splice(
        cartList.indexOf(productFound),
        1,
        newProduct
      );

      setCartList(cartList);

      localStorage.setItem("@BurguerKenzie:CartList", JSON.stringify(cartList));

      total();
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
            amount={amount}
          />
        ) : null}
      </main>
    </>
  );
};
