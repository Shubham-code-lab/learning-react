// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate} from 'react-router-dom'

import styles from "./Form.module.css";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../Contexts/CitiesContext";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

/* eslint-disable react/prop-types */
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  // IMPORTANT
  console.log("If Form component not is not using useContext so it will not re-render if context data is updated");

  const [mapLat, mapLng] = useUrlPosition();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);

  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  const [emoji, setEmoji] = useState();
  const [geocodingError, setGeocodingError] = useState("");


  useEffect(function(){
    if(!mapLat && !mapLat) return;
    
    async function fetchCityData(){
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError("");

        const res = await fetch(`${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`);
        // if(!res.ok) throw new Error("failed to fetch cities data");
        const data = await res.json();

        if(!data.countryCode) throw new Error("doesn't seem to be city. Click somewhere else 🙃");

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      }catch(err){
        console.log(err);
        setGeocodingError(err.message);
      }
      finally{
        setIsLoadingGeocoding(false)
      }
    }
    fetchCityData();
  }, [mapLat, mapLng]);

  // IMPORTANT 
  //event handler function can also be async function.
  async function handleSubmit(e){
    e.preventDefault();

    if(!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position:{
        lat: mapLat,
        lng: mapLng
      }
    }

    await createCity(newCity);
    navigate("/app/cities");   //which redirect to /app/cities due to path match redirection
  }

  if(isLoadingGeocoding) return <Spinner />

  if(!mapLat && !mapLng) return <Message message="start by clicking anywhere on the map" />;

  if(geocodingError) return <Message message={geocodingError} />

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <div>{country}</div>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        {/* IMPORTANT */}
        {/* in react we use htmlFor instead of for property */}
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker id="date" onChange={date => setDate(date)} selected={date} dateFormat="dd/MM/yyyy" />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        {/* IMPORTANT */}
        <Button type="primary">Add</Button>
        
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
