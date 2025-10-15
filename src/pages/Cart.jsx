import { useCart } from "../context/CartContext";
import { icons } from "../assets";
import { getDiscountPrice } from "../utils/priceDiscount";

export default function Cart() {
  const {
    cartItems,
    removeItemFromCart,
    changeItemQuantityInCart,
    getCartTotal,
    getCartItemsCount,
  } = useCart();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      changeItemQuantityInCart(id, newQuantity);
    }
  };

  const handleRemoveItem = (id) => {
    removeItemFromCart(id);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <h3>Your cart is empty</h3>
          <p>Add some products to your cart.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* cart title */}
        <h2 className="cart-title">Cart</h2>

        {/* 2 column layout */}
        <div className="cart-content">
          {/* products */}
          <div className="cart-item-column">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.product.id} className="cart-item">
                  {/* remove icon */}
                  <button
                    onClick={() => handleRemoveItem(item.product.id)}
                    className="cart-item_remove"
                    aria-label="remove item from cart"
                  >
                    <img
                      src={icons.close}
                      alt="remove"
                      className="remove-icon"
                    />
                  </button>

                  {/* product-image */}
                  <div className="cart-item_image">
                    <img
                      src={item.product.thumbnail || item.product.images?.[0]}
                      alt={item.product.title}
                    />
                  </div>

                  {/* product info */}
                  <div className="cart-item_info">
                    <h3 className="cart-item_title">{item.product.title}</h3>
                    <div className="cart-item_price">
                      {/* show original and discounted price */}
                      {item.product.discountPercentage ? (
                        <>
                          <span className="price-original">
                            €{item.product.price.toFixed(2)}
                          </span>
                          <span className="price-discounted">
                            €
                            {getDiscountPrice(
                              item.product.price,
                              item.product.discountPercentage
                            )}
                          </span>
                          <span className="discount-badge">
                            - {item.product.discountPercentage}%
                          </span>
                        </>
                      ) : (
                        <span>€{item.product.price.toFixed(2)}</span>
                      )}
                    </div>
                  </div>

                  {/* quantity */}
                  <div className="cart-item_quantity">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.product.id, item.quantity - 1)
                      }
                      className="quantity-btn"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.product.id, item.quantity + 1)
                      }
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>

                  {/* item total */}
                  <div className="cart-item_total">
                    €
                    {(
                      getDiscountPrice(
                        item.product.price,
                        item.product.discountPercentage
                      ) * item.quantity
                    ).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* right column - summary */}
          <div className="cart-summary-column">
            <div className="cart-summary">
              <div className="total-items">
                Total for {getCartItemsCount} {''}
                {getCartItemsCount === 1 ? "item" : "items"}
              </div>

              <div className="total-price">€{getCartTotal.toFixed(2)}</div>

              {/* divider */}
              <hr className="summary-divider" />

              {/* checkout button */}
              <button className="checkout-btn">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
