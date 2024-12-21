import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'

// Before Lazy Loading
// dist/index.html                   0.49 kB │ gzip:   0.31 kB
// dist/assets/index-DRWLSl0O.css   29.95 kB │ gzip:   5.05 kB
// dist/assets/index-DBUZb8Tr.js   509.29 kB │ gzip: 148.41 kB

// import Homepage from './pages/Homepage';
// import Product from './pages/Product';
// import Pricing from './pages/Pricing';
// import Login from './pages/Login';
// import AppLayout from "./pages/AppLayout";
// import PageNotFound from './pages/PageNotFound';



import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';

import { CitiesProvider } from './Contexts/CitiesContext';
import { AuthProvider } from './Contexts/FakeAuthContext';
import ProtectedRoute from './pages/ProtectedRoute';

import { lazy, Suspense } from 'react';
import SpinnerFullPage from './components/SpinnerFullPage';

// After Lazy loading
// lazy() built in function
// dist/index.html                           0.49 kB │ gzip:   0.31 kB
// dist/assets/Logo-CtfPMVPO.css             0.03 kB │ gzip:   0.05 kB
// dist/assets/Login-fP6ipu4U.css            0.35 kB │ gzip:   0.22 kB
// dist/assets/Product-CX3p79nw.css          0.47 kB │ gzip:   0.27 kB
// dist/assets/Homepage-DKp2I-AC.css         0.50 kB │ gzip:   0.30 kB
// dist/assets/PageNav-C2lIXkPA.css          0.51 kB │ gzip:   0.28 kB
// dist/assets/AppLayout-Zwg2tG06.css        1.91 kB │ gzip:   0.71 kB
// dist/assets/index-CpAUB8Z1.css           26.29 kB │ gzip:   4.38 kB
// dist/assets/Product.module-DpVUF5Lu.js    0.06 kB │ gzip:   0.07 kB
// dist/assets/PageNotFound-C4NdghU4.js      0.15 kB │ gzip:   0.15 kB
// dist/assets/Logo-C1XgR8ZI.js              0.21 kB │ gzip:   0.19 kB
// dist/assets/PageNav-CcT_798m.js           0.50 kB │ gzip:   0.28 kB
// dist/assets/Pricing-DtpA2TbT.js           0.65 kB │ gzip:   0.42 kB
// dist/assets/Homepage-B6cEpzQI.js          0.66 kB │ gzip:   0.41 kB
// dist/assets/Product-8e_b18cZ.js           0.86 kB │ gzip:   0.49 kB
// dist/assets/Login-D1KriNF_.js             0.98 kB │ gzip:   0.52 kB
// dist/assets/AppLayout-8uIBBFu9.js       156.94 kB │ gzip:  46.11 kB
// dist/assets/index-BhV18Jta.js           350.61 kB │ gzip: 101.98 kB
const Homepage  = lazy(()=> import("./pages/Homepage"));
const Product  = lazy(()=> import("./pages/Product"));
const Pricing  = lazy(()=> import("./pages/Pricing"));
const Login  = lazy(()=> import("./pages/Login"));
const AppLayout  = lazy(()=> import("./pages/AppLayout"));
const PageNotFound  = lazy(()=> import("./pages/PageNotFound"));


function App() {
  console.log("app component will not re-render when context data is updated");
  return (
    <AuthProvider>
    <CitiesProvider>
      <div>
        <BrowserRouter>
        {/* Suspense will add spinner when the javascript for the page is being fetched */}
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />  
              <Route path="pricing" element={<Pricing />} />  
              <Route path="login" element={<Login />} />      
              
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
          </Suspense>
        </BrowserRouter>
      </div>
    </CitiesProvider>
    </AuthProvider>
  )
}

export default App;


// Bundle and code splitting
// Bundle :- javascript file containing the entire application code. Downloading the bundle will load the entire app at once, turning it into a SPA.
// Bundle size :- Amount of Javascript users have to download to start using the app. One of the most important things to be optimized, so that the bundle takes less time to download.
// Code splitting :-Splitting bundle into multiple parts that can  be downloaded over time ("lazy loading")

//Suspense API
// concurrent feature of modern react which allow component to wait for something to happen

//UseEffect :-
//1] added dependency rules :-
//Every state variable, prop used inside the effect must be included in the dependency array.
//All "reactive values"(state, prop or context value or any other value that reference the a reactive value) must be included! That means any function or variable that reference any other reactive value.
//Dependencies choose themselves: NEVER ignore the exhaustive-deps ESLint rule.
//Do Not use objects or arrays as dependencies (objects are recreated on each other render, and React sees new objects as different, {} !== {}).

//2] Removing dependencies  rules :-
//a] Removing function dependencies :-
// Move the function into the effect
// If you need the function in multiple places, memoize it (useCallback)
// If the function  doesn't reference  any reactive values, move it out of the component.

//b] Removing Object dependencies :-
// Instead of including the entire object , include only the properties you need (primitive values).
// If that does't work, use the same strategies as for functions (moving or memoizing object).

//c] Other strategies :-
//If you have multiple related reactive values as dependencies, try using a reducer (useReducer).
//You don't need to include setState(from useState) and dispatch (from useReducer) in the dependencies, as React guarantees them to be stable across renders.

//3] when not to use useEffect :-
// Effects should be used last resort, when no other solution makes sense. React calls them an "escape hatch" to step outside of React.
//a] Response to user event (use event handler instead)
//b] Fetching data on component mount. (user React query instead)
//c] Synchronizing state changes with one another (means setting state based on another state variable) (use derived state instead)