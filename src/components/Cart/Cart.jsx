import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "./Cart.css";
import CartItem from "./CartItem";
import OffCanvas from "../UI/OffCanvas";

const Cart = ({ setCartIsShow }) => {
  const { items, totalAmount, clearItem } = useContext(CartContext);
  const hasItems = items.length > 0;

  const cartItems = (
    <ul className="cart-items">
      {items.map((product) => (
        <CartItem product={product} key={product.id} />
      ))}
    </ul>
  );

  return (
    <OffCanvas setCartIsShow={setCartIsShow}>
      <div className="cart-head">
        <h2>Sepetim</h2>
        <a
          href="/"
          className="cart-close"
          onClick={(e) => {
            e.preventDefault();
            setCartIsShow(false);
          }}
        >
          X
        </a>
      </div>
      {cartItems}
      <div className="total">
        <span>Toplam</span>
        <span>₺{totalAmount.toFixed(2)}</span>
      </div>
      {hasItems && (
        <div className="actions">
          <button className="cart-order">Sipariş Ver</button>
          <button className="cart-clear" onClick={clearItem}>
            Temizle
          </button>
        </div>
      )}
    </OffCanvas>
  );
};

export default Cart;
