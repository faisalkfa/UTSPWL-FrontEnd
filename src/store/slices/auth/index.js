import { createSlice } from "@reduxjs/toolkit";

import {
  login,
  logout,
  keepLogin,
  register,
} from "./slices";

const INITIAL_STATE = {
  id: "",
  username: "",
  isLogin: false,
  isLoginLoading: false,
  isKeepLoginLoading: false,
  isLogoutLoading: false,
  isRegisterLoading: false,
};

// @create slice
const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoginLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { id, username } =
          action.payload;
        state.id = id;
        state.username = username;
        state.isLogin = true;
        state.isLoginLoading = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoginLoading = false;
        state.isLogin = false;
      })
      .addCase(logout.pending, (state) => {
        state.isLogoutLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        Object.assign(state, INITIAL_STATE);
      })
      .addCase(logout.rejected, (state) => {
        state.isLogoutLoading = false;
      })
      .addCase(keepLogin.pending, (state) => {
        state.isKeepLoginLoading = true;
      })
      .addCase(keepLogin.fulfilled, (state, action) => {
        const { id, username } =
          action.payload;
          console.log("here", id, username);
        state.id = id;
        state.username = username;
        state.isLogin = true;
        state.isKeepLoginLoading = false;
      })
      .addCase(keepLogin.rejected, (state) => {
        state.isKeepLoginLoading = false;
        state.isLogin = false;
      })
      .addCase(register.pending, (state) => {
        state.isRegisterLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        const { id, username } = action.payload;
        state.id = id;
        state.username = username;
        state.isKeepLoginLoading = false;
        state.isRegisterLoading = false;
      })
      .addCase(register.rejected, (state) => {
        state.isRegisterLoading = false;
        state.isLogin = false;
      })
  },
});

// export reducer
export default authSlice.reducer;
