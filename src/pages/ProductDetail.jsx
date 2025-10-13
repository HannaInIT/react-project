// full page for one product
// shows detailed info: multiple images, description, reviews, specifications

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getDiscountPrice } from "../utils/price";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { cartItems, addItemToCart } = useCart()

  // check if product in cart
  const isProductInCart = product ? cartItems.some(item => item.product.id === product.id) : false
  
  const handleAddToCart = () => {
    if (product && !isProductInCart) {
     addItemToCart(product)
   }
  }

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(`Failed to load product: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  return (
    <div className="product-detail">
      <div className="product-detail_container">
        {/* image */}
        <div className="product-detail_image-wrapper">
          <img
            src={product.images?.[0] || product.thumbnail}
            alt={product.title}
            className="product-detail_main-image"
          />
        </div>

        {/* info about product */}
        <div className="product-info">
          <h1 className="product-info_title">{product.title}</h1>
          <p className="product-description">{product.description}</p>

          <div className="product_price-wrapper">
            {/* old price */}
            {product.discountPercentage && (
              <span className="product-price_old">
                €{product.price.toFixed(2)}
              </span>
            )}
            {/* with discount */}
            <span className="product-new">
              €{getDiscountPrice(product.price, product.discountPercentage)}
            </span>
            {/* % of discount */}
            {product.discountPercentage && (
              <span className="product-discount">
                -{product.discountPercentage}%
              </span>
            )}
          </div>

          <button onClick={handleAddToCart} className={`add-to-cart-btn add-to-cart-btn--large ${isProductInCart ? 'add-to-cart-btn--added' : ''}`} disabled={isProductInCart}>{ isProductInCart ? 'Added to cart': 'Add to cart'}</button>
        </div>
      </div>
    </div>
  );
}
