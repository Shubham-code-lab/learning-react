import { useEffect, useState } from "react";

const KEY = "9425999c";

//using named export for custom hook not mandatory
export function useMovies(query, callBack){

  const [movies, setMovies] = useState([]);
    //Loading State
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

    //useEffect hook to register an effect doesn't return anything
  //first argument we pass function that we want to run as side effect
  //second argument is dependency array
  //
  useEffect(
    function () {
      //optional chaining on function call so only if exist then call
      callBack?.();

      // IMPORTANT :-
      //AbortController
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          // connect abort function with fetch
          const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal: controller.signal});

          // error handling when user is offline
          if (!res.ok) throw new Error("Something went wrong while fetching the movies");

          const data = await res.json();

          //error handling for movie not found
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          // stalled state so we get old movies value
          console.log(movies);

          //TODO:- For what ?
          setError("");

          //effect can also return clean-up function.
          //called before component re-render or unmount
          return () => console.log("Cleanup");
        } catch (err) {
          
          // when the API get cancel through Abort javascript treat it as error so we have to ignore that 
          if(err.name !== "AbortError"){
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      //when search query length is less then 3 then don't make the api call
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      //handleCloseMovie();
      fetchMovies();

      return function () {
        controller.abort();
      }
    },
    //Dependency Array :-
    //[] //second argument array says :- effect will only run on mount after the render
    [query]
  );

  return {
    movies,
    isLoading,
    error
  };
}