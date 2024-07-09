import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import StarRating from "./StarRating";

function Text() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      {/* IMPORTANT */}
      {/* passing useState as props */}
      {/* giving ability for external component to get access to internal state */}
      {/* COMPONENT PROPS */}
      <StarRating color="blue" maxRating={10} onSetRating={setMovieRating}></StarRating>
      <p>This movie was rated {movieRating} stars</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* COMPONENT PROPS */}
    <StarRating maxRating={5} messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]} defaultRating={3} />
    <StarRating maxRating={10} size={24} color="red" className="test" />
  </React.StrictMode>
);
