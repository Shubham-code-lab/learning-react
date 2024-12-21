good practice if possible try to pass event handler and not the setState(setItems) function pass attribute to that function and the funtion decalrion is in parent which set that state












export default function PackingList({ items, onDeleteItem, onToggleItem, onClearItems }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems = [];

  //after re-render we get latest state value
  if (sortBy === "input") sortedItems = items;
}