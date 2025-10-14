import { useApiInstance } from "./axiosService";
const allowedCategories = [
  "beauty",
  "womens-dresses",
  "fragrances",
  "womens-bags",
];

export const useProductsService = () => {
  const apiClient = useApiInstance();

  const fetchProductsWithSearch = async (query) => {
    const response = await apiClient.get(`products/search?q=${query}`);

    const allowedProducts = response.data.products.filter((product) =>
      allowedCategories.includes(product.category)
    );
    return allowedProducts;
  };
  return { fetchProductsWithSearch };
};
