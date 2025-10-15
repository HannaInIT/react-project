import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router";
import { PromoSlider } from "../components/PromoSlider";

//banner and categories images
import { banners, categories } from "../assets";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const categories = [
          "beauty",
          "womens-dresses",
          "fragrances",
          "womens-bags",
        ];
        const categoryFetch = categories.map((category) =>
          fetch(`https://dummyjson.com/products/category/${category}`).then(
            (res) => res.json()
          )
        );
        const categoryResults = await Promise.all(categoryFetch);

        // get best price from each category
        const bestPriceFromEchCategory = categoryResults.map((result) => {
          const categoryProducts = result.products;

          // sort by the best price in this category
          const sortedByPrice = categoryProducts.sort((a, b) => {
            const priceA = a.discountPercentage
              ? a.price * (1 - a.discountPercentage / 100)
              : a.price;
            const priceB = b.discountPercentage
              ? b.price * (1 - b.discountPercentage / 100)
              : b.price;
            return priceA - priceB;
          });

          return sortedByPrice[0];
        });

        setProducts(bestPriceFromEchCategory);
      } catch (err) {
        setError(`Failed to load product: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  return (
    <div className="home-page">
      {/* banner */}
      <section className="banner">
        <PromoSlider
          images={[banners.main, banners.bags, banners.makeup, banners.dresses]}
          imageClassName="banner-image"
        />
      </section>

      {/* hot prices */}
      <section className="hot-prices">
        <h2>Hot prices</h2>
        {loading && <div className="loading">Loading products...</div>}

        {error && <div className="error">Error: {error}</div>}

        {!loading && !error && (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* top categories */}
      <section className="top-categories">
        <h2>Top categories</h2>
        <div className="categories-grid">
          <Link to="/beauty" className="category-card">
            <img src={categories.beauty} alt="beauty" />
            <h3>Beauty</h3>
          </Link>

          <Link to="/bags" className="category-card">
            <img src={categories.bags} alt="bags" />
            <h3>Bags</h3>
          </Link>

          <Link to="/fragrances" className="category-card">
            <img src={categories.fragrances} alt="fragrances" />
            <h3>Fragrances</h3>
          </Link>
        </div>
      </section>
    </div>
  );
}
