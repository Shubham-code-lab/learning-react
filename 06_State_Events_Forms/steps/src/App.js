import { useState } from "react";

const messages = ["Learn React ⚛️", "Apply for jobs 💼", "Invest your new income 🤑"];

function App() {
  //hook in react are prefixed with 'use' e.g :- useEffect, useReducer, useState.
  //we can't write hook in if statement, another function or inside loop.
  //state should be immutable.
  const [step, setStep] = useState(1);
  const [detail, setDetail] = useState({ name: "Shubham" });
  const [isOpen, setIsOpen] = useState(true);

  const handlePrevious = function () {
    if (step > 1) {
      //UPDATE STATE when we it doesn't based on current state
      //setStep(step - 1);
      //setStep(step - 1);  //will not work as we can't update the state based on the current state

      //now we can update state twice
      //UPDATE STATE based on current state
      setStep((curStep) => curStep - 1);
      setStep((curStep) => curStep - 1);
    }
    setDetail({ name: "Saurabh" });
  };

  const handleNext = function () {
    if (step < 3) setStep(step + 1);
    setDetail({ name: "Jeevan" });
    //as state are immutable we should not update it like this way.
    //detail.name = "Jeevan";
  };

  return (
    <>
      <button className="close" onClick={() => setIsOpen((isOpen) => !isOpen)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <p className="message">
            Step {step}: {messages[step - 1]} {detail.name}
          </p>
          <div className="buttons">
            {/* we have to give reference of the function if write direct code it will get executed directly when component is initialize */}
            {/* <button style={{ backgroundColor: "#7950f2", color: "#fff" }} onClick={() => alert("Hii")} onMouseEnter={() => alert("Hello")}>
          Previous
        </button> */}
            <button style={{ backgroundColor: "#7950f2", color: "#fff" }} onClick={handlePrevious}>
              Previous
            </button>
            <button style={{ backgroundColor: "#7950f2", color: "#fff" }} onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;

//state :-
//Data that a component can hold over time, necessary for information that it needs to remember throughout the app's lifecycle.
//State variable / piece of state :- A Single variable in a component (component state).
//updating component state triggers React to re-render the component view by calling component function again.
//A single component render is called views all views together make up UI.

//State concept :-
//useState
//useReducer
//Context API
//using third party Redux

//Each component has and manages its own state(independent, isolated), no matter how many times we render the same component even on same page.
//with state(and also event handlers and JSX), we view UI as a reflection of data changing over time.
