//IMPORTANT
import {applyMiddleware, combineReducers, createStore} from "redux"; //'createStore' is deprecated use redux tool kit (RTK).
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const rootReducer = combineReducers(
    {
        account: accountReducer,
        customer: customerReducer
    }
)

const store = createStore(
    rootReducer,
    // IMPORTANT
    //use thunk middleware in the app
    // applyMiddleware(thunk)  


    //To add redux-devtools-extension
    composeWithDevTools(
        applyMiddleware(thunk)  
    )
);

export default store;