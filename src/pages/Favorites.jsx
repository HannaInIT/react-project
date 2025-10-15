import ProductCard from "../components/ProductCard";
import { useFavorites } from "../context/FavoritesContext";

export default function Favorites() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="favorites-page">
        <div className="favorites-empty">
          <h2>Your favorites is empty</h2>
          <p>Add some products to your favorites</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="favorites-container">
        {/* favorites title */}
        <h2 className="favorites-title">My favorites</h2>
        <p className="favorites-subtitle">
          You have {favorites.length}{" "}
          {favorites.length === 1 ? "item" : "items"} in your favorites
        </p>

        <div className="products-grid">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
