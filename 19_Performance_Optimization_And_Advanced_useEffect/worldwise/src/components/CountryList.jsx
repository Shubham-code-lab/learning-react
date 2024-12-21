import Spinner from "./Spinner"
import styles from './CountryList.module.css'
import CountryItem from './CountryItem'
import Message from './Message'
import { useCities } from "../Contexts/CitiesContext";

/* eslint-disable react/prop-types */
function CountriesList() {
    const {cities, isLoading} = useCities();

    if(isLoading) return <Spinner />;

    if(!cities.length) return <Message message="Add your first city by clicking on a city on the map" />
    
    const countries = cities.reduce((accCityArray, curCity)=>{
        if(!accCityArray.map(city=>city.country).includes(curCity.country)){
            return [...accCityArray, {country: curCity.country, emoji:curCity.emoji}];
        }
        else {
            return accCityArray
        }
    },[]);
    

    return (
        <ul className={styles.countryList}>
            {countries.map(country => (<CountryItem key={country.country} country={country}/>))}
        </ul>
    )
}

export default CountriesList
