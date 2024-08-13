import { useNavigate } from 'react-router-dom'
// import {  useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'
import {MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents} from "react-leaflet"
import { useCities } from '../Contexts/CitiesContext';
import { useEffect } from 'react';
import { useState } from 'react';
import { useGeolocation } from '../hooks/useGeoLocation';
import Button from './Button';
import { useUrlPosition } from '../hooks/useUrlPosition';

function Map() {
    // IMPORTANT :-
    //useNavigate() hook used to programmatically navigating 
    // it used to be called useHistory in previous version
    // const navigate = useNavigate();
    const {cities} = useCities(); 

    // IMPORTANT :-
    //useSearchParams() hook to access query parameters
    // const [searchParams, setSearchParam] = useSearchParams();

    const [mapPosition, setMapPosition] = useState([40,0]);

    // IMPORTANT
    // useGeolocation() return isLoading but we renamed it to isLoadingPosition
    const {isLoading: isLoadingPosition, position: getLocationPosition,  getPosition} = useGeolocation();

    const [mapLat, mapLng] = useUrlPosition();

    useEffect(function (){
        if(mapLat && mapLng)setMapPosition([mapLat, mapLng]);
    },[mapLat,mapLng])


    useEffect(function(){
        if(getLocationPosition) setMapPosition([getLocationPosition.lat,getLocationPosition.lng]);
    },[getLocationPosition])

    return (
        <div className={styles.mapContainer}>
            {/* IMPORTANT */}
            {/* this will update the query parameter in all the component where it is being used */}
            {/* <button onClick={()=>{setSearchParam({lat:23, lng:50})}}>change pos</button> */}

            <Button type="position" onClick={getPosition}>{isLoadingPosition? "Loading": "Use your position"}</Button>

            {/* center={[mapPosition]} doesn't work when the query parameter changes so we have to create our own component i.e :- "ChangeCenter" */}
            <MapContainer 
                center={mapPosition} 
                zoom={13} 
                scrollWheelZoom={true} 
                className={styles.map}
            >
                {/* Map Styles */}
                {/* url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" */}
                {/* url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" */}
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) =>(
                    <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                    <Popup>
                        <span>
                            {city.emoji}
                        </span>
                        <span>
                            {city.cityName}
                        </span>
                    </Popup>
                    </Marker>
                ))}
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    )
}

/* eslint-disable react/prop-types */
function ChangeCenter({position}){
    // leaflet hook
    const map = useMap();
    map.setView(position);
    return null;  //component returning null
}

function DetectClick(){
    const navigate = useNavigate();

    useMapEvents({
        click: (event) => {
            console.log("e");
            navigate(`form?lat=${event.latlng.lat}&lng=${event.latlng.lng}`);
        },
    })
}

export default Map
