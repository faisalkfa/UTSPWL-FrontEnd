import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  Cart,
  CreateProduct,
  Home,
  ProductDetail,
  History,
  ProductManagement,
  SignUp,
  Login
} from "./pages";
import ProtectedRoute from "./ProtectedRoute";
import { keepLogin } from "./store/slices/auth/slices";
import { isRejectedWithValue } from "@reduxjs/toolkit";

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(keepLogin()).then((result) => {
      if (isRejectedWithValue(result)) {
        localStorage.removeItem('token');
        // navigate('/');
      }
    }).catch((err) => {
      console.log(err)
    });
  }, []);
  return (
    <>
      <main>
        <Routes>
          {/* <Route path="*" element={<NotFound />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/product/new" element={
            <ProtectedRoute>
              <CreateProduct/>
            </ProtectedRoute>
            } />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/product/detail/:id" element={<ProductDetail />} />
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
            } />
          <Route path="/transactions" element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          } />
          <Route path="/manage/product" element={
            <ProtectedRoute>
              <ProductManagement />
            </ProtectedRoute>
            } />
        </Routes>
      </main>
    </>
  );
}