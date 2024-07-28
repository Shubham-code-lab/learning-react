function Progress( {index, numQuestions, points, maxPossiblePoints, answer}) {
    return (
        <header className="progress">
            {/* Number(answer !== null)} return 0 or 1 based on the condition */}
            <progress max={numQuestions} value={index + Number(answer !== null)} />
            <p>Question <string>{index}</string> / {numQuestions}</p>
            <p><strong>{points}</strong> / {maxPossiblePoints}</p>
        </header>
    )
}

export default Progress
