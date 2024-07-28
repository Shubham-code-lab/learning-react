import { useState } from "react";

export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("..");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    // onSubmit when we hit enter in input field we trigger onSubmit button
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      {/* CONTROLLED ELEMENT */}
      <select
        value={quantity}
        onChange={(event) => {
          setQuantity(parseInt(event.target.value));
        }}
      >
        {/* creating array of length 20 from element 1 to 20 */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      {/* CONTROLLED ELEMENT :- setting it this way we can React able to control this element value instead of DOM */}
      <input type="text" placeholder="Item..." value={description} onChange={(event) => setDescription(event.target.value)}></input>
      <button>Add</button>
    </form>
  );
}
