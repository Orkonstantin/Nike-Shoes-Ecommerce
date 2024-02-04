import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const defaultProducts = ls ? JSON.parse(ls?.getItem("cartProducts")) : [];
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cartProducts", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  useEffect(() => {
    if (ls && ls?.getItem("cartProducts")) {
      setCartProducts(JSON.parse(ls?.getItem("cartProducts")));
    }
  }, []);

  function addProduct(productIdAndSize) {
    setCartProducts((prevCartProducts) => {
      const existingProductIndex = prevCartProducts.findIndex(
        (product) =>
          product._id === productIdAndSize._id &&
          product.size === productIdAndSize.size
      );
      if (existingProductIndex !== -1) {
        const newProduct = {
          ...prevCartProducts[existingProductIndex],
          quantity: (prevCartProducts[existingProductIndex].quantity || 0) + 1,
        };
        const newCartProducts = [...prevCartProducts];
        newCartProducts[existingProductIndex] = newProduct;
        return newCartProducts;
      } else {
        // If the product doesn't exist, add it with a quantity of 1
        const newProduct = {
          _id: productIdAndSize._id,
          size: productIdAndSize.size,
          quantity: 1,
        };
        return [...prevCartProducts, newProduct];
      }
    });
  }

  function removeProduct(productIdAndSize) {
    setCartProducts((prevCartProducts) => {
      const pos = prevCartProducts.findIndex(
        (product) =>
          product._id === productIdAndSize._id &&
          product.size === productIdAndSize.size
      );
      if (pos !== -1) {
        const updatedCartProducts = [...prevCartProducts];
        if (updatedCartProducts[pos].quantity > 1) {
          // If the product's quantity is more than 1, decrement it
          updatedCartProducts[pos].quantity -= 1;
        } else {
          // If the product's quantity is 1, remove it from the cart
          updatedCartProducts.splice(pos, 1);
        }

        if (updatedCartProducts.length > 0) {
          ls?.setItem("cartProducts", JSON.stringify(updatedCartProducts));
        } else {
          ls?.removeItem("cartProducts");
        }

        return updatedCartProducts;
      }
      return prevCartProducts;
    });
  }

  function clearCart() {
    setCartProducts([]);
    localStorage.removeItem("cartProducts");
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
