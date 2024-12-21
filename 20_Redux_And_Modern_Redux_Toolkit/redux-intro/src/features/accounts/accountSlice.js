//IMPORTANT
const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false
}


//reducer only goal is to calculate the new state using current state and on the received action
//not allowed to modify existing state or not allowed to do any async logic or any side effects.
export default function accountReducer(state = initialStateAccount, action){    //we can set intial state directly like this unlike the useReducer hook
    switch(action.type){
        //case "SET_BALANCE"   //legacy code naming convention
        case "account/deposit": 
            return {...state, balance: state.balance + action.payload, isLoading: false};
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
        case "account/convertingCurrency":
            return {
                ...state,
                isLoading: true
            }
        default: return state;   //don't throw error like useReducer but return the state
    }
}


export function deposit(amount, currency){
    if(currency === "USD")
        return {
            type: "account/deposit",
            payload: amount
        }

    // IMPORTANT
    //middleware
    return async function(dispatch, getState) {
        dispatch({type: "account/convertingCurrency"});

        //API call
        const host = 'api.frankfurter.app';
        const res = await fetch(`https://${host}/latest?amount=${amount}&from=${currency}&to=USD`);
        const data = await res.json();
        const converted = data.rates.USD;
        console.log(data);

        //dispatch action
        dispatch ({
            type: "account/deposit",
            payload: converted
        });
    }
}

export function withdraw(amount){
    return {
        type: "account/withdraw",
        payload: amount
    }
}

export function requestLoan(amount, purpose){
    return {
        type: "account/requestLoan",
        payload: {amount, purpose},
    }
}

export function payLoan(){
    return {
        type: "account/payLoan"
    }
}