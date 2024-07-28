import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 8, packed: false },
];

function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🏝 Far Away 🧳</h1>;
}

function Form() {
  const [description, setDescription] = useState("..");
  const [itemCount, setItemCount] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();

    if (!description) return;

    const newItem = { description, itemCount, packed: false, id: Date.now() };
    initialItems.push(newItem);

    setDescription("");
    setItemCount(1);
  }

  return (
    // onSubmit when we hit enter in input field we trigger onSubmit button
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      {/* CONTROLLED ELEMENT */}
      <select
        value={itemCount}
        onChange={(event) => {
          setItemCount(parseInt(event.target.value));
        }}
      >
        {/* creating array of length 20 from element 1 to 20 */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      {/* CONTROLLED ELEMENT :- setting it this way we can React able to control this element value instead of DOM */}
      <input type="text" placeholder="Item..." value={description} onChange={(event) => setDescription(event.target.value)}></input>
      <button>Add</button>
    </form>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      {" "}
      {/* ternary operator for setting style object in react */}
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>&times;</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>🧳 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}

export default App;

//Controlled Element :-
//input field maintain their state inside the DOM (inside the HTML element itself). which make it hard to read.
//using controlled element we can store there value in React instead in DOM so react is able to control them using state.

//State :-
//State is internal data, owned by component.
//Component Memory
//Can be updated by the component itself.
//Updating state can causes component to re-render
//Used to make components interactive.

//props :-
//External data owned by parent component.
//similar to function parameters.
//Read-only.
//Receiving new props causes component to re-render. Usually when the parent's state has been updated.
//Used by parent to configure child component ("settings").

//Thinking in state transitions, not element mutation.
//Break the desired UI into components and establish the component tree.
//Build a static version in React (without state).
//State management :- Deciding when to create pieces of state, what types of state are necessary, where to place each piece of state, and how data flows through the app.
//State :- when to use, types of states local vs global. Where to place each piece of state.
//data flow :- one-way data flow, child-to-parent communication, Accessing global state.

//Local state :-
//State needed only by one or few components (child or sibling).
//State that is defined in a component and only that component an child components have access to it (by passing via props)

//Global state :-
//State that many component might need.
//Shared state that is accessible to every component in the entire application.
//define using :- Context API or Redux.

//Inverse data flow :- Child to parent communication.
