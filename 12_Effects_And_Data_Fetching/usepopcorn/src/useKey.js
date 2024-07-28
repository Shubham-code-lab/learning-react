import {  useEffect } from "react";

export function useKey(key, action){
    //useEffect is also called escape hatch as we perform vanilla javascript code inside it
    //clear function for HTMl event listener.
    useEffect(function(){
        const callBack = function(e) {
            if(e.code.toLowerCase() === key.toLowerCase()){
            action();
            console.log("CLOSING on key press");
            }
        }

        document.addEventListener('keydown', callBack);

        return function(){
            document.removeEventListener('keydown', callBack);
        }
        }, [action, key]);//TODO :- explained latter in course
}