import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router";
import { PromoSlider } from "../components/PromoSlider";

//banner images
import bannerMain from "../assets/banners/main.png";
import bannerBags from "../assets/banners/bags.jpg";
import bannerMakeup from "../assets/banners/makeup.jpg";
import bannerDresses from "../assets/banners/dresses.jpg";

//categories images
import beautyCategory from "../assets/categories/beauty.jpg";
import bagsCategory from "../assets/categories/bags.jpg";
import fragrancesCategory from "../assets/categories/fragrances.jpg";

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
          images={[bannerMain, bannerBags, bannerMakeup, bannerDresses]}
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
            <img src={beautyCategory} alt="beauty" />
            <h3>Beauty</h3>
          </Link>

          <Link to="/bags" className="category-card">
            <img src={bagsCategory} alt="bags" />
            <h3>Bags</h3>
          </Link>

          <Link to="/fragrances" className="category-card">
            <img src={fragrancesCategory} alt="fragrances" />
            <h3>Fragrances</h3>
          </Link>
        </div>
      </section>
    </div>
  );
}
