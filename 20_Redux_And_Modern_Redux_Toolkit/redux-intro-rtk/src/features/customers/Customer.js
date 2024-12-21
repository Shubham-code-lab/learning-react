import { useSelector } from "react-redux";

function Customer() {
  //IMPORTANT
  // we should do computation or data manipulation in the function that is passed to the useSelector
  //userSelector create subscription to the store so whenever the data changes it re-render this component
  const customer = useSelector(store => store.customer.fullName);

  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
