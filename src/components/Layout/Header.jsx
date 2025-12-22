import "./Header.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = ({ setCartIsShow }) => {
  return (
    <header className="header">
      <h1>Trend Mağaza</h1>
      <HeaderCartButton setCartIsShow={setCartIsShow} />
    </header>
  );
};

export default Header;
