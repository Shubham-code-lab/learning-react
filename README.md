# learning-react

light on on website using switch that is triiger using solving and electronic gates or automate
show current throught wire yellow collow with black then have bulb color will be bright near buld and dark as go far
one bulb will switch off as other bulb turn on on scroll

new idea create vs code extension to display component tree

have terminal command prompt like this website
https://guillaumereygner.fr/
https://dimden.dev/

have resume on screen and download will show on hover.

have flicker effect on bulb.

have cat chasing the mouse cursor.

light on on website using switch that is triiger using solving and electronic gates or automate
show current throught wire yellow collow with black then have bulb color will be bright near buld and dark as go far
one bulb will switch off as other bulb turn on on scroll

have terminal command prompt like this website
https://guillaumereygner.fr/
https://dimden.dev/

have resume on screen and download will show on hover.

have flicker effect on bulb.

have cat chasing the mouse cursor.

React is a Component-Based, Declarative, state-driven Javascript library.

Declarative :- tell how component work and look by current data/state using declarative syntax called JSX (HTML, javascript ,CSS and referencing other components).

React is just library as it is only view layer we need other external library to build complete application i.e :- routing, data fetching

NEXT.js and Remix are framework that has all the built in feature i.e :- routing, data fetching and server side rendering.

Rerendering is done through Virtual Dom, Fiber tree, and one-way data flow.

npx create-react-app@5 pizza-menu
npm start

TIPS :-
use event handler only when you want to run the code on state and props changes or onclick
use useEffect when you want executing some sync code or after component life cycle
pass arrow function when you are working with current value of state
//pass set event handler to child component that child component will have it own event handler which will do some job and pass some data to this set event handler of parent.
//never mutate object in setState() replace them
//use lazy evaluation call back function to setState() when we want to set initial state.
//use useEffect that trigger on certain state update to update external things
//use one a single hooks for specific logic
//any hooks that you use in useEffect should be part of your dependency.



vite to setup react :-

npm create vite@latest
npm create vite@4

index.html is outside
index.js is now main.jsx

npm run dev

npm i eslint vite-plugin-eslint eslint-config-react-app --save-dev          //doesn't come up with Eslint we have to manually set-up

.eslintrc.json       //configure eslint create this file
{
    "extends": "react-app"
}

configure with vite add below in the vite.config.js file
import eslint from 'vite-plugin-eslint'
plugins: [react(),eslint()],


//Installing rect router
//npm i react-router-dom       //latest
//npm i react-router-dom@6


//Installing react-leaflet which is built on top of leaflet 
npm i react-leaflet leaflet


//IMPORTANT
// always best to have primitives in the dependencies array
{/* react garunties that the set function of isFakeDark always garuntiess stable identities (will not change on renders). as setsetter function are already memoize */}
      {/* so it okay to not includes these setter function in the hooks i.e :- useEffect,useCallback, useMemo */}


//change email commit
