// import { useState } from 'react'

import "./App.css";
import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Cart from "./pages/Cart";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="beauty" element={<Category />} />
        <Route path="fragrances" element={<Category />} />
        <Route path="dresses" element={<Category />} />
        <Route path="bags" element={<Category />} />

        <Route path="product/:id" element={<ProductDetail />} />

        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;
