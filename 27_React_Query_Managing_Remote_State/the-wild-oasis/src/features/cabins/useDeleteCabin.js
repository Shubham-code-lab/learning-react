import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins"
import toast from "react-hot-toast";

export function useDeleteCabin(){
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
    //if API  fail react query will try to make call again and again for some time to fetch the data
    //
    onError: err => toast.error(err.message)   //error thrown by mutation function deleteCabin
    })

    return { isDeleting, deleteCabin };
}
