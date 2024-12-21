import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Charger", quantity: 8, packed: false },
// ];

function App() {
  //Lifting Up State so it is shared between children who are sibling
  //const [items, setItems] = useState(initialItems);
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) => items.map((item) => (item.id === id ? { ...item, packed: !item.packed } : item)));
  }

  function handleClearItems() {
    // PROMPT USER using window.confirm method
    const confirm = window.confirm("Are you sure you want to delete all items ?");
    if (confirm) setItems((items) => []);
  }

  return (
    <div className="app">
      <Logo />
      {/* check the naming convention used for event name */}
      <Form onAddItems={handleAddItems} />
      {/* event handler are passed and not the setState(setItems) function */}
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onClearItems={handleClearItems} />
      <Stats items={items} />
    </div>
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

//Derived State :-
//State that is computed form an existing piece of state or from props.
//advantage :- new need to update all indidully and component will note render for each state change
//re-rendering component as parent state change will update and re-calculate those value for derived state again when function is re-executing.

//QUESTION :-
//if usestate from parent compont is updated then all child component will render regardless if we used that props in child component
//how to batch usestate(when both state need be set)
