import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";


export function useCabin(){
    // IMPORTANT
  // isLoading, status and bunch API status related info we get on this object
  // change in isLoading, data, success will cause re-render of the component
  const {isLoading, data: cabins, isStale} = useQuery({
    queryKey: ['cabins'],  // "cabins" is key to identify data using this key we can access cached data in other component
    // queryFn: fetch("something")
    // OR
    queryFn: getCabins
  })

  return {isLoading, cabins};
}