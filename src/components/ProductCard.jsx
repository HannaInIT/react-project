// product card component - is a small preview of a product,
//   used in lists / grids(like on Home page, category pages)

import { Link } from "react-router";
import { getDiscountPrice } from "../utils/price";

export default function ProductCard({ product }) {
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

        {/* add to cart button */}
        <button className="product-card_add-to-cart">Add to cart</button>
      </div>
    </div>
  );
}
