import { connect } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay({ balance }) {
  // now we can use that balance coming from state
  return <div className="balance">{formatCurrency(balance)}</div>;
}

// IMPORTANT :-
// OLD way to access redux store
function mapStateToProps(state){
  // return object that contain name of props that our component recieve
  return {
    balance: state.account.balance
  }
}

//connect() take a function i.e:-mapStateToProps then connect() function return new function that recieve component as argument
export default connect(mapStateToProps)(BalanceDisplay);
// export default BalanceDisplay;
