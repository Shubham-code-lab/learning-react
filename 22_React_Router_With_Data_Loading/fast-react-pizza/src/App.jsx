import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from './ui/Home';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import Order, {loader as orderLoader} from './features/order/Order'
import CreateOrder, {action as createOrderAction} from "./features/order/CreateOrder";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

//createBrowserRouter for data fetching/loading with react router
const router = createBrowserRouter([
  {
    // No path = 'Layout Route' (matches ALL child paths)
    // path: '/',
    element: <AppLayout />,
    //Error element if any error occurs in any child route and not handled it will bubble up to the parent route and it will render the error element
    //Error like loading, action, unknown route or while rendering the page
    errorElement: <Error />, 
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader, //data fetching is fired in router itself and not in component
        errorElement: <Error />, //error element will render in application layout
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: '/order/:orderId',
        loader: orderLoader,
        element: <Order />,
        errorElement: <Error />, 
      }
    ]
  },
])

function App() {
  return (<RouterProvider router={router} />); 
}

export default App;

//smaller application :-

//larger application :- 
//1] Gather application requirements and features.
//2] Divide the application into pages.
// a] Think about the overall and page-level UI.
// b] Break the desired UI into components.
// c] Design and build static version (no state yet).
//3] Divide the application into feature categories.
// a] Think about the state management + data flow.
//4] Decide on what libraries to use (technology decisions).

// Remote state management :-
//react router new way of fetching date right inside react router(v6.4+) that is worth exploring ("render-as-you-fetch") instead of ("fetch-on-render"). Not really state management, as it doesn't persist state.
//we can fetch data into pages and submit date using forms


//Services folder:-
//re-usable code for fetching data from server

//React router :-
//data,fetcher or action fetching
//render-as-you-fetch :- fetch data while rendering the page.
// which is different from fetch-on-render :- fetch data after the page is rendered. (caused data loading waterfall)

//useLoaderData loader function :-
//function fetch data and we use this function in the route element once data arrive it will render the page using custom hooks(useLoaderData)

//useNavigate hook :-
//if one of the navigation is loading, idle or submitting we can't determine which one is loading. hence we have to write it in common file.
//open source contribution idea :- we can have key for each navigation and we can use it to determine which one is loading.

//action :-
//action function that submit data and we use it in the route element
//write or mutate data

//useActionData hook :-
//it is used to get the errors from the action function
