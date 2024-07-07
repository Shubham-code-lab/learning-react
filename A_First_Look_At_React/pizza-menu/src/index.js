import React from "react";
import ReactDom from "react-dom/client"; //React v18
//import ReactDom from "react-dom"; //Before React v18

//webpack will inject the css from external css file in this file.
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  //we use className(understand by JSX) instead of class(reserved keyword in HTML)
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  const inlineStyle = {};
  //const inlineStyle = { color: "red", fontSize: "48px", textTransform: "uppercase" };

  //inline style using javascript object
  //return <h1 style={{ color: "red", fontSize: "48px", textTransform: "uppercase" }}>Fast React Pizza Co.</h1>;
  //OR
  return (
    <header className="header">
      <h1 style={inlineStyle}>Fast React Pizza Co.</h1>
    </header>
  );
}

//react function name should be in capital case and it should return null or JSX of one element.
//Destructuring Props.
function Pizza({ pizza }) {
  //console.log(props);

  // CONDITIONAL RENDERING WITH MULTIPLE RETURN
  if (pizza.soldOut) return null;

  return (
    // CONDITIONALLY SETTING CLASS
    <li className={`pizza ${pizza.soldOut ? "sold-out" : ""}`}>
      <img src={pizza.photoName} alt={pizza.name} />
      <h3>{pizza.name}</h3>
      <p>{pizza.ingredients}</p>

      {/* CONDITIONALLY SETTING TEXT */}
      {pizza.soldOut ? <span>SOLD OUT</span> : <span>{pizza.price}</span>}

      {/* <span>{pizza.soldOut ? "SOLD OUT" : pizza.price}</span> */}
    </li>

    // <div>
    //   <img src={props.photoName} alt={props.name} />
    //   <h3>{props.name}</h3>
    //   <p>{props.ingredients}</p>
    //   <span>{props.price + 3}</span>
    // </div>
  );
}

function Menu() {
  const pizzas = pizzaData;

  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {/* CONDITIONAL RENDERING USING && */}
      {/*IMPORTANT :- pizzas.length if return 0 even thou 0 is consider false it will print it in UI as JSX only doesn't print true and false value but can print 0 */}
      {/* {pizzas && pizzas.length > 0 && (
        <ul>
          {pizzaData.map((pizza, index) => (
            <Pizza pizza={pizza} key={index} />
          ))}
        </ul>
      )} */}

      {/*  CONDITIONAL RENDERING USING TERNARIES */}
      {pizzas && pizzas.length > 0 ? (
        // REACT FRAGMENT lets us group some elements without leaving any trace in the HTML tree, so in the DOM.
        <>
          {/* OR React.Fragment if want to add key as property for rendering list */}
          {/* <React.Fragment key="val"></React.Fragment> */}
          <p>Authentic Italian cuisine. 6 creative dishes to choose from. All from our store oven, all organic, all delicious</p>

          <ul>
            {/* Rending List */}
            {/* key is required for uniqueness */}
            {pizzaData.map((pizza, index) => (
              <Pizza pizza={pizza} key={index} />
            ))}
          </ul>
        </>
      ) : (
        //   we also write null for OR condition of turnary
        //   null
        <p>We're still working on our menu. Please come back later :</p>
      )}

      {/* <Pizza name={pizzaData[0].name} ingredients={pizzaData[0].ingredients} photoName={pizzaData[0].photoName} price={pizzaData[0].price} /> */}
      {/* price us string 10 */}
      {/* <Pizza name={pizzaData[1].name} ingredients={pizzaData[1].ingredients} photoName={pizzaData[1].photoName} price="99" /> */}
      {/* price us integer 10 */}
      {/* <Pizza name={pizzaData[2].name} ingredients={pizzaData[2].ingredients} photoName={pizzaData[2].photoName} price={99} /> */}
    </main>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);
  //   if () alert("we're currently open!");
  //   else alert("Sorry we are closed!");
  console.log(hour);
  //return <footer className="footer">{new Date().toLocaleTimeString()}. We're currently open</footer>;

  // CONDITIONAL RENDERING WITH MULTIPLE RETURN
  if (!isOpen) {
    return (
      <p>
        We're happy to welcome you between {openHour}:00 and {closeHour}:00{" "}
      </p>
    );
  }

  //React doesn't render true or false value in UI
  return (
    <footer className="footer">
      {/* CONDITIONAL RENDERING USING && */}
      {/* in javascript mode we are returning JSX hence this work */}
      {/* {isOpen && (
        <div className="order">
          <p>We're open until until {closeHour} :00. COme visit us or order online</p>
          <button className="btn">Order</button>
        </div>
      )} */}

      {/*  CONDITIONAL RENDERING USING TERNARIES */}
      {isOpen ? (
        <Order closeHour={closeHour} openHour={openHour} />
      ) : (
        <p>
          We're happy to welcome you between {openHour}:00 and {closeHour}:00.
        </p>
      )}

      {/* this true is not render to UI */}
      {true}
    </footer>
  );

  //without JSX
  //return React.createElement("footer", null, "We're currently open!");
}

function Order({ closeHour, openHour }) {
  return (
    <div className="order">
      <p>
        We're open until until {closeHour}:00 to {openHour}:00. Come visit us or order online
      </p>
      <button className="btn">Order</button>
    </div>
  );
}

//React v18
const root = ReactDom.createRoot(document.getElementById("root"));
//root.render(<App />);

//String mode :-
//Render component twice during development for error checking.
//and also check for outdated use of doc.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//React before 18
//ReactDom.render(<App />, document.getElementById("root"));

//React Applications are entirely made out of components
//react render a view for each component and all these view create a webpage (UI)
//Each component has it own Data, Logic and Appearance.

//JSX is extension of javascript. it is declarative approach that allow us to embed Javascript, CSS and React components into HTML.
//Babel is used to convert Each JSX element into React.createElement nested function call.(hence we can write react without jsx).
//content and logic are coupled and co-located together [React + Component JSX]. Angular (separation of concern is based on separation of HTML, Javascript and css for a given component) React,Vue (separation of concern is based on component separation).

//being library it doesn't have preferred way to style component many option are there :- inline style , external css, SASS files, css Module, styled component , Tailwind.

//props :-
//pass data from parent to child which create communication between two component.
//parent component configure and customize the child component.
//props data is only updated in parent component. hence they are immutable in child component.
//state is internal data that can be updated by the component's logic.
//React is all about pure function. so updating props outside of parent component will create side effect(not pure).
//one-way data flow data only passed from parent to child

//JSX Rule :-
//JSX work like HTML but we can enter javascript mode by using {} (for text and attribute).
//we can write Javascript expression inside {}. e.g :- reference variables, create arrays or objects, [].map(), ternary operator.
//statement are not allowed (if/else, for, switch).
//A piece of JSX can only have one root element. If you need more, use <React.Fragment> (or the short <>).
