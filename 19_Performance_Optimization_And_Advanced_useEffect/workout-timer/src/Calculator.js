import { memo, useCallback, useEffect, useState } from 'react';
import clickSound from './ClickSound.m4a';

function Calculator({ workouts, allowSound }) {
  const [number, setNumber] = useState(workouts.at(0).numExercises);
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(90);
  const [durationBreak, setDurationBreak] = useState(5);

  // IMPORTANT :-
  //duration has to be state and not derived state in order to update them in event handler
  const [duration, setDuration] = useState(0);
  // const duration = (number * sets * speed) / 60 + (sets - 1) * durationBreak;
  
  
  //IMPORTANT :-
  //Solution :-
  //we can move fucntion out of component but it is reactive as it is using one reactive value state that is sent to this component recieved as prop
  //we can move it to useEffect function but we can use it in otehr event handle then becaue of scope
  //so we memozie so it is not recreated again 
  // const playSound = useCallback(function () {  //reactive function so used as dependencies in useEffect
  //   if (!allowSound) return;
  //   const sound = new Audio(clickSound);
  //   sound.play();
  // },[allowSound]); 

  // above function will cause problem as using + and - will add 1 or substract 1 from the value but when the allowSound porps change  playSound function will be recreated and hence cause re-redner in useEffect where playSound is dependencies and it will calculated using number,sets,etc which was never updated through event handler of + and -.
  //hence to fix that we use below also if you uncomment below then you also have to remove playSound call and it use in dependencies
  useEffect(function() {
    const playSound = function () { 
      if (!allowSound) return;
      const sound = new Audio(clickSound);
      sound.play(); 
    }
    playSound();
  },[duration , allowSound]);  //we added duration to execute when it change even it is not used in callback function of useEffect

  // stale closure function has capture different old value of number even when it changes
  // function is created in useEffect so it will have old value of number because of clouse in js
  useEffect(function() {
    //function is created but 
    document.title = `Your ${number}-exercise workout`;
  }, [number, duration, sets])

  const mins = Math.floor(duration);
  const seconds = (duration - mins) * 60;

  useEffect(function(){
    setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);
    // playSound();
  },[number, sets, speed, durationBreak,
    //  playSound
    ])  

  function handleInc(){
    setDuration(duration => Math.floor(duration) + 1);
    // playSound();
  }

  function handleDec(){
    setDuration(duration => duration > 1  ? Math.ceil(duration) - 1 : 0);
    // playSound();
  }

  

  return (
    <>
      <form>
        <div>
          <label>Type of workout</label>
          <select value={number} onChange={(e) => setNumber(+e.target.value)}>
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>How many sets?</label>
          <input
            type='range'
            min='1'
            max='5'
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
          <span>{sets}</span>
        </div>
        <div>
          <label>How fast are you?</label>
          <input
            type='range'
            min='30'
            max='180'
            step='30'
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
          <span>{speed} sec/exercise</span>
        </div>
        <div>
          <label>Break length</label>
          <input
            type='range'
            min='1'
            max='10'
            value={durationBreak}
            onChange={(e) => {
              setDurationBreak(e.target.value)
            }}
          />
          <span>{durationBreak} minutes/break</span>
        </div>
      </form>
      <section>
        <button onClick={handleDec}>–</button>
        <p>
          {mins < 10 && '0'}
          {mins}:{seconds < 10 && '0'}
          {seconds}
        </p>
        <button onClick={handleInc}>+</button>
      </section>
    </>
  );
}

//IMPORTANT :-
//Memoize to improve performance
export default memo(Calculator);
