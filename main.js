
import Grid from './Grid.js';
import Tile from './Tile.js';
import { moveUp, moveDown, moveLeft, moveRight, canMoveUp, canMoveDown, canMoveLeft, canMoveRight } from './Actions.js'
import handleLose from './handleLose.js';

const gameBoard = document.getElementById("game-board")
const modal = document.getElementById('modal')
const score = document.getElementById('number-score')
const modalClose = document.getElementById('modal-close')
const playAgain = document.getElementById('play-again')

var numberScore = 0
var numberHighScore = 0

const grid = new Grid(gameBoard)
grid.randomEmptyCell().tile = new Tile(gameBoard)
grid.randomEmptyCell().tile = new Tile(gameBoard)

setupInput()

function setupInput() {
    window.addEventListener("keydown", handleInput, { once: true })
    modalClose.addEventListener("click", closeModal)
    playAgain.addEventListener("click", handlePlayAgain)
}


async function handleInput(e) {
    switch (e.key) {
        case "ArrowUp":
            if (!canMoveUp(grid)) {
                setupInput()
                return
            }
            await moveUp(grid)
            break
        case "ArrowDown":
            if (!canMoveDown(grid)) {
                setupInput()
                return
            }
            await moveDown(grid)
            break
        case "ArrowLeft":
            if (!canMoveLeft(grid)) {
                setupInput()
                return
            }
            await moveLeft(grid)
            break
        case "ArrowRight":
            if (!canMoveRight(grid)) {
                setupInput()
                return
            }
            await moveRight(grid)
            break
        default:
            setupInput()
            return
    }

    grid.cells.forEach(cell => {
        let scoreMerge = cell.mergeTiles()
        numberScore = scoreMerge ? scoreMerge + numberScore : numberScore
        if(numberScore) score.textContent = numberScore.toString()
    })

    const newTile = new Tile(gameBoard)
    grid.randomEmptyCell().tile = newTile

    if (!canMoveUp(grid) && !canMoveDown(grid) && !canMoveLeft(grid) && !canMoveRight(grid)) {
        newTile.waitForTransition(true).then(() => handleLose(numberScore, numberHighScore, modal))
        return
    }

    setupInput()

}

function closeModal() {
    modal.classList.remove('active')
}

function handlePlayAgain() {
    grid.resetTile()
    grid.randomEmptyCell().tile = new Tile(gameBoard)
    grid.randomEmptyCell().tile = new Tile(gameBoard)
    modal.classList.remove('active')
    numberScore = 0
    score.textContent = numberScore.toString()
    setupInput()
}