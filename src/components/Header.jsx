import { Link } from "react-router";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

export default function Header() {
  const { getCartItemsCount } = useCart();

  const { getFavoritesCount } = useFavorites();

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
        <div className="favorites-wrapper">
          <Link to="/favorites" className="action-link">
            <img
              src="/assets/heart-outlined.svg"
              alt="favorites"
              className="icon"
            />
          </Link>
          {getFavoritesCount() > 0 && (
            <span className="favorites-count">{ getFavoritesCount()}</span>
          )}
        </div>

        <div className="cart-wrapper">
          <Link to="/cart" className="action-link">
            <img src="/assets/cart.svg" alt="cart" className="icon" />
          </Link>
          {getCartItemsCount() > 0 && (
            <span className="cart-count">{getCartItemsCount()}</span>
          )}
        </div>
      </div>
    </header>
  );
}
