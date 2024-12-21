import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import { useSelector } from "react-redux";

function App() {

  const fullName = useSelector(store => store.customer.fullName);

  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {fullName === "" ?
        <CreateCustomer />
          :
        (
          <>
            <Customer />
            <AccountOperations />
            <BalanceDisplay />
          </>
        )
      }
    </div>
  );
}

export default App;



//Redux(standalone library hence can be also used with vanilla javascript)
//third party library to manage global state in a web app
//react-redux library is easy to integrate.
//All global state is stored in one globally accessible store, which is easy to update using "actions" (like useReducer).
//It is similar to using context API + useReducer.
//Two ways to write :- 1] Classic Redux, 2] Modern Redux Toolkit.

//use when lot of global UI(not from server/remote state) state need to be updated frequently.
//now a days in most of the app global state is remote. so redux is not used.

//useReducer :-
//when we want to update state from event handler we first create action object {type, payload} then we dispatch action to reducer function which 
//uses current state to calculate next state and re-render the component which uses these

//In redux we dispatch using the "ACTION creator function"(a convention(no must) to automate writing action to centralize all possible actions) to store instead to reducer function.
//store is single source of truth of global state it home to one or more reducer.
//Each reducer is a pure function that calculate the next state (state transition) based on he action and the current state. Usually one reducer per app feature (e.g:- shopping cart + user data + theme).


//OLD way code is in BalanceDisplay.js
//useSelector and useDispatch is modern react
//before these hook we had to use Connect API.

//Redux middleware and Thunks :-
//we can make API call in reducer function as they have to be pure.
//redux store only dispatch sync action and update the state.
//middleware(redux thunks) a function that sits between dispatching the action and the store. Allows us to run code after dispatching, but before reaching the reducer in the store.
//store.js code in deposit() method

//Redux ToolKit :-
//The modern and preferred way to writing Redux code.
//An opinionated approach, forcing us to use Redux best practices.
//less code and can combine with classic redux
//1] we can write the code that "mutate" state inside reducers (will be converted to immutable logic behind the scenes by "Immer" library).
//2] Action creator are automatically created
//3] Automatically setup of thunk middleware and DevTools


//Redux vs context API :-

//context API + useReducer :-
//1] Feature :-
//Built in react
//Easy to set up a single context
//Additional state "slide" requires new context set up from scratch ("provider hell" in App.js)
//No mechanism for async operations.         (not for remote sate)
//performance optimization is a pain.
//Only React DevTools
//2] when to use :-
//UseRedux fir global state management in large app.
// When you just need to share a value that doesn't change often [Color theme, preferred language, authenticated user]
//When you need to solve a simple prop drilling problem.
//When you need to manage state in local sub-tree of the app.

//Redux :-
//1] Feature :-
//Requires additional package (large bundle size)
//more work to set up initially
//Once set up, it's easy to create additional state "slices".
//Support middleware for async operations.(thunk).    (not for remote sate)
//performance is optimized out of the box (even wasted render).
//Excellent DevTools

//2] when to use :-
//Use the context API for global state management in small app
//When you have lots of global UI state that needs to be updated frequently (because Redux is optimized for this) [Shopping cart, current tabs, complex filters or search,...]
//When you have complex state with nested objects and arrays (because you can mutate state with Redux Toolkit).
