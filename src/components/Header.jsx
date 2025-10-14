import { Link } from "react-router";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { useProductsService } from "../services/productsService";
import { debounce } from "../utils/debounce";

//icons
import searchIcon from "../assets/icons/search.svg";
import closeIcon from "../assets/icons/close-or-remove.svg";
import heartOutlinedIcon from "../assets/icons/heart-outlined.svg";
import cartIcon from "../assets/icons/cart.svg";

export default function Header() {
  const { getCartItemsCount } = useCart();
  const { getFavoritesCount } = useFavorites();

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const { fetchProductsWithSearch } = useProductsService();
  const searchRef = useRef(null);

  //search function + useCallback
  const fetchProductsOnSearch = useCallback(async (searchString) => {
    if (!searchString.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    try {
      const products = await fetchProductsWithSearch(searchString);

      setSearchResults(products);
      setShowDropdown(true);
    } catch {
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, []);

  const debouncedFetchProductsOnSearch = useCallback(
    debounce((searchString) => {
      fetchProductsOnSearch(searchString);
    }, 300),
    []
  );

  const handleProductClick = () => {
    setQuery("");
    setSearchResults([]);
    setShowDropdown(false);
  };

  //clear search function
  const handleClearSearch = () => {
    setQuery("");
    setSearchResults([]);
    setShowDropdown(false);
  };

  const handleInputFocus = () => {
    if (query.trim()) {
      setShowDropdown(true);
      fetchProductsOnSearch(query);
    }
  };

  //close dropdown when we click outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

      {/* search */}
      <div className="search-container" ref={searchRef}>
        <div className="search-input-wrapper">
          <img src={searchIcon} alt="search" className="search-icon" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              debouncedFetchProductsOnSearch(e.target.value);
            }}
            onFocus={handleInputFocus}
            placeholder="Search products..."
            className="search-input"
          />

          {/* clear button */}
          {query && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="search-clear-btn"
              aria-label="Clear search"
            >
              <img src={closeIcon} alt="clear" className="search-clear-icon" />
            </button>
          )}
        </div>

        {/* dropdown */}
        {showDropdown && (
          <div className="search-dropdown">
            {searchResults.length > 0 ? (
              searchResults.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="search-dropdown-item"
                  onClick={handleProductClick}
                >
                  <img
                    src={product.thumbnail || product.images?.[0]}
                    alt={product.title}
                    className="search-item-image"
                  />
                  <div className="search-item-info">
                    <span className="search-item-title">{product.title}</span>
                    <span className="search-item-price">€{product.price}</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="search-dropdown-item no-results">
                No products found
              </div>
            )}
          </div>
        )}
      </div>

      {/* user actions */}
      <div className="user-actions">
        <div className="favorites-wrapper">
          <Link to="/favorites" className="action-link">
            <img src={heartOutlinedIcon} alt="favorites" className="icon" />
          </Link>
          {getFavoritesCount() > 0 && (
            <span className="favorites-count">{getFavoritesCount()}</span>
          )}
        </div>

        <div className="cart-wrapper">
          <Link to="/cart" className="action-link">
            <img src={cartIcon} alt="cart" className="icon" />
          </Link>
          {getCartItemsCount() > 0 && (
            <span className="cart-count">{getCartItemsCount()}</span>
          )}
        </div>
      </div>
    </header>
  );
}
