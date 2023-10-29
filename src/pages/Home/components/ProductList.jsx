// src/components/ProductList.tsx

import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios

import Product from "./Product";
import { fetchProducts } from "../../../store/slices/products/slices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductList = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    products,
  } = useSelector((state) => {
    return {
      products: state.products.products
    };
  });

  useEffect(() => {
    dispatch(
      fetchProducts()
    );
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductList;
