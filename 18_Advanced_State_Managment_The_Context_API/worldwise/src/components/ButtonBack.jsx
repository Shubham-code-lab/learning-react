import { useNavigate } from "react-router-dom";
import Button from "./Button";

function ButtonBack() {

  // IMPORTANT :-
  //useNavigate() hook used to programmatically navigating 
  // it used to be called useHistory in previous version
    const navigate = useNavigate();

    return (
        <Button 
            type="back" 
            onClick={(e)=>{
            e.preventDefault();
            //passing -1 to navigate back to previous page
            navigate(-1)    
          }
        }>&larr; Back</Button>
    )
}

export default ButtonBack
