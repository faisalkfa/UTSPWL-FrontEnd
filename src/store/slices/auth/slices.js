import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance"
// import Toast from "react-hot-toast";

export const login = createAsyncThunk(
    "auth/login",
    async (payload, { rejectWithValue }) => {
        try {
            const {data} = await api.post("/login", payload)
            localStorage.setItem("token", data?.token)
            return data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error)
        }
    }
)

export const logout = createAsyncThunk(
    "auth/logout",
    async (payload, { rejectWithValue }) => {
        try {
            localStorage.removeItem("token")
            localStorage.removeItem("id")
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error)
        }
    }
)

export const keepLogin = createAsyncThunk(
    "auth/keepLogin",
    async (payload, { rejectWithValue }) => {
        try {
            const {data} = await api.get("/keep_login")
            console.log(data)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const register = createAsyncThunk(
    "auth/register",
    async (payload, { rejectWithValue }) => {
        try {
            const {data} = await api.post("/register", payload)
            return data?.data
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(error.response)
        }
    }
)