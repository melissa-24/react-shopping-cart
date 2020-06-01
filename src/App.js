import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import data from "./data";
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useLocalStorage("cart", []);
  const addItem = (item) => {
    setCart([...cart, item]);
  };

  const removeItem = (id) => {
    let newCart = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(newCart);
  };

  return (
    <ProductContext.Provider value={{ products, addItem }}>
      <CartContext.Provider value={{ cart, removeItem }}>
        <div className="App">
          <Navigation />
          {/* Routes */}
          <Route exact path="/">
            <Products />
          </Route>
          <Route path="/cart">
            <ShoppingCart />
          </Route>
        </div>
      </CartContext.Provider>
    </ProductContext.Provider>
  );
}

export default App;