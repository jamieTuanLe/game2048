
import Grid from './Grid.js';
import Tile from './Tile.js';
import StartAction from './StartAction.js';

const gameBoard = document.getElementById("game-board")

const grid = new Grid(gameBoard)
grid.randomEmptyCell().tile = new Tile(gameBoard)
grid.randomEmptyCell().tile = new Tile(gameBoard)

const modalHowToPlay = document.getElementById("modal-howtoplay")
const howToPlayBtn = document.getElementById("howtoplay-btn")
const closeModalHowToPlay = document.getElementById("modal-close-howtoplay")

// Bắt đầu lắng nghe Action và sử lý

StartAction(grid, gameBoard)

// Handle how to play

howToPlayBtn.onclick = function () {
    modalHowToPlay.classList.add('active')
}

closeModalHowToPlay.onclick = function () {
    modalHowToPlay.classList.remove('active')
}
