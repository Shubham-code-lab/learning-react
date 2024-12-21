key prop :- differenciate mutiple instace of same component type.  (can be use for TimeBlock component)

unless we give them key prop any element that stay at same position will not re-initialize.  (except if that compoent removed and added again)

no side effect in render logic   (Examples: mutating external variable, HTTP requests, writing to DOM.)  no prop update.

side effect in event handler and useEffect


event handler :-


automatic batching is not there in react 17 (so re-render will occur multiple time  for each state update in event handler )


react create new virstual dom for state update only for that compoent or for enitre compoent.


calling function in useEffect with dependency [] and in event handler , so it can execute on event and on inital render also . aslo check if we are getting stale data for deriverd state and state in the function what happen if we update those both (ps :- derived state will not trigger re-render), aslo we might have to add that function as dependency in useEffect.