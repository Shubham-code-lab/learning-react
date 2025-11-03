import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlices";

const store = configureStore({
    reducer: {
        //state.user.username to use it in component
        // const username = useSelector((state) => state.user.username);
        user: userReducer,
        cart: cartReducer,
    },
});

export default store;