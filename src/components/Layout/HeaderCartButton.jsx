import { useContext } from "react";
import CartIcon from "../Cart/CartIcon";
import "./HeaderCartButton.css";
import { CartContext } from "../../context/CartContext";

const HeaderCartButton = ({ setCartIsShow }) => {
  const cartCtx = useContext(CartContext);
  const totalItemsIncart = cartCtx.items.reduce(
    (acc, currentItem) => acc + currentItem.amount,
    0
  );

  return (
    <button className="button" onClick={() => setCartIsShow(true)}>
      <span className="icon">
        <CartIcon />
      </span>
      <span>Sepetim</span>
      <span className="badge">{totalItemsIncart}</span>
    </button>
  );
};

export default HeaderCartButton;
