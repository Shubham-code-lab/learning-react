import { useContext, useEffect, useState, createContext, memo } from "react";
import { faker } from "@faker-js/faker";
import { PostProvider, PostContext, usePosts} from "./PostContext";

function createRandomPost() {
  console.log("called");
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

function App() {

  const [isFakeDark, setIsFakeDark] = useState(false);

  // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
  useEffect(
    function () {
      document.documentElement.classList.toggle("fake-dark-mode");
    },
    [isFakeDark]
  );

  return (
    <section>
      <button
        onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
        className="btn-fake-dark-mode"
      >
        {isFakeDark ? "☀️" : "🌙"}
      </button>

      {/* CUSTOM CONTEXT PROVIDER */}
      {/* IMPORTANT */}
      {/* when App re-render it will re-render all component below along with PostProvider hence it's value will be recreated then it value object is recreated resulting in all the component to re-render that are using PostProvider context even they are not in App component   */}
      {/* to solve above please check memoization of value object in PostProvider context file */}
      <PostProvider>
        <Header />
        <Main />
        <Archive />
        <Footer />
      </PostProvider>
    </section>
  );
}

function Header() {
  // Context CONSUMER 
  const { onClearPosts } = usePosts();

  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <div>
        <Results />
        <SearchPosts />
        <button onClick={onClearPosts}>Clear posts</button>
      </div>
    </header>
  );
}

function SearchPosts() {
  // Context CONSUMER 
  const { searchQuery, setSearchQuery } = usePosts();
  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search posts..."
    />
  );
}

function Results() {
  // Context CONSUMER 
  const { posts } = usePosts();

  return <p>🚀 {posts.length} atomic posts found</p>;
}

const Main = memo(
  function Main() {
    const { posts, onAddPost } = usePosts();

    return (
      <main>
        <FormAddPost />
        <Posts />
      </main>
    );
  }
)

function Posts() {
  return (
    <section>
      <List />
    </section>
  );
}

function FormAddPost() {
  const { onAddPost } = usePosts();

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

function List() {
  const { posts } = usePosts();

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

function Archive() {
  const { onAddPost } = usePosts();

  // Here we don't need the setter function. We're only using state to store these posts because the callback function passed into useState (which generates the posts) is only called once, on the initial render. So we use this trick as an optimization technique, because if we just used a regular variable, these posts would be re-created on every render. We could also move the posts outside the components, but I wanted to show you this trick 😉
  const [posts] = useState(() =>
    // 💥 WARNING: This might make your computer slow! Try a smaller `length` first
    Array.from({ length: 10 }, () => createRandomPost())
  );

  const [showArchive, setShowArchive] = useState(false);

  return (
    <aside>
      <h2>Post archive</h2>
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

function Footer() {
  return <footer>
    &copy; by The Atomic Blog ✌️
    </footer>;
}

export default App;


//Context API :-
//all component everywhere in the tree to read state shared by context.
//System to pass data throughout the app without manually  passing props down the tree.
//Allow us to "broadcast" global state to the entire app.
//1] Provider: gives all child components access to value.
//2] value: data that we want to make available (usually state and function)
//3] Consumers: all components that read the provided context value
//whenever the value is updated then all the consumer(component) that use this value get re-render.

//Custom provider and Hook


//Type of state :-
//1] State Accessibility :-
//a] Local STATE :-
//Needed only by one or few components.
//Only accessible component and child components. 
//b] Global State :-
//Might be needed by many components.
//Accessible to every component in the application.

//2] State Domain :-
//a]Remote state :-
//All application data loaded from a remote server(API).
//Usually asynchronous
//Needs re-fectching + updating
//b]UI State :-
//Everything else
//Theme, list filters, form data, etc.
//usually syncronous and stored in the application

//State placement options :-
//use Local state in Local component using useState, useReducer and useRef.
//use Lifting up state in Parent component using useState, useReducer and useRef.
//use Global state (preferably UI state) in Context using Context API + useState or useReducer.
//use Global state (remote or UI) in 3rd party library using Redux, React Query, SWR, Zustand, etc.
//use Global state, passing between pages in URL by using React Router.
//to store data in user's browser use Local storage, session storage, etc store data in user's browser.