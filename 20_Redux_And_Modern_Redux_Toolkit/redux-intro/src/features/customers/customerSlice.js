//IMPORTANT
const initialStateCustomer = {
    fullName: "",
    nationalID: "",
    createdAt: ""
}

export default function customerReducer(state = initialStateCustomer, action){
    switch(action.type){
        case "customer/createCustomer":
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createdAt: action.payload.createdAt
            }
        case "customer/updateName":
            return {
                ...state,
                fullName: action.payload,
            }
        default: return state
    }

}


export function createCustomer(fullName, nationalID) {
    return {
        type: "customer/createCustomer",
        //we should keep the business logic as much as we can in the reducer function but new date is created here to avoid side effect in reducer
        payload: {fullName, nationalID, createdAt: new Date().toISOString() }
    }
}

export function updateName(fullName){
    return {
        type: "customer/updateName",
        payload: fullName
    }
}