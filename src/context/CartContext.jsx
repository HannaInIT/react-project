import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage('cartItems', []);

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
    // const newItems = cartItems.filter(
    //   (item) => item.product.id !== productToRemovedId
    // );
    // setCartItems(newItems);
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

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        addItemToCart,
        removeItemFromCart,
        changeItemQuantityInCart,
        cartItems,
        getCartTotal,
        getCartItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
