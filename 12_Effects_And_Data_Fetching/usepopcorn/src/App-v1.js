import { useState, useEffect, useRef } from "react";
import StarRating from "./StarRating";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster: "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "9425999c";

export default function App() {
  const [query, setQuery] = useState("");
  //const [watched, setWatched] = useState([]);

  //react will can on every render so bad code
  //const [watched, setWatched] = useState(JSON.parse(localStorage.getItem('watched'));
  //OR
  //useEffect(function(){
  //   const storedValue = JSON.parse(localStorage.getItem('watched'));
  //   return storedValue;
  // },[]);
  //OR
  //IMPORTANT
  //LAZY EVALUATION :- pure function and no argument
  //react will call this function on initial render and set the initial value as value return py this callback function and this function don't have any argument
  // const [watched, setWatched] = useState(function(){       
  //   const storedValue = localStorage.getItem('watched');
  //   return JSON.parse(storedValue) || [];
  // });
  //OR
  //Using CUSTOM HOOK
  const [watched, setWatched] = useLocalStorageState([],'watched');
  
  const [selectedId, setSelectedId] = useState(null);
  
  // side effect in render logic (interaction with outside world using fetch)
  // bad practice infinite loop
  // setting state in render logic will rerender the component view and cause to call fetch method again and again infinte loop
  // fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=deadpool`).then((res) => res.json())
  // .then((data) => setMovies(data.Search));

  //Too many re-render
  //setWatched([]);

  //CUSTOM HOOK :-
  //handleCloseMovie is declared like function handleCloseMovie() {} 
  //hence because of hoisting we can use it before it declaration.
  const {movies, isLoading, error} = useMovies(query, handleCloseMovie);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatch(movie){
    setWatched(watched => {
      const newWatchedList = [...watched, movie];
      //localStorage.setItem('watched', JSON.stringify(newWatchedList));
        return newWatchedList;
      }
    )
  }

  //IMPORTANT
  //Instead of writing the code in handleAddWatch() and handleDeleteWatch() to add or remove data from local storage we just created one useEffect that will update local-storage based on the watched list
  // useEffect(function(){
  //   localStorage.setItem('watched', JSON.stringify(watched)); 
  // },[watched])   //run after watched is updated so we get the new value of watched each time

  

  function handleDeleteWatch(id){
    setWatched(watched => {
        const newWatchedList = watched.filter(movie => !(movie.imdbID === id));
        return watched.filter(movie => !(movie.imdbID === id));
      }
    )
  }

  console.log("run during mount, and during every re-render");

  useEffect(function () {
    console.log("run after  mount and after every re-render");
  });

  useEffect(function () {
    console.log("run on after mount");
  }, []);

  useEffect(
    function () {
      console.log("run after mount and after every time when query changes");
    },
    [query]
  );

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        {/* <Box>{isLoading ? <Loader /> : <MovieList movies={movies} />}</Box> */}
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails onCloseMovie={handleCloseMovie} selectedId={selectedId} watched={watched} onAddWatched={handleAddWatch} />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} onDeleteWatch={handleDeleteWatch} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading....</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>🥹</span>
      {message}
    </p>
  );
}

function Box({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen1((open) => !open)}>
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && children}
    </div>
  );
}

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Search({ query, setQuery }) {
  //useRef
  const inputEl = useRef(null);

  //CUSTOM HOOK
  useKey("Enter", function(){
    if(document.activeElement === inputEl.current)return;
    inputEl.current.focus();
    setQuery("");
  });

  //look how we used the the function in custom hook in CUSTOM HOOK
  // useEffect(function (){
  //   function callBack(e){
  //     //As ref only attached to DOM element after the DOM is loaded
  //     console.log(inputEl.current);

  //     //to not clear the input text when it already focused
  //     if(document.activeElement === inputEl.current)return;

  //     if(e.code === "Enter"){
  //       inputEl.current.focus();
  //       setQuery("");
  //     }
  //   }

  //   //IMPORTANT :-
  //   //adding and removing event listener
  //   document.addEventListener("keydown", callBack);
  //   return () => document.removeEventListener("keydown", callBack);
  // },[setQuery])

  function onKeyPress(event){
      if(event.key === 'E'){
        inputEl.current.focus();
      }
  }

  return <input ref={inputEl} onKeyDown={onKeyPress} className="search" type="text" placeholder="Search movies..." value={query} onChange={(e) => setQuery(e.target.value)} />;
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li
      onClick={() => {
        onSelectMovie(movie.imdbID);
      }}
      key={movie.imdbID}
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating ] = useState("");

  //useRef to doesn't reset when component render
  const countRef = useRef(0);

  useEffect(function(){
    if(userRating)
      countRef.current = countRef.current++;  //updating ref value
  },[userRating])

  const watchedMovieIndex = watched.findIndex((movie) => (movie.imdbID === selectedId));
  const isWatched =  watchedMovieIndex > -1;
  const watchedUserRating = isWatched ? watched[watchedMovieIndex].userRating : 0;

  const { Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre } = movie;

  console.log(title, year);
  
  //CUSTOM HOOK
  useKey("Enter", onCloseMovie);

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(function() {
    if(!title) return;
    document.title = `Movie | ${title}`;

    //CLEAN-UP Function
    return function () {
      document.title = "usePopcorn";
      //IMPORTANT :-
      // clean up function run after unmounted so it remember title because of clouser in javascript.
      console.log(`Clean up effect for movie ${title}`);
    };
  }, [title]);   //title is local variable and not props or state 

  function handleAdd(){
    const newWatchMovie = {
      imdbID : selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ")[0]),
      userRating,
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newWatchMovie);
    onCloseMovie();
  }

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating maxRating={10} size={24} setMovieRating={setUserRating} />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>+ Add to list</button>
                  )}
                </>
                ) : (
                  <p>You rated with movie {watchedUserRating} <span>⭐️</span></p>
                )}
              </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched, onDeleteWatch }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} onDeleteWatch={onDeleteWatch} />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatch }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button className="btn-delete" onClick={()=>onDeleteWatch(movie.imdbID)}>X</button>
      </div>
    </li>
  );
}

//Component lifecycle :-
//different phases the specific component instance can go through over time.
//1] Mounted/Initial Render :-
//Component instance is rendered for first time.
//Fresh state and props are created.
//2]Re-render (optional):-(re-render might happen and can not happen )
//i]state changes.
//ii]props changes.
//iii]parent re-render.
//iv]context changes.
//3] UnMount :-
//Component instance is destroyed and removed.
//State and props are destroyed.

//use Effect hook :-
//A side effect is basically any "interaction between a React component and the world outside the component".
//i.e:- Data fetching, setting up subscription, setting up timers, manually accessing the DOM, etc.
//side effect can be created in two places :-
//a] Event Handler  (preferred way):- react to the certain event (onClick, onSubmit, etc).
//b] Effects (useEffect) (mount, re-render or unmount) :- used to synchronized with some external system.

//Dependency Array :-
//By default, effect run after every render as react don't know when to run the effect. We can prevent that by passing a dependency array.
//Each time one of the dependencies changes, the effect will be executed the effect again. and component will re-render.
//Every state variable and prop used inside the effect MUST be included in the dependency array. (otherwise we will give a bug called stale closure).
//1] useEffect(fn, [x,y,z])  // Effect synchronizes with x, y and z      //Runs on mount and re-renders triggered by updating x,y and z
//2] useEffect(fn, [])       // Effect synchronizes with no state/props  //Runs only on mount (initial render)
//3] useEffect(fn)           // Effect synchronizes with everything      //Runs on every render

//Effect run after UI render as they might contain long running task so it need to be asynchronize(fetching data)
//there is another called layout effect is execute before UI render which is rarely used.


//UseEffect cleanup function :-
//Function that we can return from an effect(optional).
//Necessary whenever the side effect keeps happening after the component has been re-render or unmounted.
//component re-render can trigger the event 
//Each useEffect hook should only perform specific/one side effect task.
//USE Case :-
//HTTP request -> cancel request
//API subscription -> cancel subscription
//Start timer  -> stop timer
//Add event Listener -> Remove Listener
//RUN On :-
//1] run before the effect is executed again.
//2] After a component has unmounted.


//React Hooks :-
//special built-in functions that allow us to "hook" into React internals.
//1] Creating and accessing state from Fiber tree.
//2] Registering side effects in Fiber tree.  (by using useState and useEffect)
//3] Manual DOM selections.  (access DOM nodes access context)
//reusing of non-visual logic: we can compose multiple  hooks into our own custom hook.
//past we had component based javascript classes if we want to give component state and accessing to component cycle which is gives some problem
//so they introduce hook which make our functions component to have it own state and run side effects at different life cycle.
//useState,useEffect,useReducer,useContext,useRef,useCallback,useMemo, useTransition, useDeferredValue
//useLayoutEffect, useDebugValue, useImperativeHandle, useId.


//Rules of Hooks :-
//1] Only call hooks at the top level
//Do not call hooks inside conditionals, loops, nested functions, or after an early return
//This is necessary to ensure that hooks are always called in the same order(hooks rely on this)
//2] Only call hooks from React functions
//Only call hooks inside a function component or a custom hook.

//Example :-
//React Element Tree/Virtual DOM ---initial render---> Fiber Tree(Each fiber contain Props,linked list of Hooks).
//so if hook is used in conditional if that condition become false in later re-render then that state is omited in linked list hence it is broken linked list as one middle element is gone.
//hooks are stored in linked list way to call them in same order one after another.


//useRef hook
//"Box"(object) with a mutable .current property that is persisted across renders ("normal" variables are always reset).
//1] Create a variable that stays the same between renders(e.g: previous state, setTimeout id, etc)
//2] Selecting and storing DOM element.
//Refs are for data that is not rendered. usally only appear in event handlers or effects, not in JSX (otherwise use state)
//Do not read write or read .current in render logic (like state).
//updating ref is syncronous and it doesn't re-render component.

//Custom hooks :-
//Allow us to reuse state full logic or multiple hooks,that is non-visual logic among multiple component.
//they use at-least use one or more hooks and return some data in array or object format.
//function name should start with "use" prefix.