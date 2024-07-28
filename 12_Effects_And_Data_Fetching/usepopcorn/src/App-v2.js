import { useState, useEffect } from "react";
import StarRating from "./StarRating";

const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "9425999c";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal: controller.signal});

          if (!res.ok) throw new Error("Something went wrong while fetching the movies");

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          console.log(movies);

          setError("");

          return () => console.log("Cleanup");
        } catch (err) {
          
          if(err.name !== "AbortError"){
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      handleCloseMovie();
      fetchMovies();

      return function () {
        controller.abort();
      }
    },
    [query]
  );

  


  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatch(movie){
    setWatched(watched => [...watched, movie])
  }

  function handleDeleteWatch(id){
    setWatched(watched => watched.filter(movie => !(movie.imdbID === id)))
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
  return <input className="search" type="text" placeholder="Search movies..." value={query} onChange={(e) => setQuery(e.target.value)} />;
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
  //value passed to useState() is only used for initial render
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating ] = useState("");

  const watchedMovieIndex = watched.findIndex((movie) => (movie.imdbID === selectedId));
  const isWatched =  watchedMovieIndex > -1;
  const watchedUserRating = isWatched ? watched[watchedMovieIndex].userRating : 0;

  const { Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre } = movie;

  // IMPORTANT :-
  //1] useState hook is removed from the linked-list of hooks after the condition become false.
  //we can temporarily disable ESlint
  /* eslint-disable */
  //if(imdbRating > 8) [isTop, setIsTop] = useState(true);  //setting hook on condition.
  //OR you think of doing like this 
  //const [isTop, setIsTop] = useState(imdbRating > 8);   //but imdbRating will be undefined hence false
  // OR to fix above using useEffect
  // useEffect(function(){
  //   setIsTop(imdbRating > 8);
  // },[imdbRating])
  //OR best solution using derived state
  const isTop = imdbRating > 8;

  //2] don't call return before other hooks
  //if(imdbRating > 8) return <p>Greatest ever!</p>;


  //updating state is async so we have to use callback function to update state in certain situation.
  const [avgRating, setAvgRating] = useState(0);
  const [test1, setTest1] = useState("test1");
  const [test2, setTest2] = useState("test2");

  console.log(title, year);

  useEffect(function(){
    const callBack = function(e) {
      if(e.code === 'Escape'){
        onCloseMovie();
        console.log("CLOSING on key press");
      }
    }

    document.addEventListener('keydown', callBack);

    return function(){
      document.removeEventListener('keydown', callBack);
    }
  }, [onCloseMovie]);//TODO :- explained latter in course

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
    return function () {
      document.title = "usePopcorn";
      console.log(`Clean up effect for movie ${title}`);
    };
  }, [title]);   

  function handleAdd(){
    const newWatchMovie = {
      imdbID : selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ")[0]),
      userRating,
    };
    onAddWatched(newWatchMovie);
    // onCloseMovie();

    setAvgRating(Number(imdbRating));       //we are using the old imdbRating value 

    //updating both value in different way
    setTest1("updated test1");
    setTest2(()=>"updated test2");

    console.log("test1 and test2 in event handler", test1, test2);
    setAvgRating((avgRating)=>{
      console.log("test1 and test2 in set useState", test1, test2);     //both values are old value
      console.log("in setAvgRating", avgRating , userRating);           //
      return (avgRating + userRating) /  2
    }
    ); //using callback function we will get the the latest value of the avgRating
    alert(avgRating);   //updated value will be available in next render
  }

  console.log("avgRating is on component level ",avgRating);
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

          <p>{avgRating}</p>

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

//Example :-
//React Element Tree/Virtual DOM ---initial render---> Fiber Tree(Each fiber contain Props,linked list of Hooks).
//so if hook is used in conditional if that condition become false in later re-render then that state is omited in linked list hence it is broken linked list as one middle element is gone.
//hooks are stored in linked list way to identity each hook by number.
