import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'

import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Homepage from './pages/Homepage';
import PageNotFound from './pages/PageNotFound';
import AppLayout from "./pages/AppLayout";
import Login from './pages/Login';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import { CitiesProvider } from './Contexts/CitiesContext';
import { AuthProvider } from './Contexts/FakeAuthContext';
import ProtectedRoute from './pages/ProtectedRoute';



function App() {
  console.log("app component will not re-render when context data is updated");
  return (
    <AuthProvider>
    <CitiesProvider>
      <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="product" element={<Product />} />  
            <Route path="pricing" element={<Pricing />} />  
            <Route path="login" element={<Login />} />      
            
            {/* IMPORTANT :- added route guard "ProtectedRoute" */}
              <Route path="app" element={
                <ProtectedRoute>
                  <AppLayout />
                  </ProtectedRoute>
                }>      
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList  />} />
                <Route path="cities/:id" element={<City />} />  
                <Route path="countries" element={<CountryList/>} />         
                <Route path="form" element={<Form />} />                   
              </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </CitiesProvider>
    </AuthProvider>
  )
}

export default App;

//declarative  :- using special component




//Client Side Routing (React Router):-
//with routing, we match different URLs to different UI views (React components): routes.
//This enables users to navigate between different application screens, using the browser URL.
//Keeps the UI sync with the current browser URL.

//Single Page Application (SPA) :-
//Application that is executed entirely on the client (browsers).
//Routes: different URLs correspond to different view (component).
//User clicks router link -> URl is changed (by react-router) -> DOM is updated (by Javascript[React]) but the page is not reloaded act like native app.


//Styling Option for React :-
//1] inline css on jsx element using style props whose scope is only limited to that element (promote separation of concern) (CSS)
//2] CSS or SASS file from external file using className prop scoped to entire app (not good when multiple component uses same css) (CSS)
//3] CSS modules one external file per component using className prop scoped to one component (best practice) (CSS)
//4] CSS-in-JS External file or Component file by Creates new component scoped to one component (Javascript)
//5] Utility-first CSS (tailwind) on JSX elements using className prop scoped to JSX element (CSS)
//6] without css using (MUI, Chakra UI, Mantine,etc).

// composing class ?


//assets folder used for directly import into javascript.


//URL for state management :-
//The URL is an Excellent place to store UI state and an alternative to useState in some situations!
//Examples: open/closed panels, currently selected list item, list sorting order, applied list filters.
//1] Easy way to store state in a global place, accessible to all components in the app.
//2] Good way to "pass" data from one page into the next page
//3] Makes it possible to bookmark and share the page with the exact UI state it had at the time.


//useParams() Hooks :- for accessing dynamic segment/params.

//useSearchParams() :- for accessing and updating the query parameter/string.
// IMPORTANT :-
//useNavigate() hook used to programmatically navigating 
// it used to be called useHistory in previous version

//Navigate Component