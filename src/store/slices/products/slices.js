import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance"; // Adjust this to your actual API instance

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      // Make an API request to fetch the list of products
      const response = await api.get("/products");
      const products = response.data; // Adjust this based on your API response format
      return products;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const detailProduct = createAsyncThunk(
  "products/detailProduct",
  async (payload, { rejectWithValue }) => {
    try {
      // Make an API request to fetch the list of products
      const response = await api.post("/product", payload);
      const products = response.data; // Adjust this based on your API response format
      return products;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);


export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      // Make an API request to create a new product
      const response = await api.post("/product/insert", productData);
      const newProduct = response.data; // Adjust this based on your API response format
      return newProduct;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async (productData, { rejectWithValue }) => {
    try {
      // Make an API request to create a new product
      const id = productData.id;
  
      const response = await api.post(`/product/update/${id}`, productData);
      const newProduct = response.data; // Adjust this based on your API response format
      return newProduct;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      // Make an API request to delete a product by ID
      const res = await api.post(`/product/delete/${productId}`);
      console.log(res)
      return productId;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);
