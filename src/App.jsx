// import { useState } from 'react'

import "./App.css";
import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/Home";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="product/:id" element={<ProductDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
