import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins"
import toast from "react-hot-toast";

export function useDeleteCabin(){
    //useQueryClient is used to manipulate the query cache data, which is different from the useQuery hook which is used to fetch data
    const queryClient = useQueryClient();

    //mutating data
    const  {isLoading: isDeleting,  mutate: deleteCabin} = useMutation({
    // mutationFn: (id) => deleteCabin(id)
    //OR
    mutationFn: deleteCabinApi,  //check the button we are passing id to the function mutate(cabinId)
    onSuccess: () => { //on successful mutation run the function
        toast.success("cabin successful deleted")

        queryClient.invalidateQueries({  //invalidate the query make data in stale state so it can be re-fetched
        queryKey: ["cabins"],
        })
    },
    //note this for useQuery hook if API  fail react query will try to make call again and again for some time to fetch the data
    //for useMutation we have to add retry: 3, to try again and again.
    onError: err => toast.error(err.message)   //error thrown by mutation function deleteCabin
    })

    return { isDeleting, deleteCabin };
}
