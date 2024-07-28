import  {useEffect} from 'react';

function Timer({dispatch, secondsRemaining}) {
    const mins = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;

    //once this component is mounted when we click on start game this code initialize the timer as it in separate component
    useEffect(function(){
        const timerID = setInterval(function(){
            dispatch({type: "tick"})
        },1000)

        return ()=>{
            clearInterval(timerID);
        }
    },[])

    return (
        <div className="timer">
            {mins < 10 && "0"}{mins}:{seconds < 10 && "0"}{seconds}
        </div>
    )
}

export default Timer;
