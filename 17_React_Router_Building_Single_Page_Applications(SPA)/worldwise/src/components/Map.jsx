import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'

function Map() {
    // IMPORTANT :-
    //useNavigate() hook used to programmatically navigating 
    // it used to be called useHistory in previous version
    const navigate = useNavigate();

    // IMPORTANT :-
    //useSearchParams() hook to access query parameters
    const [searchParams, setSearchParam] = useSearchParams();

    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    return (
        <div className={styles.mapContainer} onClick={()=>{navigate("form")}}>
            <h1>Map</h1>
            <h1>Position: {lat}, {lng}</h1>
            {/* IMPORTANT */}
            {/* this will update the query parameter in all the component where it is being used */}
            <button onClick={()=>{setSearchParam({lat:23, lng:50})}}>change pos</button>
        </div>
    )
}

export default Map
