import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage("cartItems", []);

  const addItemToCart = (product) => {
    setCartItems((prev) => {
      // check if item already exists in cart
      const existingItem = prev.find((item) => item.product.id === product.id);

      if (existingItem) {
        //if it is exists, increase quantity
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      //if doesn't exist, add a new item
      const newItem = {
        product: {
          ...product,
        },
        quantity: 1,
      };
      return [...prev, newItem];
    });
  };

  const removeItemFromCart = (productToRemoveId) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product.id !== productToRemoveId)
    );
  };

  const changeItemQuantityInCart = (id, quantity) => {
    if (quantity < 1) {
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  //clear cart (after successful checkout or manual clear)
  const clearCart = () => {
    setCartItems([]);
  };

  //useMemo
  const getCartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      // apply discount if available
      const discountedPrice = item.product.discountPercentage
        ? item.product.price * (1 - item.product.discountPercentage / 100)
        : item.product.price;
      return total + discountedPrice * item.quantity;
    }, 0);
  }, [cartItems]);

  const getCartItemsCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const value = {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    changeItemQuantityInCart,
    clearCart,
    getCartTotal,
    getCartItemsCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
