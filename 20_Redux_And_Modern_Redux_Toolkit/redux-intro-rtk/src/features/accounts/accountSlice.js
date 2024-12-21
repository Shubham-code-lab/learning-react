//IMPORTANT

// create action creator from reducer and easy to write without switch case
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false
}

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        //  account/deposit       //name of the slice  /  name of the reducer function
        deposit(state, action){
            state.balance += action.payload;
            state.isLoading = false;
        },
        withDraw(state, action){
            state.balance -= state.payload;
        },
        // action creator recieve more that one value we have to prepare it 
        requestLoan: {
            prepare(amount, purpose){ // OR we can pass it as object no need to prepare()
                return {   //new payload is send to the reducer
                    payload: {
                        amount,
                        purpose
                    }
                }
            },
            reducer(state, action){
                if(state.loan > 0) return;  //no need to return state it is done by Immer
                
                state.loan = action.payload.amount;
                state.loanPurpose =  action.payload.purpose;   //use prepare to accept second value as well other wise by defualt action creation function only accept one value in it payload
                state.balance = state.balance + action.payload.amount;
            }
        }
        
        ,
        payLoan(state, action){
            state.balance -= state.loan;  //order matter make loan 0 later
            state.loan = 0;

            state.loanPurpose = "";
        },
        convertingCurrency(state){
            state.isLoading = true;
        }
    }
});


//createAsyncThunk function
//OR
//action creation function using thunk come with RKT
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


console.log(accountSlice);
export const { withDraw, requestLoan, payLoan} = accountSlice.actions;

// action creator will return action object but it only console log 1000 beacuase by default it only accept one value by default either pass it as object(one value ) or use prepare()
console.log(requestLoan(1000, "Buy car")); 

export default accountSlice.reducer;
