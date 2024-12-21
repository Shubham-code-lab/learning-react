import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin(){

    const queryClient = useQueryClient();

    const {mutate: createCabin, isLoading: isCreating} = useMutation({
        mutationFn: createEditCabin,
        onSuccess: () => { //on successful mutation run the function
        toast.success("New cabin successful Created")

        queryClient.invalidateQueries({  //invalidate the query make data in stale state so it can be re-fetched
            queryKey: ["cabins"],
        });

        
        },
        //if API  fail react query will try to make call again and again for some time to updated the data
        onError: err => toast.error(err.message)   //error thrown by mutation function createEditCabin
    });

  return {isCreating, createCabin};
}