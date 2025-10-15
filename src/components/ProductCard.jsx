// product card component - is a small preview of a product,
// used in lists / grids(like on Home page, category pages)

import { Link } from "react-router";
import { getDiscountPrice } from "../utils/priceDiscount";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
//icons
import { icons } from "../assets";

export default function ProductCard({ product }) {
  const { cartItems, addItemToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  // if product in cart
  const isProductInCart = cartItems.some(
    (item) => item.product.id === product.id
  );

  // if product in favorites
  const isProductFavorite = isFavorite(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isProductInCart) {
      return; //don't add to the cart if it's already there
    }
    addItemToCart(product);
  };

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card_link">
        {/* product image, it is clickable*/}
        <div className="product-card_image-wrapper">
          <img
            src={product.images?.[0] || product.thumbnail}
            alt={product.title}
            className="product-card_image"
          />
        </div>

        <h4 className="product-card_title">{product.title}</h4>
      </Link>

      {/* product info */}
      <div className="product-card_info">
        <div className="product-card_price-wrapper">
          {/* old price only if there is a discount */}
          {product.discountPercentage && (
            <span className="product-card_price-old">
              €{product.price.toFixed(2)}
            </span>
          )}

          {/* current price */}
          <span className="product-card_price-new">
            €{getDiscountPrice(product.price, product.discountPercentage)}
          </span>

          {/*  discount percentage*/}
          {product.discountPercentage && (
            <span className="product-card_discount">
              -{product.discountPercentage}%
            </span>
          )}
        </div>

        {/* add to cart button and add to favorites with dynamic state*/}
        <div className="product-card_buttons">
          {/* add to cart */}
          <button
            onClick={handleAddToCart}
            className={`add-to-cart-btn ${
              isProductInCart ? "add-to-cart-btn--added" : ""
            }`}
            disabled={isProductInCart}
          >
            {isProductInCart ? "Added to cart" : "Add to cart"}
          </button>

          {/* favorites button */}
          <button
            onClick={handleFavorite}
            className={`favorite-btn ${
              isProductFavorite ? "favorite-btn--active" : ""
            }`}
            aria-label={
              isProductFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <img
              src={isProductFavorite ? icons.heartFilled : icons.heartOutlined}
              alt="favorite"
              className="favorite-icon"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
