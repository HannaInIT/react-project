import { Link } from "react-router-dom";


export default function Header() {
  return (
    <header className="header">
        {/* logo */}
        <div className="logo">
          <Link to="/"><h1>LOGO</h1></Link>
        </div>

        {/* nav menu */}
        <nav className="nav-menu">
          <Link to="/beauty" className="nav-link">
            Beauty
          </Link>
          <Link to="/skin-care" className="nav-link">
            Skin care
          </Link>
          <Link to="/fragrances" className="nav-link">
            Fragrances
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
          <Link to="/cart" className="action-link">
            <img src="/assets/cart.svg" alt="cart" className="icon" />
          </Link>
        </div>
    </header>
  );
}
