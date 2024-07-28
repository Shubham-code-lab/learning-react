function FinishScreen({points, maxPossiblePoints, highScore, dispatch}) {
    const  percentage = (points / maxPossiblePoints) * 100;

    let emoji;
    if(percentage === 100)emoji = "🥇";
    else if(percentage > 80)emoji = "🎉";
    else if(percentage > 50)emoji = "🙃";
    else if(percentage > 35)emoji = "🤨";
    else emoji = "🤦‍♂️";

    return (
        <>
            <p className="result">
                <span>{emoji}</span>
                You scored 
                <strong>&nbsp;{points}&nbsp;</strong>
                out of {maxPossiblePoints} points ({Math.ceil(percentage)}%)
            </p>
            <p className="highscore">(Highscore: {highScore} points)</p>
            <button onClick={()=>{dispatch({type:"restart"})}}>
                Reset
            </button>
        </>
    )
}

export default FinishScreen
