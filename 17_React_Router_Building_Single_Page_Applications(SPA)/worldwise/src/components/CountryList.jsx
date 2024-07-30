import Spinner from "./Spinner"
import styles from './CountryList.module.css'
import CountryItem from './CountryItem'
import Message from './Message'

/* eslint-disable react/prop-types */
function CountriesList({cities, isLoading}) {

    if(isLoading) return <Spinner />;

    if(!cities.length) return <Message message="Add your first city by clicking on a city on the map" />

    //IMPORTANT
    // country data is only used in this component only so we write derived state in this compoent and not in parent compoent i.e :- App.jsx  hence lesss re-render
    
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
