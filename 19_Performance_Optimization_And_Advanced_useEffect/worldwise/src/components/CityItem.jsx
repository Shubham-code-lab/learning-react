import { Link } from 'react-router-dom';
import styles from './CityItem.module.css'
import { useCities } from '../Contexts/CitiesContext';

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));

/* eslint-disable react/prop-types */
function CityItem({ city }) {
    const {currentCity, deleteCity } = useCities();

    const {cityName, emoji, date, id, position } = city;

    function onHandleDelete(event){
        // event.stopPropagation();  //TODO :- why this not work and below one work?
        event.preventDefault();
        deleteCity(id);
    }

    return (
        <li>
            <Link className={`${styles.cityItem} ${(id === currentCity.id)?styles["cityItem--active"]:""}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button className={styles.deleteBtn} onClick={onHandleDelete}>&times;</button>
            </Link>
        </li>
    )
}

export default CityItem
