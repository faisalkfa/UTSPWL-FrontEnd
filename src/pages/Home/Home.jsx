// src/pages/Home.tsx

import React from "react";
import ProductList from "./components/ProductList"
import { Navbar } from "../../components";

const Home = () => {
  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container  mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Our Products</h1>
        <ProductList />
      </div>
    </main>
  );
};

export default Home;
