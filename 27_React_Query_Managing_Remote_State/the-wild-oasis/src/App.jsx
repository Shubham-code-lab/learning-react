import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Toaster } from "react-hot-toast"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // amount of time data in the cache will remain fresh 
      // staleTime: 60 * 1000,      //1 min
      staleTime: 30 * 1000,     //data is always in stale state
    }
  }
});

function App() {
  return (
    // IMPORTANT 
    //adding QueryClientProvider as wrapper around our entire app
    //ReactQueryDevtools to add react query dev tools
    <QueryClientProvider client={queryClient}>
       <ReactQueryDevtools initialIsOpen={false} />

        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
              <Route path="account" element={<Account />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        <Toaster 
          position="top-center"
          gutter={12} 
          containerStyle={{margin: "8px" }} 
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)"
            }
          }}
        />
    </QueryClientProvider>
  );
}

export default App;



//react query :- (data fetching and remote state management)  alternative (SWR , RTK query)
//powerful library for managing remote (server) state
//Many feature that allow us to write a lot less code, while also making  the UX a lot better.
//1] fetched Data is stored in cache.  (component A fetch data and then data is cached then if component B also need same data then it take from cache)
//2] Automatic loading and error states. ()
//3] Automatic re-fetching to keep state synched. (re-fetch after certain time or when we come back to the page or when other user on there machine update the data then other machine using same website need to be sync with data)
//4] pre-fetching. (i.e :- pre-fetching for pagination for current and next page ) 
//5] Easy remote state mutation. (updating)
//6] offline support (cached data can be used when user is offline)

//remote state is async and used by many user of the app running on different browser.

//inactive :- when data is not show 
//stale :- when it run out of the time 


//tanstack is also used in svelte, Vue
//npm i @tanstack/react-query@4

//react query dev tools
//npm i @tanstack/react-query-devtools@4

//date formatting
// npm i date-fns

//Display Toast
// npm i react-hot-toast

//React Hook Form  (used for form submission and error)
// npm i react-hook-form@7