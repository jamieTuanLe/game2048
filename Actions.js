function moveUp(grid) {
    return slideTiles(grid.cellsByColumn)
}

function moveDown(grid) {
    return slideTiles(grid.cellsByColumn.map(column => [...column].reverse()))
}

function moveLeft(grid) {
    return slideTiles(grid.cellsByRow)
}

function moveRight(grid) {
    return slideTiles(grid.cellsByRow.map(row => [...row].reverse()))
}

function slideTiles(cells) {
    return Promise.all(
        cells.flatMap(group => {
            const promises = []
            for (let i = 1; i < group.length; i++) {
                const cell = group[i]
                if (cell.tile == null) continue
                let lastValidCell
                for (let j = i - 1; j >= 0; j--) {
                    const moveToCell = group[j]
                    if (!moveToCell.canAccept(cell.tile)) break
                    lastValidCell = moveToCell
                }

                if (lastValidCell != null) {
                    promises.push(cell.tile.waitForTransition())
                    if (lastValidCell.tile != null) {
                        lastValidCell.mergeTile = cell.tile
                    } else {
                        lastValidCell.tile = cell.tile
                    }
                    cell.tile = null
                }
            }
            return promises
        }))
}


function canMoveUp(grid) {
    return canMove(grid.cellsByColumn)
}

function canMoveDown(grid) {
    return canMove(grid.cellsByColumn.map(column => [...column].reverse()))
}

function canMoveLeft(grid) {
    return canMove(grid.cellsByRow)
}

function canMoveRight(grid) {
    return canMove(grid.cellsByRow.map(row => [...row].reverse()))
}

function canMove(cells) {
    return cells.some(group => {
        return group.some((cell, index) => {
            if (index === 0) return false
            if (cell.tile == null) return false
            const moveToCell = group[index - 1]
            return moveToCell.canAccept(cell.tile)
        })
    })
}


export { moveUp, moveDown, moveLeft, moveRight, canMoveUp, canMoveDown, canMoveLeft, canMoveRight }
