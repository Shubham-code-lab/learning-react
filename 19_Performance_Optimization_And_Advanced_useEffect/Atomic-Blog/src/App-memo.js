import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { faker } from "@faker-js/faker";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

function App() {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isFakeDark, setIsFakeDark] = useState(false);

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;


  function handleClearPosts() {
    setPosts([]);
  }

  // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
  useEffect(
    function () {
      document.documentElement.classList.toggle("fake-dark-mode");
    },
    [isFakeDark]
  );

  // IMPORTANT :-
  //object and function will break the memo so we have to use useMemo to tell react when the 

  // IMPORTANT :-
  // useMemo to memoize object :-
  // useMemo will memoize the result of the callback function passed
  // if we don't pass posts in dependecies it will act like stale clouser as it only know the value of that object the is return only from inital render so it will never update when posts changes
  const archiveOptions = useMemo(()=>{
    return {
      show: false,
      title: `Post archive in addition to ${posts.length} main posts`
    }
  },[posts.length]);  //only re-render when component initial render and when dependecies passed changes it will execute again 
  // always best to have primitives in the dependencies array

  // IMPORTANT :-
  // useCallback to memoize function :- 
  // useCallback will not call the passed function but instead just memoize it.
  const handleAddPost = useCallback(function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);           //no dependencies required as we only used it in state setter function
    // console.log(posts);    //if we used posts in the handleAddPost function then we have to add it as dependcies 
  },[])//no dependencies posts required as we only used it in state setter function
  //also setPosts is not included in dependcies array as setter function are already memoized internally.

  return (
    <section>
      <button
        onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
        className="btn-fake-dark-mode"
      >
        {isFakeDark ? "☀️" : "🌙"}
      </button>

      <Header
        posts={searchedPosts}
        onClearPosts={handleClearPosts}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Main posts={searchedPosts} onAddPost={handleAddPost} />
      {/* <Archive onAddPost={handleAddPost} /> */}
      {/* <Archive show={false} /> */}
      <Archive 
        archiveOptions={archiveOptions}
        onAddPost={handleAddPost}
        setIsFakeDark={setIsFakeDark}
      />
      {/* react garunties that the set function of isFakeDark always garuntiess stable identities (will not change on renders). as setsetter function are already memoize */}
      {/* so it okay to not includes these setter function in the hooks i.e :- useEffect,useCallback, useMemo */}
      <Footer />
    </section>
  );
}

function Header({ posts, onClearPosts, searchQuery, setSearchQuery }) {
  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <div>
        <Results posts={posts} />
        <SearchPosts
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <button onClick={onClearPosts}>Clear posts</button>
      </div>
    </header>
  );
}

function SearchPosts({ searchQuery, setSearchQuery }) {
  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search posts..."
    />
  );
}

function Results({ posts }) {
  return <p>🚀 {posts.length} atomic posts found</p>;
}

function Main({ posts, onAddPost }) {
  return (
    <main>
      <FormAddPost onAddPost={onAddPost} />
      <Posts posts={posts} />
    </main>
  );
}

function Posts({ posts }) {
  return (
    <section>
      <List posts={posts} />
    </section>
  );
}

function FormAddPost({ onAddPost }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!body || !title) return;
    onAddPost({ title, body });
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Post body"
      />
      <button>Add post</button>
    </form>
  );
}

function List({ posts }) {
  return (
    <ul>
      {posts.map((post, i) => (
        <li key={i}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}

// IMPORTANT
// memo function return new component
// passing object or function as props breaks memo.
const Archive = memo(function Archive({ archiveOptions, onAddPost, setIsFakeDark }) {
  // Here we don't need the setter function. We're only using state to store these posts because the callback function passed into useState (which generates the posts) is only called once, on the initial render. So we use this trick as an optimization technique, because if we just used a regular variable, these posts would be re-created on every render. We could also move the posts outside the components, but I wanted to show you this trick 😉
  const [posts] = useState(() =>
    // 💥 WARNING: This might make your computer slow! Try a smaller `length` first
    Array.from({ length: 30000 }, () => createRandomPost())
  );
  console.log("Archive");

  const [showArchive, setShowArchive] = useState(archiveOptions.show);

  return (
    <aside>
      <h2>{archiveOptions.title}</h2>
      <button onClick={() => setShowArchive((s) => !s)}>
        {showArchive ? "Hide archive posts" : "Show archive posts"}
      </button>

      {showArchive && (
        <ul>
          {posts.map((post, i) => (
            <li key={i}>
              <p>
                <strong>{post.title}:</strong> {post.body}
              </p>
              <button onClick={() => onAddPost(post)}>Add as new post</button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
)

function Footer() {
  return <footer>&copy; by The Atomic Blog ✌️</footer>;
}

export default App;



// Performance optimization tool :-
// 1] Prevent Wasted Renders
    // a] memo
    // b] useMemo
    // c] useCallback
    // d] Passing elements as children or regular prop
// 2] Improve App speed/responsiveness
    // a] useMemo
    // b] useCallback
    // c] useTransition
// 3] Reduce Bundle size
    // a] Using fewer 3rd-party packages
    // b] Code splitting and lazy loading

// Component will re-render when it's state, context or parent re-render.
// prop changes when parent re-render hence component re-render.
// A render does not mean that the DOM actually gets updates, it just means the component function get called. But this can be an expensive operation.
//Wasted Render :- A render that didn't produce any change in the DOM. (problem when too many time or when component is slow).



//Memoization :-
//Optimization technique that executes a pure function once, and saves the result in memory. IF we try to execute the function
//again with the same arguments as before, the previously saved result will be returned, without executing the function again.

//1] Memoize components with memo :-
//Used to create a component that will not re-render when its  parent re-renders, as long as the props stay the same between render
//Only affects props! A memoized component will still re-render when its own state changes or when context that it's subscribing to changes.
//Only make sense when the component is heavy (slow rendering), re-render often, and does so with the same props.
//2] Memoize objects with useMemo
//3] Memoize functions with useCallback


//when Component instance is re-render everything is re-created on every render (including objects and functions)
//In javascript two objects and functions that look the same, are actually different {} != {}
//If objects or functions are passed as props, the child component will always see them as props on each re-render.
//If props are different between re-renders, memo will not work.

//useMemo and useCallback
//Used to memoize values (useMemo) and functions (useCallback) between renders.
//Values passed into useMemo and useCallback will be stored in memory ("cached") and returned in subsequent re-render, as long as dependencies ("input") stay the same.
//useMemo and useCallback have a dependency array (like useEffect): whenever one dependency changes, the value will be re-created.