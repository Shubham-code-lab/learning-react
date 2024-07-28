import { useState, useReducer } from "react";


const initialState = {count: 0, step: 1};

//in reducer we write separated state updating logic
//state :- is current value of count
//action :- is what ever we passed through using dispatch function.
function reducer(state, action){
  console.log(state, action);
  // if(action.type === "inc") return state + 1;
  // if(action.type === "dec") return state -  1;
  // if(action.type === "setCount") return action.payload;
  // return  state + action;  //return value will become the next state then component re-render and UI reflect changes

  switch(action.type){
    case "dec":
      return {...state, count: state.count - state.step};
    case "inc":
      return {...state, count: state.count + state.step};
    case "setCount":
      return {...state, count: action.payload};
    case "setStep":
      return {...state, step: action.payload};
    case "reset":
      return initialState;  //resetting all state
    default: 
      throw new Error('Unknown action');
  }
}

function DateCounter() {
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);

  //IMPORTANT :-
  //useReducer will take two argument
  //first :- reducer function  i.e :- reducer
  //second :- initial state  i.e :- 0
  //useReducer will return :-
  //1] count the current state
  //2] dispatch used to update state
  //const [count, dispatch] = useReducer(reducer, initialState);
  
  const [state, dispatch] = useReducer(reducer, initialState);
  const {count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    // setCount((count) => count - step);

    // dispatching the  action object to the reducer
    dispatch({type: "dec"});
  };

  const inc = function () {
    // setCount((count) => count + 1);
    // setCount((count) => count + step);

    dispatch({type: "inc"});
  };

  const defineCount = function (e) {
    //setCount(Number(e.target.value));

    //convention (not mandatory) :-
    //type and payload.
    dispatch({type: "setCount", payload: Number(e.target.value)});
  };

  const defineStep = function (e) {
    //setStep(Number(e.target.value));

    dispatch({type: "setStep", payload: Number(e.target.value)});
  };

  const reset = function () {
    //setCount(0);
    //setStep(1);

    dispatch({type: "reset"})
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;


//useReducer hook behave just like array reduce method, accumulate all action in one single state
//useReducer work with reducer function that take previous state and action as argument and return state

//State management with useState is not enough in certain situations. but the useReducer is good :-
//1]When components have a lot of state variables and state updates, spread across many event handlers all over the component.
//2]Multiple state updates need  to happen at the same time (as a reaction to the same event, like  "starting a game").
//3] When updating one piece of state depends on one or more multiple other piece of state.

//Good for complex and state and related pieces of state.
//store related pieces of state in state object.
//useReducer needs reducer: function containing all logic to update state. Decouples state logic from component
//reducer: pure function(no side effect) that takes current state and action, and returns the next state. (no mutation of state and not interaction with outside world)
//action: object that describes how to update state.
//dispatch: function to trigger state updates, by "sending" actions from event handlers to the reducer.