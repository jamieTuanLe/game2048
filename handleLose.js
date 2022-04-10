

function handleLose(numberScore, numberHighScore, modal) {
    const currentScoreElement = document.getElementById('current-score')
    const highScoreElement = document.getElementById('high-score')


    currentScoreElement.textContent = numberScore.toString()
    numberHighScore = numberHighScore > numberScore ? numberHighScore : numberScore
    highScoreElement.textContent = numberHighScore.toString()
    modal.classList.add('active')
}

export default handleLose