import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from "./Question";
import NextButton from './NextButton';
import Progress from './Progress';
import Footer from './Footer';
import Timer from "./Timer";
import {useEffect,  useReducer}  from 'react';
import FinishScreen from './FinishScreen';

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  //"loading", "error", "ready", "active", "finished"
  status: "loading",
  index: 0,  //index is state as when it change it should re-render the component
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: 10,
};

function reducer(state, action){
  switch(action.type){
    case "dataReceived":
      return {
        ...state,  //IMPORTANT :- do spread for rest of the state
        status: "ready",
        questions: [...action.payload]
      };
    case "dataFailed":
      return {
        ...state,
        status: "error"
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION
      };
    case "newAnswer":
      const question = state.questions.at(state.index)
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points
      }; 
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore: state.points  > state.highScore ? state.points : state.highScore
      };
    case "restart":
      return {
        // ...state,
        ...initialState,
        questions: state.questions,
        status: "ready",
        highScore: state.highScore
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status
      }

    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [{questions, status, index, answer, points, highScore, secondsRemaining}, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev, cur)=> prev + cur.points ,0)

  useEffect(function(){
    async function fetchQuestions(){
      try{
        const res = await fetch("http://localhost:8000/questions");

        if(!res.ok) throw new Error("");

        const data = await res.json();

        console.log(data);
        dispatch({
          type: "dataReceived",
          payload: data
        });
      }
      catch(err){
        console.log("Error",err);
        dispatch(
          {
            type:"dataFailed"
          }
        );
      }
      finally{

      }
    }
    
    fetchQuestions();

  },[])

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {/* passing dispatch as props */}
        {status === "ready" && <StartScreen numQuestions={numQuestions}  dispatch={dispatch}/>}
        {status === "active" && 
        (
          <>
            <Progress index={index} numQuestions={numQuestions} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer}/>
            <Question question={questions[index]} dispatch={dispatch} answer={answer}/>
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions}/>
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} highScore={highScore} dispatch={dispatch} />}
        
      </Main>
    </div>
  );
}

export default App;


//Json-server:-
//Used to create fake API
//In package.json add script :-  "server": "json-server --watch data/questions.json --port 8000"
//http://localhost:8000/questions

//UseReducer vs UseState :-

//useState :-
//Ideal for single, independent piece of state (numbers, strings, single, arrays, etc)
//Logic to update state is placed directly in event handlers or effects, spread all over one or multiple components.
//State is updated by calling setState (setter returned from useState).
//Imperative state updates.

//useReducer :-
//Ideal for multiple related piece of state and complex state (e.g. object with many values and nested objects or arrays)
//Logic to update state lives in one central  place, decoupled from components: the reducer
//state is updated by dispatching an action to a reducer.
//Declarative state updates: complex state transitions are mapped to actions