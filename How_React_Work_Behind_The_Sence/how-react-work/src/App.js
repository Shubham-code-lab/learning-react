import { useState } from "react";

const content = [
  {
    summary: "React is a library for building UIs",
    details: "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "State management is like giving state a home",
    details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "We can think of props as the component API",
    details: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

//Return react element
//$$typeof    //it used to protect from cross-site scripting attacks
//Symbol()    //Javascript primitive can't be transmitted by JSON(not from API).
console.log(<DifferentContent test={24} />); //type is DifferentContent

//type is Div
//RAW react element and not component instance.
console.log(DifferentContent());

export default function App() {
  return (
    <div>
      <Tabbed content={content} />
    </div>
  );
}

function Tabbed({ content }) {
  const [activeTab, setActiveTab] = useState(0);
  console.log("Tabbed called");

  return (
    <div>
      <div className="tabs">
        <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
      </div>

      {/* If component is not removed from UI and only props or changed then is not re-initialize hence it state remain same */}
      {/* {activeTab <= 2 ? <TabContent item={content.at(activeTab)} /> : <DifferentContent />} */}

      {/* adding key will now re-initalize component and it state when we switch key */}
      {activeTab <= 2 ? <TabContent item={content.at(activeTab)} key={content.at(activeTab).summary} /> : <DifferentContent />}

      {/* not a component instance */}
      {/* {TabContent({ item: content.at(0) })} */}
    </div>
  );
}

function Tab({ num, activeTab, onClick }) {
  console.log("Tab is called");
  return (
    <button className={activeTab === num ? "tab active" : "tab"} onClick={() => onClick(num)}>
      Tab {num + 1}
    </button>
  );
}

function TabContent({ item }) {
  console.log("TabContent is called");
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  function handleInc() {
    setLikes(likes + 1);
  }

  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}

      <div className="tab-actions">
        <button onClick={() => setShowDetails((h) => !h)}>{showDetails ? "Hide" : "Show"} details</button>

        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleInc}>+</button>
          <button>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        <button>Undo</button>
        <button>Undo in 2s</button>
      </div>
    </div>
  );
}

function DifferentContent() {
  return (
    <div className="tab-content">
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  );
}

//Component(Blue print) is js function used to describe piece of UI that return react element(element tree) written in JXS.
//using this component blueprint react create multiple instance by calling each component function(blue print) each time to create new instance of component in component tree each instance hold it own state and props and has it own life cycle hook.
//each component instance can return one or more react element. we write JSX that is converted into multiple React.CreatElement() function calls that return "react element"(immutable object) which contain all information to create DOM element.
//react element is converted to DOM element to show it in browser.

//Rendering :-
//1]Render is Triggered(By updating state somewhere)
//2]Render phase (call component function and figure out how DOM should be updated) (only inside react)
//3]Commit Phase (React actually writes to the DOM, updating, inserting and deleting elements)
//4]Browser Paint on screen.

//Render is Triggered :-
//1]Initial rendering of the application.
//2]State is updated in one or more component instances (re-render).
//Render are not trigger immediately, but scheduled  for when the js engine has free time.
//There is also batching of multiple setState calls event handlers.

//Rerender phase :-
//Component instances that triggered re-render.

//react will go through entire component tree take component instance that triggered a re-render and actually render them by calling the function.
//these function return react element that make up virtual DOM(Initial render react take entire component tree an convert it to react element tree of all react element(object))
//react create new react element tree or virtual DOM whenever any component change it also re-render the child component regardless of props passed changed or not
//this new virtual DOM get "Reconciliation + Drifting" reconcile with current fiber tree(before state update) to the Updated Fiber tree which is used to render DOM.
//Reconciliation :-
//creating virtual DOM is cheap and fast but writing to actually DOM isn't as only small part of DOM has to updated not all.
//reconciler(react engine/heart) Deciding which DOM element actually need to be inserted, deleted or updated in order to reflect the latest state changes.
//Fiber is reconciler in react
//Fiber tree :- internal tree that has a "fiber" for each component instance and DOM element.
//unlike react element, fiber are not created on every render so it is never destroyed it is just mutated.
//fiber keep track of current state, Props, side effects and Used hooks.
//each fiber also contain queue of work to do like updating state, updating refs, running registered side effects, performing DOM updated and so on which is perform async.
//fiber tree is organised in linked list.
//both react element tree/virtual DOM and fiber tree can also contain HTML elements along with component.
//because of async rendering it also enabled modern feature so-called concurrency feature like Suspense or transitions starting in React 18.

//Diffing :-
//process of comparing element step by step based on the position in the tree is called diffing.
//Rules :-
//1] Two elements of different  types will produce different tree.
//2] Elements with a stable key prop stay the same across renders.
//between two render :-
//element type might change form header to div then all it inner html will get destroyed including state from DOM.
//element doesn't change but it props changes react will not destroy element and child element also there state is not destroy it manipulate update DOM based on porps and attribute changes. to overcome this we can use "key props" we can create new component instane and state.

// key props :-
//Special prop that we use to tell the diffing algorithm  that an element is unique.
//this work for both DOM element and react element.
//we give unique identification to each component instance so as to distinguish between multiple instance of same component.
//so when key stays the same across renders, the element will be kept in the DOM.(even if the position in the tree change). i.e:- key in list(array)
//when key changes between renders, the element will be destroyed and a new one will be created (even if the position in the tree is the same as before)
//so keep "keyProps" when we have multiple child elements of the same type.

//Commit phase :-
//perfomed by library called "ReactDOM" to output it in DOM of browser.
//as this phase is not handle by react we use react with differenct platform "host" i.e :- IOS,android for native development and Remotion for video using "Renderers".
//React writes to the DOM : insertions, deletions and updates (list of DOM updates are "Flushed" to the DOM).
//Committing is synchronous: DOM is updated in one go, it can't be interrupted. This is necessary so that the DOM never shows partial results, ensuring a consistent UI(in sync with state all the time).
