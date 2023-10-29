import { createSlice } from "@reduxjs/toolkit";

import { detailProduct, fetchProducts } from "./slices"; // Define your API call to fetch products here

const INITIAL_STATE = {
  products: [], // An array to store the products
  isFetching: false, // A loading state flag
};

// @create slice
const productSlice = createSlice({
  name: "products",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isFetching = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isFetching = false;
      })
      .addCase(detailProduct.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(detailProduct.fulfilled, (state, action) => {
        state.products = [action.payload];
        state.isFetching = false;
      })
      .addCase(detailProduct.rejected, (state) => {
        state.isFetching = false;
      });
  },
});

// export reducer
export default productSlice.reducer;
