import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import ProductCard from "../components/ProductCard";

export default function Category() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  const getCurrentCategory = () => {
    const path = location.pathname.slice(1);
    switch (path) {
      case "beauty":
        return { name: "Beauty", apiCategory: "beauty" };
      case "fragrances":
        return { name: "Fragrances", apiCategory: "fragrances" };
      case "dresses":
        return { name: "Dresses", apiCategory: "womens-dresses" };
      case "bags":
        return { name: "Bags", apiCategory: "womens-bags" };
       default: 
      return { name: "Category", apiCategory: "beauty" };
    }
  };

  const category = getCurrentCategory();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://dummyjson.com/products/category/${category.apiCategory}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(`Failed to load product: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category.apiCategory]);

  return (
    <div className="category-page">
      <div className="category-header">
        <h1>{category.name}</h1>
        <p>Discover our amazing {category.name.toLowerCase()} collection</p>
      </div>

      {loading && <div className="loading">Loading products...</div>}
      {error && <div className="error">Error: {error}</div>}

      {!loading && !error && (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
