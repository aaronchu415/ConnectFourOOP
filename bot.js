// let board = [
//     [null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null],
//     [null, 2, null, null, null, null, null],
//     [null, 2, 2, null, null, null, null],
//     [null, 2, 2, 2, null, null, null],
//     [null, 1, 1, 1, null, null, 1],
// ]

/** findSpotForCol: given column x, return top empty y (null if filled) */

function checkForWin(board, currPlayer, HEIGHT, WIDTH) {
    function _win(cells) {
        // Check four cells to see if they're all color of current player
        //  - cells: list of four (y, x) cells
        //  - returns true if all are legal coordinates & all match currPlayer

        return cells.every(
            ([y, x]) =>
                y >= 0 &&
                y < HEIGHT &&
                x >= 0 &&
                x < WIDTH &&
                board[y][x] === currPlayer
        );
    }

    // TODO: read and understand this code. Add comments to help you.

    //loop through each cell in the board
    for (var y = 0; y < HEIGHT; y++) {
        for (var x = 0; x < WIDTH; x++) {

            //get horrizontal
            var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];

            //get vertical
            var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];

            //get diag
            var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];

            //get diagDR
            var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

            //check winning conditions
            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                return true;
            }
        }
    }
}

function findSpotForCol(board, x, HEIGHT) {
    // TODO: write the real version of this, rather than always returning 0
    // looks for null from bottom, if greater than height, then return null
    for (var i = HEIGHT - 1; i >= 0; i--) {
        if (board[i][x] === null) {
            return i;
        }
    }
    return null;
}

function findWinningMove(board, currPlayer) {

    let possibleY = []

    for (let x = 0; x < board[0].length; x++) {
        let y = findSpotForCol(board, x, board.length)
        possibleY.push(y)
    }

    let winningX = []

    for (let i = 0; i < possibleY.length; i++) {
        let copyBoard = JSON.parse(JSON.stringify(board))
        copyBoard[possibleY[i]][i] = currPlayer
        //console.log(copyBoard)
        let isThisMoveAWin = checkForWin(copyBoard, currPlayer, copyBoard.length, copyBoard[0].length)
        if (isThisMoveAWin)
            winningX.push(i)
    }

    return winningX

}

function findDefenceMove(board, currPlayer) {

    let possibleEnemyY = []

    for (let x = 0; x < board[0].length; x++) {
        let y = findSpotForCol(board, x, board.length)
        possibleEnemyY.push(y)
    }

    let blockingX = []

    for (let i = 0; i < possibleEnemyY.length; i++) {
        let copyBoard = JSON.parse(JSON.stringify(board))
        let enemyPlayer = currPlayer === 1 ? 2 : 1
        copyBoard[possibleEnemyY[i]][i] = enemyPlayer
        //console.log(copyBoard)
        let isThisMoveAWinForEnemy = checkForWin(copyBoard, enemyPlayer, copyBoard.length, copyBoard[0].length)
        if (isThisMoveAWinForEnemy)
            blockingX.push(i)
    }

    return blockingX

}

function isKillPosition(hypoBoard) {


}

// console.log("winning move is " + findWinningMove(board, 1))
// console.log("defense move is " + findDefenceMove(board, 1))

