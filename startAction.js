import Tile from './Tile.js'
import handleLose from './handleLose.js';
import { moveUp, moveDown, moveLeft, moveRight, canMoveUp, canMoveDown, canMoveLeft, canMoveRight } from './Actions.js'

function StartAction(grid, gameBoard) {
    const score = document.getElementById('number-score')
    var numberScore = 0
    var numberHighScore = 0

    let xStartPoint = null
    let yStartPoint = null

    setupInput()

    // Lắng nghe các Action Event

    function setupInput() {
        window.addEventListener("keydown", handleInputPC, { once: true })
        document.addEventListener('touchstart', handleTouchStart, { once: true })
        document.addEventListener('touchend', handleTouchEndMobile, { once: true })

    }

    // Xử lý các chuyển động trên PC dùng KeyDown

    async function handleInputPC(e) {
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

        //Tiến hành gộp Tile và cộng điểm Score cho người chơi
        grid.cells.forEach(cell => {
            let scoreMerge = cell.mergeTiles()
            numberScore = scoreMerge ? scoreMerge + numberScore : numberScore
            if (numberScore) score.textContent = numberScore.toString()
        })

        //Kiểm tra và gán điểm cho HighScore để dùng thống kê khi người chơi thua
        numberHighScore = numberHighScore > numberScore ? numberHighScore : numberScore

        //Sau mỗi lần di chuyển thì luôn random ra một Tile mới ở vị trí bất kì
        const newTile = new Tile(gameBoard)
        grid.randomEmptyCell().tile = newTile

        //Check xem người dùng đã thua hay chưa (Thua là khi không còn ô trống để di chuyển)
        if (!canMoveUp(grid) && !canMoveDown(grid) && !canMoveLeft(grid) && !canMoveRight(grid)) {
            newTile.waitForTransition(true).then(() => {
                handleLose(grid, gameBoard, numberScore, numberHighScore, setupInput)
                numberScore = 0;
            }
            )
            return
        }

        setupInput()
    }

    // Xử lý các chuyển động trên Mobile dùng Touch Event

    function handleTouchStart(e) {
        xStartPoint = Math.abs(e.touches[0].clientX)
        yStartPoint = Math.abs(e.touches[0].clientY)
    }

    // Xử lý các chuyển động trên Mobile dùng Touch Event

    async function handleTouchEndMobile(e) {
        let move = null

        let xEndPoint = Math.abs(e.changedTouches[0].clientX)
        let yEndPoint = Math.abs(e.changedTouches[0].clientY)
        const xDiff = xStartPoint - xEndPoint
        const yDiff = yStartPoint - yEndPoint

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            move = xDiff > 0 ? 'ArrowLeft' : 'ArrowRight'
        } else if (Math.abs(yDiff) > Math.abs(xDiff)) {
            move = yDiff > 0 ? 'ArrowUp' : 'ArrowDown'
        }

        switch (move) {
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

        //Tiến hành gộp Tile và cộng điểm Score cho người chơi
        grid.cells.forEach(cell => {
            let scoreMerge = cell.mergeTiles()
            numberScore = scoreMerge ? scoreMerge + numberScore : numberScore
            if (numberScore) score.textContent = numberScore.toString()
        })

        //Kiểm tra và gán điểm cho HighScore để dùng thống kê khi người chơi thua
        numberHighScore = numberHighScore > numberScore ? numberHighScore : numberScore

        //Sau mỗi lần di chuyển thì luôn random ra một Tile mới ở vị trí bất kì
        const newTile = new Tile(gameBoard)
        grid.randomEmptyCell().tile = newTile

        //Check xem người dùng đã thua hay chưa (Thua là khi không còn ô trống để di chuyển)
        if (!canMoveUp(grid) && !canMoveDown(grid) && !canMoveLeft(grid) && !canMoveRight(grid)) {
            newTile.waitForTransition(true).then(() => {
                handleLose(grid, gameBoard, numberScore, numberHighScore, setupInput)
            }
            )
            return
        }

        setupInput()

    }
}

export default StartAction