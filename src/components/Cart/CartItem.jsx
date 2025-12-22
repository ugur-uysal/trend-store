import { useContext } from "react";
import "./cartItem.css";
import { CartContext } from "../../context/CartContext";

const CartItem = ({ product }) => {
  const { img, name, price, amount } = product;
  const { removeItem } = useContext(CartContext);

  return (
    <li className="cart-item">
      <div className="cart-item-img">
        <img src={img} alt={name} />
      </div>
      <div className="cart-item-info">
        <div className="cart-item-texts">
          <b>{name}</b>
          <div>
            <span>₺{price} x </span>
            <span className="cart-item-amount">{amount}</span>
          </div>
        </div>
        <a
          href="/"
          className="cart-item-remove"
          onClick={(e) => {
            e.preventDefault();
            removeItem(product.id);
          }}
        >
          x
        </a>
      </div>
    </li>
  );
};

export default CartItem;
