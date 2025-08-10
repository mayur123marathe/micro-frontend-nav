import { useState } from "react";

import { useStore } from "store_remote/Store";
function Navbar() {
  const [showCart, setShowCart] = useState(false);
  const { cart } = useStore();

  const clickHandler = () => {
    setShowCart(!showCart);
  };
  return (
    <div
      style={{
        backgroundColor: "#935dff",
        color: "#ffffffff",
        padding: "10px",
        paddingInline: "30px",
        height: "50px",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",

        display: "flex",
      }}
    >
      <div id="logo" className="header">
        Micro Frontend App
      </div>
      <div id="login"></div>
      <span
        className="cart"
        onClick={clickHandler}
        style={{
          display: "inline-block",
          width: "95%",
          textAlign: "right",
          fontSize: "20px",
          padding: "5px",
          cursor: "pointer",
        }}
      >
        🛒 ({cart.length})
      </span>
      {showCart && (
        <ul
          className="cart-items "
          style={{
            width: "300px",
            height: "200px",
            border: "1px solid #ccc",
            position: "absolute",
            marginTop: "150px",
            backgroundColor: "#fff",
            right: "75px",
            padding: "20px",
            listStyleType: "none",
            fontSize: "17px",
            overflowY: "auto",
            color: "black",
            zIndex: 100,
          }}
        >
          {" "}
          Cart Items:
          {cart.map((cartItem) => {
            return (
              <li
                key={cartItem.id}
                style={{
                  padding: "10px",
                  borderBottom: "1px dotted green",
                }}
              >
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
