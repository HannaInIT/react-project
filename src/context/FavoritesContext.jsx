import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  const addToFavorites = (product) => {
    setFavorites((prev) => {
      // check if item already exists in favorites
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        //if it is already in favorites, don't add again
        return prev;
      }

      //if doesn't exist, add the product to favorites
      return [...prev, product];
    });
  };

  const removeFromFavorites = (productId) => {
    setFavorites((prev) => prev.filter((item) => item.id !== productId));
  };

  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

      if (existingItem) {
        //remove if already in favorites
        return prev.filter((item) => item.id !== product.id);
      } else {
        // add if not in favorites
        return [...prev, product];
      }
    });
  };

  // check if product is in favorites

  const isFavorite = (productId) => {
    return favorites.some((item) => item.id === productId);
  };

  // get favorites count
  const getFavoritesCount = () => {
    return favorites.length;
  };

  //clear all favorites
  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        isFavorite,
        getFavoritesCount,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

// hook to use favorites context
// eslint-disable-next-line react-refresh/only-export-components
export const useFavorites = () => useContext(FavoritesContext);
