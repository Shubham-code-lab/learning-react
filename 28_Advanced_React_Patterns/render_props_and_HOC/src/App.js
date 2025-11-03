import { useState } from "react";
import { faker } from "@faker-js/faker";
import "./styles.css";
import withToggles from "./HOC";

const products = Array.from({ length: 20 }, () => {
  return {
    productName: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
  };
});

const companies = Array.from({ length: 15 }, () => {
  return {
    companyName: faker.company.name(),
    phrase: faker.company.catchPhrase(),
  };
});

function ProductItem({ product }) {
  return (
    <li className="product">
      <p className="product-name">{product.productName}</p>
      <p className="product-price">${product.price}</p>
      <p className="product-description">{product.description}</p>
    </li>
  );
}

function CompanyItem({ company, defaultVisibility }) {
  const [isVisible, setIsVisisble] = useState(defaultVisibility);

  return (
    <li
      className="company"
      onMouseEnter={() => setIsVisisble(true)}
      onMouseLeave={() => setIsVisisble(false)}
    >
      <p className="company-name">{company.companyName}</p>
      {isVisible && (
        <p className="company-phrase">
          <strong>About:</strong> {company.phrase}
        </p>
      )}
    </li>
  );
}

function List({ title, items, render }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const displayItems = isCollapsed ? items.slice(0, 3) : items;

  function toggleOpen() {
    setIsOpen((isOpen) => !isOpen);
    setIsCollapsed(false);
  }

  return (
    <div className="list-container">
      <div className="heading">
        <h2>{title}</h2>
        <button onClick={toggleOpen}>
          {isOpen ? <span>&or;</span> : <span>&and;</span>}
        </button>
      </div>
      {isOpen && (
        <ul className="list">
          {/* {displayItems.map((product) => (
            <ProductItem key={product.productName} product={product} />
          ))} */}

          {/* RENDER PROPS PATTERN */}
          {displayItems.map(render)}
        </ul>
      )}

      <button onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}>
        {isCollapsed ? `Show all ${items.length}` : "Show less"}
      </button>
    </div>
  );
}


const ProductListWithToggles = withToggles(ProductList);

export default function App() {
  return (
    <div>
      <h1>Render Props Demo</h1>
      <div className="col-2">
        {/* 
          RENDER PROPS PATTERN (Inversion of Control)

          - We pass a function (called a render prop) to the `List` component that tells it *how* to render each item.
          - The `List` component itself does not know what kind of item it's rendering — it simply calls the `render` function passed to it for each item.
          - This allows the `List` component to be reused for different types of data (e.g., products, companies) without modifying its internal logic.
          - The rendering logic is controlled by the parent component (App), making it flexible and reusable.
          - can lead to callback hell
        */}
        <List
          title="Products"
          items={products}
          render={(product) => (
            <ProductItem key={product.productName} product={product} />
          )}
        />
        <List
          title="companies"
          items={companies}
          render={(company) => (
            <CompanyItem
              key={company.companyName}
              company={company}
              defaultVisibility={false}
            />
          )}
        />
      </div>

      {/* HOC */}
      <div className='col-2'>
          <ProductList title={"Products HOC"} items={products}/>
          <ProductListWithToggles title={"Products HOC"} items={products}/>
      </div>
    </div>
  );
}

// LATER: Let's say we got this component from a 3rd-party library, and can't change it. But we still want to add the 2 toggle functionalities to it

// HIGHER ORDER COMPONENT (HOC) :- it is simple component that takes in another component and return a enhanced version of it
function ProductList({ title, items }) {
  return (
    <ul className="list">
      {items.map((product) => (
        <ProductItem key={product.productName} product={product} />
      ))}
    </ul>
  );
}

//render props and HOC difference see when you want don;t have control over external library component (can't modify/ legacy code) you can just wrap a higher order component to control it from outside only
//render props is just used for reusability of a component by passing the render function that has (logic and jsx) handled in parent.
