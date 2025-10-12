import { useCart } from "../context/CartContext";

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

  // const handleCheckout = () => {
  //   console.log();
  // }

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

        {/* cart items */}
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
                  src="/assets/close-or-remove.svg"
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
                  €{item.product.price.toFixed(2)}
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
                €{(item.product.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* cart summary */}
        <div className="cart-summary">
          <div className="cart-total">
            <div className="total-items">
              Total for {getCartItemsCount()}
              {getCartItemsCount() === 1 ? "item" : "items"}
            </div>
            <div className="total-price">€{getCartTotal().toFixed(2)}</div>
          </div>

          {/* checkout button */}
          <button className="checkout-btn">Checkout</button>
        </div>
      </div>
    </div>
  );
}
