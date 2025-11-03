Reuse code :-
1] UI (pieces of UI):-
    a] component and props (props is API of component, to enable custom behavior, can be stateless, stateful, or structural components)
    b] children prop (customize the component content).
2] Stateful logic (at-least one react hook)

3] no stateful logic (we can just use javascript function)

4] render props patterns :-
complete control over what component renders, by passing in a function as a props.(old days before hooks).

5] compound component pattern :-
 multiple component come together to for super component that manage it own state internally.


Issue :-
Custom Hooks in React allow us to share stateful logic, but not UI (JSX/HTML).
So even if we extract and reuse logic using a hook, we still have to manually implement the UI (like buttons, layout, etc.) in each component.
This means the overall user experience (UX) is not truly shared — we would need to recreate parts of it in every consumer component.


 