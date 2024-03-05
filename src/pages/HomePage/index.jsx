import { useState, useEffect } from "react";
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";
import { api } from "../../services";

export const HomePage = () => {
  const localCartList = localStorage.getItem("@BurguerKenzie:CartList");

  const [productList, setProductList] = useState([]);
  const [cartList, setCartList] = useState(
    localCartList ? JSON.parse(localCartList) : []
  );

  // useEffect montagem - carrega os produtos da API e joga em productList

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await api.get("/products");
        setProductList(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  // useEffect atualização - salva os produtos no localStorage (carregar no estado)

  useEffect(() => {
    localStorage.setItem("@BurguerKenzie:CartList", JSON.stringify(cartList));
  }, [cartList]);

  // adição, exclusão, e exclusão geral do carrinho

  const addToCart = (product) => {
    if (cartList.includes(product)) {
      alert("Produto já adicionado ao carrinho.");
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
  // renderizações condições e o estado para exibir ou não o carrinho
  // filtro de busca
  // estilizar tudo com sass de forma responsiva

  return (
    <>
      <Header />
      <main>
        <ProductList productList={productList} addToCart={addToCart} />
        <CartModal
          cartList={cartList}
          removeToCart={removeToCart}
          removeAll={removeAll}
        />
      </main>
    </>
  );
};
