export default function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      {/* CONTROLLED ELEMENT */}
      <input
        type="checkbox"
        value={item.checked}
        onChange={() => {
          onToggleItem(item.id);
        }}
      ></input>
      {/* ternary operator for setting style object in react */}
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      {/*  */}
      <button
        onClick={() => {
          onDeleteItem(item.id);
        }}
      >
        ❌
      </button>
    </li>
  );
}
