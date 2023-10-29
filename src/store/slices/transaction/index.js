import { createSlice } from "@reduxjs/toolkit";

import { fetchTransaction, createTransaction } from "./slices";

const INITIAL_STATE = {
  transactions: [],
  isFetching: false // Array to hold items in the cart
};

const cartSlice = createSlice({
  name: "carts",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransaction.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchTransaction.fulfilled, (state, action) => {
        action.payload = JSON.parse(action.payload)
        state.transactions = action.payload.transactions;
        state.isFetching = false;
      })
      .addCase(fetchTransaction.rejected, (state) => {
        state.isFetching = false;
      })
      .addCase(createTransaction.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        // state.carts = [action.payload];
        state.isFetching = false;
      })
      .addCase(createTransaction.rejected, (state) => {
        state.isFetching = false;
      })
  },
});

export default cartSlice.reducer;
