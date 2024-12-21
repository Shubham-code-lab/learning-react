import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";


export function useEditCabin(){
    const queryClient = useQueryClient();

    const {mutate: editCabin, isLoading: isEditing} = useMutation({
        //mutationFn only accept one object 
        mutationFn: ({newCabinData, id}) => createEditCabin(newCabinData, id),    //if we want to have pass multiple value to  createEditCabin then we have to do some thing like this 
        onSuccess: () => { //on successful mutation run the function
          toast.success("New cabin successful Edited")
    
          queryClient.invalidateQueries({  //invalidate the query make data in stale state so it can be re-fetched
            queryKey: ["cabins"],
          });
    
        },
        //if API  fail react query will try to make call again and again for some time to updated the data
        onError: err => toast.error(err.message)   //error thrown by mutation function createEditCabin
    });

    return {editCabin, isEditing};
}
