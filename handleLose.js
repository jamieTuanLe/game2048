import Tile from './Tile.js';

function handleLose(grid, gameBoard, numberScore, numberHighScore, setupInput) {
    const currentScoreElement = document.getElementById('current-score')
    const highScoreElement = document.getElementById('high-score')
    const modal = document.getElementById('modal-lose')
    const modalClose = document.getElementById('modal-close-lose')
    const playAgain = document.getElementById('play-again')
    const scoreElement = document.getElementById('number-score')

    modalClose.addEventListener("click", closeModal)
    playAgain.addEventListener("click", handlePlayAgain)


    currentScoreElement.textContent = numberScore.toString()
    highScoreElement.textContent = numberHighScore.toString()
    modal.classList.add('active')

    function closeModal() {
        modal.classList.remove('active')
    }


    // Reset game và cho phép người chơi tiếp tục, highScore vẫn được bảo lưu
    function handlePlayAgain() {
        grid.resetTile()
        grid.randomEmptyCell().tile = new Tile(gameBoard)
        grid.randomEmptyCell().tile = new Tile(gameBoard)
        modal.classList.remove('active')
        scoreElement.textContent = 0
        setupInput()
    }
}

export default handleLose