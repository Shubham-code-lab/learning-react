import { Link } from 'react-router-dom';
import styles from './CityItem.module.css'

// IMPORTANT 
//helper function
const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));

/* eslint-disable react/prop-types */
function CityItem({ city }) {
    const {cityName, emoji, date, id, position } = city;

    return (
        <li>
            {/* IMPORTANT :- */}
            {/* passing id as dynamic segment/params  */}
            {/* passing query string/parameter */}
            <Link className={styles.cityItem} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button className={styles.deleteBtn}>&times;</button>
            </Link>
        </li>
    )
}

export default CityItem
