import {  useSearchParams } from 'react-router-dom'

export function useUrlPosition(){

    // IMPORTANT :-
    //useSearchParams() hook to access query parameters
    // const [searchParams, setSearchParam] = useSearchParams();
    const [searchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    return [lat, lng];
}