import { createSlice } from "@reduxjs/toolkit";

import { addCart, fetchCart, cartTotalPrice } from "./slices";

const INITIAL_STATE = {
  carts: [],
  total: 0,
  isFetching: false // Array to hold items in the cart
};

const cartSlice = createSlice({
  name: "carts",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.carts = action.payload.cart_items;
        state.isFetching = false;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.isFetching = false;
      })
      .addCase(addCart.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(addCart.fulfilled, (state, action) => {
        // state.carts = [action.payload];
        state.isFetching = false;
      })
      .addCase(addCart.rejected, (state) => {
        state.isFetching = false;
      })
      .addCase(cartTotalPrice.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(cartTotalPrice.fulfilled, (state, action) => {
        state.total = action.payload.total_price;
        state.isFetching = false;
      })
      .addCase(cartTotalPrice.rejected, (state) => {
        state.isFetching = false;
      })
  },
});

export default cartSlice.reducer;
