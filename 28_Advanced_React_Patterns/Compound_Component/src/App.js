import Counter from "./Counter";
import "./styles.css";

export default function App() {
  return (
    <div>
      <h1>Compound Component Pattern</h1>
      <Counter
        iconIncrease="+"
        iconDecrease="-"
        label="My NOT so flexible counter"
        hideLabel={false}
        hideIncrease={false}
        hideDecrease={false}
      />

      {/* we just have to remove add or re-order as per requirement hence flexible */}
      {/* we use context for component communication and not props */}
      <Counter> 
        {/* we are passing as children props so that they will get access to context inside counter */}
        <Counter.Label>My super flexible counter</Counter.Label>
        <Counter.Increase icon="+" />
        <Counter.Count />
        <Counter.Decrease icon="-" />
      </Counter>


      <div>
        {/* Flexible and no use we use Counter.Increase as sub component outside of Counter */}
      <Counter>
        <Counter.Increase icon="<" />
        <div><Counter.Count /></div>
        <Counter.Decrease icon=">" />
      </Counter>
      </div>
    </div>
  );
}


//Compound component :-
//we can create set of related component that together achieved common task. (modal window, tables, pagination)
// e.g :- parent component with many children components that make sense when only used together.
//In term of html(select element the option element can only be used inside html select element).

//flexible , reusable and no props.