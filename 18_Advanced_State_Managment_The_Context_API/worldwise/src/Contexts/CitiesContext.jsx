//IMPORTANT :-
//created context for global state management and reduce prop drilling

import { useReducer } from "react";
// import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { createContext } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
};

//IMPORTANT :-
// As reducer are pure function we can't do API call in them
// so we do API call in the event handler function in context and use dispatch function to update data
//two scenario of keeping strcutring data
//1] when dealing with asyc code we have event handler in context and dispatch them in them to update data using reducer then pass these event handler to component to trigger them.
//2] but when working with sync data it is okay to pass dispatch function using context to component then component will have there own event handler that will dispatch to update data in reducer.
function reducer(state, action){
    // our action type should be modeled as event and not as setter i.e:- cities/loaded and not as setCities
    switch(action.type){
        case "loading":
            return {
                ...state,
                isLoading: true
            }
        case "cities/loaded": 
            return {
                ...state,
                isLoading: false,
                cities: action.payload
            }
        case "city/loaded":
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload
            }
        case "city/created":
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload
            }
        case "city/deleted":
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter((city)=>city.id !== action.payload),
            }
        case "rejected": 
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default: throw new Error("Unknown action type"); 
    }
}


/* eslint-disable react/prop-types */
function CitiesProvider({children}){
  const [{cities, isLoading, currentCity, error}, dispatch] = useReducer (reducer, initialState)


  useEffect(function(){
    async function fetchCities(){
      try{
        dispatch({type: "loading"})
        const res = await fetch(`${BASE_URL}/cities`);
        if(!res.ok) throw new Error("");
        const data = await res.json();
        dispatch({
            type: "cities/loaded",
            payload: data
        })
      }
      catch (err){
        console.log(err);
        dispatch({
            type: "rejected", 
            payload: "There was an error loading data..."
        })
      }
      finally{
        // setIsLoading(false);
      }
    }
    fetchCities();
  }, [])

  async function getCity(id){
    // IMPORTANT :-
    //id is coming from URL so it is in string format we have to convert it to number so comparison is correct
    if(Number(id) === currentCity.id)return;

    dispatch({type: "loading"})
    try{
        
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        if(!res.ok) throw new Error("");
        const data = await res.json();
        dispatch({type:"city/loaded", payload: data})
    }
    catch (err){
        console.log(err);
        dispatch({
            type: "rejected", 
            payload: "There was an error loading data..."
        })
    }
    finally{
        // setIsLoading(false);
    }
  }

  async function createCity(newCity){
    try{
        dispatch({type: "loading"})
        const res = await fetch(`${BASE_URL}/cities`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCity)
        });
        if(!res.ok) throw new Error("");
        const data = await res.json();
        // IMPORTANT :-
        // application state in sync with UI
        // UI state in sync with remote
        //setCities(cities => [...cities, data])    //TODO :- better approach is to use react query

        dispatch({type: "city/created", payload: data})
    }
    catch (err){
        console.log(err);
        dispatch({
            type: "rejected", 
            payload: "There was an error loading data..."
        })
    }
    finally{
        // setIsLoading(false);
    }
  }

  async function deleteCity(id){
    try{
        dispatch({type: "loading"})
        await fetch(`${BASE_URL}/cities/${id}`, {
            method: "DELETE"
        });

        // setCities((cities) => cities.filter((city)=>city.id !== id));
        dispatch({type: "city/deleted", payload: id})
    }
    catch (err){
        console.log("There was error deleting the city");
        dispatch({
            type: "rejected", 
            payload: "There was an error loading data..."
        })
    }
    finally{
        // setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider value={
        {
            cities,
            isLoading,
            getCity,  //TODO :- check even if this function do nothing but if called in other Component it will trigger the re-render of that component.
            createCity,
            deleteCity,
            currentCity,
            error
        }
    }>
        {children}
    </CitiesContext.Provider>
  );
}

function useCities(){
    const context =  useContext(CitiesContext);

    // if we try to access the consumer outside of it scope i.e:- you can't use it in App component as it is only avaible to it's children
    if(context === undefined) throw new Error("CitiesContext was used outside the CitiesProvider");
    return context;
}

export {CitiesProvider, useCities};
