import {combineReducers, createStore} from "redux"; //'createStore' is deprecated use redux tool kit (RTK).

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
}

const initialStateCustomer = {
    fullName: "",
    nationalID: "",
    createdAt: ""
}

//reducer only goal is to calculate the new state using current state and on the received action
//not allowed to modify existing state or not allowed to do any async logic or any side effects.
function accountReducer(state = initialStateAccount, action){    //we can set intial state directly like this unlike the useReducer hook
    switch(action.type){
        //case "SET_BALANCE"   //legacy code naming convention
        case "account/deposit": 
            return {...state, balance: state.balance + action.payload};
        case "account/withdraw": 
            return {...state, balance: state.balance - action.payload}; 
        case "account/requestLoan": 
            if(state.loan > 0) return state;
            else return {
                ...state,
                loan: action.payload.amount, 
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount
            }; 
        case "account/payLoan":
            return {...state, loan: 0, loanPurpose: "", balance: state.balance - state.loan}
        default: return state;   //don't throw error like useReducer but return the state
    }
}

function customerReducer(state = initialStateCustomer, action){
    switch(action.type){
        case "customer/createCustomer":
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createdAt: action.payload.createdAt
            }
        case "account/updateName":
            return {
                ...state,
                fullName: action.payload,
            }
        default: return state
    }

}


//const store = createStore(accountReducer);   //accountReducer will be root reducer

// combine all reducer
const rootReducer = combineReducers(
    {
        account: accountReducer,
        customer: customerReducer
    }
)

const store = createStore(rootReducer);


//without using Action creator function
console.log("Hey redux");
store.dispatch({type: 'account/deposit', payload: 500});
console.log(store.getState());
store.dispatch({type: 'account/withdraw', payload: 200});
console.log(store.getState());
store.dispatch({type: 'account/requestLoan', payload: {amount: 1000, purpose: "Buy a car"}});
console.log(store.getState());
store.dispatch({type: 'account/payLoan'});
console.log(store.getState());

// const ACCOUNT_DEPOSIT = "account/deposit";

//Action creator function :- function that return action
function deposit(amount){
    return {
        type: "account/deposit",
        payload: amount
    }
}

function withdraw(amount){
    return {
        type: "account/withdraw",
        payload: amount
    }
}

function requestLoan(amount, purpose){
    return {
        type: "account/requestLoan",
        payload: {amount, purpose},
    }
}

function payLoan(){
    return {
        type: "account/payLoan"
    }
}

//with using Action creator function
store.dispatch(deposit(500));
store.dispatch(withdraw(200));
console.log(store.getState());

store.dispatch(requestLoan(1000, "Buy a cheap car"));
console.log(store.getState());
store.dispatch(payLoan());
console.log(store.getState());

function createCustomer(fullName, nationalID) {
    return {
        type: "customer/createCustomer",
        //we should keep the business logic as much as we can in the reducer function but new date is created here to avoid side effect in reducer
        payload: {fullName, nationalID, createdAt: new Date().toISOString() }
    }
}

function updateName(fullName){
    return {
        type: "account/updateName",
        payload: fullName
    }
}

store.dispatch(createCustomer("Shubham Shinde", "238328957389"))
console.log(store.getState());