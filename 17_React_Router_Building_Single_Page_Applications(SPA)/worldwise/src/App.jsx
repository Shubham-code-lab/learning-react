import { useEffect, useState } from 'react';
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

const BASE_URL = "http://localhost:8000/cities";

function App() {

  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function(){
    async function fetchCities(){
      try{
        setIsLoading(true);
        const res = await fetch(BASE_URL);
        if(!res.ok) throw new Error("");
        const data = await res.json();
        setCities(data);
      }
      catch (err){
        console.log(err);
      }
      finally{
        setIsLoading(false);
      }
    }
    fetchCities();
  }, [])

  return (
    <div>
      
      {/* any content outside BrowserRouter do not change on route change */}
      {/* <h1>Hello Routers!</h1> */}

      <BrowserRouter>
      {/* only one route is show at time depend upon page URL */}
        <Routes>
          {/* before version 6 we use to pass component name instead of component element  */}
          {/* using component element we can now also pass props */}

          {/* domain/ */}
          <Route index element={<Homepage />} />
          {/* <Route path="/" element={<Homepage />} /> */}

          <Route path="product" element={<Product />} />  {/* domain/cities */}
          <Route path="pricing" element={<Pricing />} />  {/* domain/pricing */}
          <Route path="login" element={<Login />} />      {/* domain/login */}
          <Route path="app" element={<AppLayout />}>      {/* domain/app */}
            {/* JSx element */}

            {/* Default route */}
            {/* domain/app */}
            {/* <Route index element={<CityList cities={cities} isLoading={isLoading} />} /> */}

            {/* IMPORTANT using Navigate Component to immediately redirect for to another route on path math */}
            {/* replace will fix the browser go back button because it replace the current element in the history stack */}
            <Route index element={<Navigate replace to="cities" />} />

            
            <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />{/* domain/app/cities */}
            <Route path="cities/:id" element={<City />} />  {/* setting up dynamic segment/params */}
            <Route path="countries" element={<CountryList cities={cities}  isLoading={isLoading}/>} />         {/* domain/app/countries */}
            
            <Route path="form" element={<Form />} />                   {/* domain/app/form */}
            {/* we can send any JSX element in the element props */}
            {/* <Route path="form" element={<p>Form</p>} />                 domain/app/form */}
          </Route>

          {/* domain/unknowPath */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
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