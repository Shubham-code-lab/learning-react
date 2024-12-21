
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { createContext } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

/* eslint-disable react/prop-types */
function CitiesProvider({children}){
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function(){
    async function fetchCities(){
      try{
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        if(!res.ok) throw new Error("");
        const data = await res.json();
        setCities(data);
      }
      catch (err){
        console.log(err);
      }
      finally{
        setIsLoading(false);
      }
    }
    fetchCities();
  }, [])

  async function getCity(id){
    try{
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        if(!res.ok) throw new Error("");
        const data = await res.json();
        setCurrentCity(data);
    }
    catch (err){
        console.log(err);
    }
    finally{
        setIsLoading(false);
    }
  }

  async function createCity(newCity){
    try{
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCity)
        });
        if(!res.ok) throw new Error("");
        const data = await res.json();
        setCities(cities => [...cities, data])    //TODO :- better approach is to use react query
    }
    catch (err){
        console.log(err);
    }
    finally{
        setIsLoading(false);
    }
  }

  async function deleteCity(id){
    try{
        setIsLoading(true);
        await fetch(`${BASE_URL}/cities/${id}`, {
            method: "DELETE"
        });

        setCities((cities) => cities.filter((city)=>city.id !== id));
    }
    catch (err){
        console.log("There was error deleting the city");
    }
    finally{
        setIsLoading(false);
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
            currentCity
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
