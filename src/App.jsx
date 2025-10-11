// import { useState } from 'react'

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProductDetail from "./pages/ProductDetail";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* <Route index element={<Home />} /> */}

        
        <Route path="product/:id" element={ <ProductDetail/>} />
      </Route>
    </Routes>
  );
}

export default App;
