//IMPORTANT

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fullName: "",
    nationalID: "",
    createdAt: ""
}


const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        createCustomer: {
            // even for single value if we want to have side effect we still have to create prepare function
            prepare(fullName, nationalID){
                return {
                    fullName,
                    nationalID,
                    createdAt : new Date().toISOString() //we can do side effect in prepare function
                }
            },
            reducer(state, action){
                state.fullName = action.payload.fullName;
                state.nationalID = action.payload.nationalID;
                state.createdAt = action.payload.createdAt
            }
        },
        updateName(state, action){
            state.fullName = action.payload.fullName;
        }
    }
})


export const { createCustomer, updateName} = customerSlice.actions;


export default customerSlice.reducer;
