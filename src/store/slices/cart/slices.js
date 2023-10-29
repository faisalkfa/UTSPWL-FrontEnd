import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance"; // Adjust this to your actual API instance

export const fetchCart = createAsyncThunk(
  "carts/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/cart");
      const cart = response.data;
      console.log(cart)
      return cart;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const cartTotalPrice = createAsyncThunk(
  "carts/cartTotalPrice",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/cart/total", _);
      console.log(response.data)
      const cart = response.data;
      return cart;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const addCart = createAsyncThunk(
  "carts/addCart",
  async (productData, { rejectWithValue }) => {
    try {
      // Make an API request to create a new product
      const response = await api.post("/cart/insert", productData);
      console.log(productData)
      const newProduct = response.data; // Adjust this based on your API response format
      return newProduct;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const editCart = createAsyncThunk(
  "carts/editCart",
  async (productData, { rejectWithValue }) => {
    try {
      // Make an API request to create a new product
      const id = productData.id;
      const response = await api.post(`/cart/update/${id}`, productData);
      console.log(productData)
      const newProduct = response.data; // Adjust this based on your API response format
      return newProduct;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const deleteCart = createAsyncThunk(
  "carts/deleteCart",
  async (productId, { rejectWithValue }) => {
    try {
      // Make an API request to delete a product by ID
      const res = await api.post(`/cart/delete/${productId}`);
      console.log(res)
      return productId;
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response);
    }
  }
);
