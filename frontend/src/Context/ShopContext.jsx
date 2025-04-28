import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

// Default cart: all item IDs with quantity 0
const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index <= 300; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const apiurl = process.env.REACT_APP_API_URL;


  // Fetch products + user cart from backend
  useEffect(() => {
    // Get all products
    axios
      .get(`${apiurl}/allproducts`)
      .then((response) => setAll_Product(response.data))
      .catch((error) => console.error("Error fetching products:", error));

    // Get cart items if user is logged in
    if (localStorage.getItem("auth-token")) {
      axios
        .post(`${apiurl}/getcart`, {}, {
          headers: {
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => setCartItems(response.data))
        .catch((error) => console.error("Error fetching cart:", error));
    }
  }, [apiurl]);

  // Clear Cart (frontend + optional backend sync)
  const clearCart = () => {
    setCartItems(getDefaultCart());

    if (localStorage.getItem("auth-token")) {
      axios
        .post(`${apiurl}/clearcart`, {}, {
          headers: {
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => console.log("Cart cleared:", response.data))
        .catch((error) => console.error("Error clearing cart:", error));
    }
  };

  // Add to cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

    axios
      .post(
        `${apiurl}/addtocart`,
        { itemId },
        {
          headers: {
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => console.log("Added to cart:", response.data))
      .catch((error) => console.error("Error adding to cart:", error));
  };

  // Remove from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (localStorage.getItem("auth-token")) {
      axios
        .post(
          `${apiurl}/removefromcart`,
          { itemId },
          {
            headers: {
              "auth-token": `${localStorage.getItem("auth-token")}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => console.log("Removed from cart:", response.data))
        .catch((error) => console.error("Error removing from cart:", error));
    }
  };

  // Total Cart Amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // Total Cart Items
  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
