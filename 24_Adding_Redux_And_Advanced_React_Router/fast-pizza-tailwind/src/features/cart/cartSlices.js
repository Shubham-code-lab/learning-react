import { createSlice } from "@reduxjs/toolkit";

//whenever possible use derived state instead of state (i.e:- cart length)
const initialState = {
    cart: [
        {
            pizzaId: 12,
            name: "Mediterranean",
            quantity: 2,
            unitPrice: 16,
            totalPrice: 32,
        },
    ],
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action){
            state.cart.push(action.payload);
            
        },
        deleteItem(state, action){
            state.cart = state.cart.filter((item)=>item.pizzaId !== action.payload);
        },
        increaseItemQuantity(state, action){
            const item = state.cart.find((item)=>item.pizzaId === action.payload);
            item.quantity++;
            item.totalPrice = item.unitPrice * item.quantity;
        },
        decreaseItemQuantity(state, action){
            const item = state.cart.find((item)=>item.pizzaId === action.payload);
            item.quantity--;
            item.totalPrice = item.unitPrice * item.quantity;

            if(item.quantity === 0){
                cartSlice.caseReducers.deleteItem(state, action);   //call another reducer function inside a reducer function
            }
        },
        clearCart(state, action){
            state.cart = [];
        }
    }
})

export const {addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart} = cartSlice.actions;
export default cartSlice.reducer;

//redux recommended way to calculate the total or any other logic inside the useSelector hook and not outside.
//below selector functions might cause performance issues for that we can utilize 'reselect' library.
export const getTotalCartPrice = (state)=>state.cart.cart.reduce((acc, item)=>acc + item.totalPrice, 0);

export const getTotalCartQuantity = (state)=>state.cart.cart.reduce((acc, item)=>acc + item.quantity, 0);

export const getCart = (state)=>state.cart.cart;

// sending the id as an argument which return the function for useSelector.
export const getCurrentQuantityById = (id)=>(state)=>state.cart.cart.find((item)=>item.pizzaId === id)?.quantity ?? 0;