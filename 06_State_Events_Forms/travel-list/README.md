update state based on current state. what happen this time in react internally ?
setState(()=>{})

intialize value for just first time 
useState(()=>{return value})   why it does re-render like useState(value)

recieved new value of prop will re-render the component as beacuse of parent re-render it will cause child to re-render event?
yes the thing is parent only re-render when any state changes that we pass so even if child use or don't it will still re-rednder 
and there is no way to pass dynamic props that is not state that changes value.

