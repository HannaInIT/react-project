import { Link } from "react-router";
import { useCart } from "../context/CartContext";

export default function Header() {
  const {getCartItemsCount} = useCart()
  return (
    <header className="header">
      {/* logo */}
      <div className="logo">
        <Link to="/">
          <h1>LOGO</h1>
        </Link>
      </div>

      {/* nav menu */}
      <nav className="nav-menu">
        <Link to="/beauty" className="nav-link">
          Beauty
        </Link>
        <Link to="/fragrances" className="nav-link">
          Fragrances
        </Link>
        <Link to="/dresses" className="nav-link">
          Dresses
        </Link>
        <Link to="/bags" className="nav-link">
          Bags
        </Link>
      </nav>

      {/* user actions */}
      <div className="user-actions">
        <Link to="/favorites" className="action-link">
          <img
            src="/assets/heart-outlined.svg"
            alt="favorites"
            className="icon"
          />
        </Link>
        <div className="cart-wrapper">
        <Link to="/cart" className="action-link">
          <img src="/assets/cart.svg" alt="cart" className="icon" />
         
          </Link>
          {getCartItemsCount() > 0 && (
             <span className="cart-count">{ getCartItemsCount()}</span>
          )}
          </div>
      </div>
    </header>
  );
}
