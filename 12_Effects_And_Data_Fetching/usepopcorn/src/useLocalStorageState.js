import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key){

    const [value, setValue] = useState(function(){       
        const storedValue = localStorage.getItem(key);
        return storedValue  ? JSON.parse(storedValue) : initialState;
    });

    //IMPORTANT
    //Instead of writing the code in handleAddWatch() and handleDeleteWatch() to add or remove data from local storage we just created one useEffect that will update local-storage based on the watched list
    useEffect(function(){
        console.log("set local", value);
        localStorage.setItem(key, JSON.stringify(value)); 
    },[value,key])   //run after watched is updated so we get the new value of watched each time

    return [value, setValue];
}