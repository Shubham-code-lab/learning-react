import { useAuth } from "../Contexts/FakeAuthContext";
import { useNavigate } from"react-router-dom";
import { useEffect } from "react";

/* eslint-disable react/prop-types */
function ProtectedRoute({children}){
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(function(){
        if(!isAuthenticated) navigate("/");
    },[isAuthenticated, navigate])

    return isAuthenticated ? children : null;
}

export default ProtectedRoute;