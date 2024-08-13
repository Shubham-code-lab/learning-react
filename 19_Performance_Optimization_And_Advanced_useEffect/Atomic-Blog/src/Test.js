import { useState } from "react";

function SlowComponent() {
  console.log("SlowComponent re-render");

  // If this is too slow on your maching, reduce the `length`
  const words = Array.from({ length: 100_000 }, () => "WORD");
  return (
    <ul>
      {words.map((word, i) => (
        <li key={i}>
          {i}: {word}
        </li>
      ))}
    </ul>
  );
}

// children component will not render 
function Counter({children}){
  console.log("Counter re-render");

  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Slow counter?!?</h1>
      <button onClick={() => setCount((c) => c + 1)}>Counter Increase: {count}</button>
      {children}
    </div>
  ); 
}

export default function Test() {
  const [count, setCount] = useState(0);
//   return (
//     <div>
//       <h1>Slow counter?!?</h1>
//       <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
//       {/* SlowComponent will render */}
//       <SlowComponent />       
//     </div>
//   );

  return (
    <div>
      <h1>Slow counter?!?</h1>
      <button onClick={() => setCount((c) => c + 1)}>Test Increase: {count}</button>
      {/* IMPORTANT */}
      {/* OPTIMIZATION STICK USING CHILDREN PROPS */}
      {/* counter will get re-render when state within it updates */}
      <Counter>
        {/* SlowComponent will not re-render as as it is child of Test and not of Counter */}
        {/* SlowComponent will not re-render as it is already created before passing it as children props to Counter so they don't when Counter re-render */}
        <SlowComponent  />
      </Counter>
    </div>
  );
}
