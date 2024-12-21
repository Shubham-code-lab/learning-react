Root component and strick mode

inline style

don't use 0 for contination redenring && because it will acutally render it in UI (true and false doesn't get renders)



question :- 
//props in React is all about pure function. so updating props outside of parent component will create side effect(not pure).
//then we pass setState as prop to child component to update value is it bad practice ? also what if that state is used in useEffect as dependency( so when child update setState then parent re-render?)