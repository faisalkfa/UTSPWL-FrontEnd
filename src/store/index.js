import { configureStore } from "@reduxjs/toolkit"

// @import all reducer from slices
import authReducer from "./slices/auth"
import productsReducer from "./slices/products"
import cartReducer from "./slices/cart"
import transactionReducer from "./slices/transaction"

// @create store
const store = configureStore({
    reducer : {
        auth : authReducer,
        products: productsReducer,
        carts: cartReducer,
        transactions: transactionReducer
    },
})

// @export store
export default store