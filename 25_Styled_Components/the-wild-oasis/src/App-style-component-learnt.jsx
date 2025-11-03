//-> Styled Components
//-> name collision and class name clash are avoided.
//-> It create randomly named class and apply the styles to it

import styled from "styled-components";
// import { ThemeProvider } from 'styled-components';
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

//-> StyledComponentName is convention for naming a styled root element in component.
//-> Applying css to a component.
const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      {/* ->GlobalStyles is a styled component that applies the styles to the entire app. */}
      {/* ->It doesn't accepts any props. and it has to be sibling of the root element. */}
      <GlobalStyles />
      <StyledApp>
        <Row type="horizontal">
          {/* passing props to styled components */}
          <Heading type="h1">The Hello World</Heading>
          <Heading type="h2">The Hello World</Heading>
          {/* we can also tell HTML element to render as a styled component */}
          <Heading as="h3">The Hello World</Heading>
          {/* ->Button is a styled component that can has access to all HTML attributes and event handlers. */}
          <Button
            size="medium"
            variation="primary"
            onClick={() => alert("Button clicked")}
          >
            Check in
          </Button>
          <Button
            size="medium"
            variation="secondary"
            onClick={() => alert("Button clicked")}
          >
            Check out
          </Button>
        </Row>
        <Row type="vertical">
          <Heading as="h3">The Hello World</Heading>
          <form>
            <Input type="number" placeholder="Enter number of guests" />
            <Input type="number" placeholder="Enter number of guests" />
          </form>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;

//-> CSR :-
//-> Used to build Singe page application (SPAs).
//-> All HTMl is render on the client.
//-> All Javascript needs to be downloaded before apps start running: bad performance.
//-> If all the thing are hidden behind the login screen and no SEO(search engine optimization is need)

//-> SSR:-
//-> Used to build Multi-page Applications (MPAs).
//-> Some HTML is rendered in the server.
//-> More performant, as less javascript needs to be download.
//-> The React team is moving more and more in this direction.
//-> NEST.js, REMIX.

//-> Tech :-
//-> Routing :- React Router, The standard for React SPAs
//-> Styled :- Styled components, Very popular way to writing component-scoped CSS, right inside javascript. A technology worth learning.
//-> Remote state management :- React Query, The best way of managing remote state, with feature like caching, automatic re-fetching, offline support,etc                        Alternative are SWR and RTK Query, but this is the most popular.
//-> UI Sate management :- Context API, There is almost no UI state needed in this app, so one simple context with useState will be enough. No need for Redux.
//-> Form management :- React Hook Form, Handling bigger forms can be a lot of work, such as manual state creation and error handling. A library can simplify all this.

//-> Other tools :- React icons/React hot toast / Recharts / date-fns / Supabase.

//Before css variables :-
//But using css variables is better than this.

// const Button = styled.button`
//   background-color: ${props => props.theme.color};
// `;
// <ThemeProvider theme={theme}>
//   <Button>Click me</Button>
// </ThemeProvider>

// componentName.defaultProps.



//Check the following components for what we learned :-
// Button,
// Input,
// Heading,
// Row,