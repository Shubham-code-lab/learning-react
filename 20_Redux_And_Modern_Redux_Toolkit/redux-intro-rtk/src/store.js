//IMPORTANT

import {configureStore} from "@reduxjs/toolkit";  //combine reducer , add thunk , and also setup developer tool

import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const store = configureStore({
    reducer: {
        account: accountReducer,
        customer: customerReducer
    }
})

export default store;