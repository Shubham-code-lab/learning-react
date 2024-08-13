import { useAuth } from "../Contexts/FakeAuthContext";
import { useNavigate } from"react-router-dom";
import { useEffect } from "react";

// IMPORTANT :-
//we can create route-gaurd like this 

/* eslint-disable react/prop-types */
function ProtectedRoute({children}){
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(function(){
        if(!isAuthenticated) navigate("/");
    },[isAuthenticated, navigate])

    // IMPORTANT :-
    // to fix user component to stop render when not authenticated to 
    return isAuthenticated ? children : null;
}

export default ProtectedRoute;