import { useState } from "react";
import "../styles/css/style.css";

import { useStore } from "store_remote/Store";
function Navbar() {
  const [showCart, setShowCart] = useState(false);
  const { cart } = useStore();

  const clickHandler = () => {
    setShowCart(!showCart);
  };
  return (
    <div className="nav">
      <div id="logo" className="header">
        Micro Frontend App
      </div>
      <div id="login"></div>
      <span className="cart" onClick={clickHandler}>
        🛒 ({cart.length})
      </span>
      {showCart && (
        <ul className="cart-items ">
          {" "}
          Cart Items:
          {cart.map((cartItem) => {
            return (
              <li key={cartItem.id}>
                {cartItem.name} ({cartItem.quantity})
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Navbar;
