import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";


export function useCabin(){
  const {isLoading, data: cabins, isStale} = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins
  })

  return {isLoading, cabins};
}