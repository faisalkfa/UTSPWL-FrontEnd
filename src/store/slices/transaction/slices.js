import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance"; // Adjust this to your actual API instance

export const fetchTransaction = createAsyncThunk(
  "carts/fetchTransaction",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/transactions", _);
      const history = response.data;
      return history;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const createTransaction = createAsyncThunk(
  "carts/createTransaction",
  async (_, { rejectWithValue }) => {
    try {
      // Make an API request to create a new product
      const response = await api.post("/transactions", _);
      console.log(response)
      const newProduct = response.data; // Adjust this based on your API response format
      return newProduct;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);