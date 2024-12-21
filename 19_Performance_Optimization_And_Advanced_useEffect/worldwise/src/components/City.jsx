// import ButtonBack from "./ButtonBack";
// import styles from "./City.module.css";

import { useParams, useSearchParams } from "react-router-dom";
import { useCities } from "../Contexts/CitiesContext";
import { useEffect } from "react";
import styles from './City.module.css'
import Spinner from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

/* eslint-disable react/prop-types */
function City() {
  console.log("5467 City component re-created");
  const { id } = useParams();

  //useSearchParams() hook to access query parameters
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const { getCity, currentCity, isLoading } = useCities();

  // IMPORTANT
  //getCity useEffect run whenever the getCity function is re-created in context and the dispatch will update the state which causes the re-render again and again
  //getCity function get created that update the useEffect which then call getCity which dispatch and update the state which led to context update and re-creation of getCity function of context and it is used in useEffect it will trigger the re-render

  useEffect(()=>{
    console.log("5467 getCity called", id, getCity);
    getCity(id);
  },[id, getCity])  

  const { cityName, emoji, date, notes } = currentCity;

  console.log(lat, lng);

  if(isLoading) return <Spinner />

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        {/* <ButtonBack /> */}
      </div>
    </div>
  );
}

export default City;
