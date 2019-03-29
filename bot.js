// let board = [
//     [2, null, null, null, null, null, null],
//     [2, null, null, null, null, null, null],
//     [2, null, 2, null, null, null, null],
//     [1, null, 2, null, null, null, null],
//     [1, 2, 1, null, null, null, 2],
//     [1, 2, 2, 1, 1, 1, 2],
// ]

// let board = [
//     [null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null],
//     [null, null, 2, 2, 2, null, null],
//     [null, null, 1, 1, 2, null, null],
//     [null, 1, 1, 1, 1, null, null],
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

function checkForFutureWin(board, currPlayer, HEIGHT, WIDTH) {
    function _win(cells) {
        // Check four cells to see if they're all color of current player
        //  - cells: list of four (y, x) cells
        //  - returns true if all are legal coordinates & all match currPlayer

        if (cells === null) {
            return false
        }

        let row = cells.map(([y, x]) => {
            if (!(y >= 0 &&
                y < HEIGHT &&
                x >= 0 &&
                x < WIDTH)) {
                return 0
            }
            if (board[y]) {
                if (board[y][x]) {
                    return board[y][x]
                }
            }
            return null
        })

        let countOne = 0
        let countNull = 0

        for (let i = 0; i < row.length; i++) {
            if (row[i] === currPlayer) {
                countOne++
            }

            if (row[i] === null) {
                countNull++
            }
        }

        if (countOne === 3 && countNull === 1) {
            return true
        } else {
            return false
        }
    }

    // TODO: read and understand this code. Add comments to help you.

    //loop through each cell in the board
    for (var y = 0; y < HEIGHT; y++) {
        for (var x = 0; x < WIDTH; x++) {

            //get horrizontal
            var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
            if (checkIfBelowIsNotNull(board, horiz) === false) {
                horiz = null
            }

            //get vertical
            var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
            if (checkIfBelowIsNotNull(board, vert) === false) {
                vert = null
            }

            //get diag
            var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
            if (checkIfBelowIsNotNull(board, diagDR) === false) {
                diagDR = null
            }

            //get diagDR
            var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

            if (checkIfBelowIsNotNull(board, diagDL) === false) {
                diagDL = null
            }

            //check winning conditions
            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                return true;
            }
        }
    }
}


function checkForPincerFormation(board, currPlayer, HEIGHT, WIDTH) {
    function _win(cells) {
        // Check four cells to see if they're all color of current player
        //  - cells: list of four (y, x) cells
        //  - returns true if all are legal coordinates & all match currPlayer

        if (cells === null) {
            return false
        }

        let row = cells.map(([y, x]) => {
            if (!(y >= 0 &&
                y < HEIGHT &&
                x >= 0 &&
                x < WIDTH)) {
                return 0
            }
            if (board[y]) {
                if (board[y][x]) {
                    return board[y][x]
                }
            }
            return null
        })


        let formation = [null, currPlayer, currPlayer, currPlayer, null]

        for (let i = 0; i < row.length; i++) {
            if (row[i] !== formation[i]) {
                return false
            }
        }
        return true


        // let countOne = 0
        // let countNull = 0

        // for (let i = 0; i < row.length; i++) {
        //     if (row[i] === currPlayer) {
        //         countOne++
        //     }

        //     if (row[i] === null) {
        //         countNull++
        //     }
        // }

        // if (countOne === 3 && countNull === 1) {
        //     return true
        // } else {
        //     return false
        // }
    }

    // TODO: read and understand this code. Add comments to help you.

    //loop through each cell in the board
    for (var y = 0; y < HEIGHT; y++) {
        for (var x = 0; x < WIDTH; x++) {

            //get horrizontal
            var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3], [y, x + 4]];
            if (checkIfBelowIsNotNull(board, horiz) === false) {
                horiz = null
            }

            //get vertical
            var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x], [y + 4, x]];
            if (checkIfBelowIsNotNull(board, vert) === false) {
                vert = null
            }

            //get diag
            var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3], [y + 4, x + 4]];
            if (checkIfBelowIsNotNull(board, diagDR) === false) {
                diagDR = null
            }

            //get diagDR
            var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3], [y + 4, x - 4]];

            if (checkIfBelowIsNotNull(board, diagDL) === false) {
                diagDL = null
            }

            //check winning conditions
            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                return true;
            }
        }
    }
}

function checkIfBelowIsNotNull(board, arrOfCords) {

    for (let i = 0; i < arrOfCords.length; i++) {
        let [y, x] = arrOfCords[i]

        for (let j = board.length - 1; j > y; j--) {

            let cell = board[j][x]
            if (cell === null) {
                return false
            }

        }
    }

    return true

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

        if (possibleY[i] !== null) {
            copyBoard[possibleY[i]][i] = currPlayer
            let isThisMoveAWin = checkForWin(copyBoard, currPlayer, copyBoard.length, copyBoard[0].length)
            if (isThisMoveAWin)
                winningX.push(i)
            //console.log(copyBoard)
        }
    }

    return winningX

}

function findFutureWinningMove(board, currPlayer) {

    let possibleY = []

    for (let x = 0; x < board[0].length; x++) {
        let y = findSpotForCol(board, x, board.length)
        possibleY.push(y)

    }

    let winningX = []

    for (let i = 0; i < possibleY.length; i++) {
        let copyBoard = JSON.parse(JSON.stringify(board))

        if (possibleY[i] !== null) {
            copyBoard[possibleY[i]][i] = currPlayer
            let isThisMoveAWin = checkForFutureWin(copyBoard, currPlayer, copyBoard.length, copyBoard[0].length)
            if (isThisMoveAWin)
                winningX.push(i)
        }
    }

    return winningX

}

function findFuturePincerMove(board, currPlayer) {

    let possibleY = []

    for (let x = 0; x < board[0].length; x++) {
        let y = findSpotForCol(board, x, board.length)
        possibleY.push(y)

    }

    let pincerX = []

    for (let i = 0; i < possibleY.length; i++) {
        let copyBoard = JSON.parse(JSON.stringify(board))

        if (possibleY[i] !== null) {
            copyBoard[possibleY[i]][i] = currPlayer
            let isThisMoveAPincer = checkForPincerFormation(copyBoard, currPlayer, copyBoard.length, copyBoard[0].length)
            if (isThisMoveAPincer)
                pincerX.push(i)
        }
    }

    return pincerX

}

function findPincerDefenseMove(board, currPlayer) {

    let possibleEnemyY = []

    for (let x = 0; x < board[0].length; x++) {
        let y = findSpotForCol(board, x, board.length)
        possibleEnemyY.push(y)

    }

    let blockingX = []

    for (let i = 0; i < possibleEnemyY.length; i++) {
        let copyBoard = JSON.parse(JSON.stringify(board))

        let enemyPlayer = currPlayer === 1 ? 2 : 1
        if (possibleEnemyY[i] !== null) {
            copyBoard[possibleEnemyY[i]][i] = enemyPlayer
            let isThisMoveAWin = checkForPincerFormation(copyBoard, enemyPlayer, copyBoard.length, copyBoard[0].length)
            if (isThisMoveAWin)
                blockingX.push(i)
        }
    }

    return blockingX

}

function findFutureDefenseMove(board, currPlayer) {

    let possibleEnemyY = []

    for (let x = 0; x < board[0].length; x++) {
        let y = findSpotForCol(board, x, board.length)
        possibleEnemyY.push(y)

    }

    let blockingX = []

    for (let i = 0; i < possibleEnemyY.length; i++) {
        let copyBoard = JSON.parse(JSON.stringify(board))

        let enemyPlayer = currPlayer === 1 ? 2 : 1
        if (possibleEnemyY[i] !== null) {
            copyBoard[possibleEnemyY[i]][i] = enemyPlayer
            let isThisMoveAWin = checkForFutureWin(copyBoard, enemyPlayer, copyBoard.length, copyBoard[0].length)
            if (isThisMoveAWin)
                blockingX.push(i)
        }
    }

    return blockingX

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
        if (possibleEnemyY[i] !== null) {
            copyBoard[possibleEnemyY[i]][i] = enemyPlayer
            //console.log(copyBoard)
            let isThisMoveAWinForEnemy = checkForWin(copyBoard, enemyPlayer, copyBoard.length, copyBoard[0].length)
            if (isThisMoveAWinForEnemy)
                blockingX.push(i)
        }
    }

    return blockingX

}

function isKillPosition(hypoBoard) {


}

function checkIfMoveWillResultInEnemyWinning(futureWinMove, board) {

    let output = []

    for (let i = 0; i < futureWinMove.length; i++) {
        let x = futureWinMove[i]
        let y = findSpotForCol(board, x, board.length);

        let copyBoard = JSON.parse(JSON.stringify(board))

        //make the move
        copyBoard[y][x] = 1

        let movesEnemyCanDoToWin = findWinningMove(copyBoard, 2)

        //if moves that enemy can do to win is none then that is a good move
        if (movesEnemyCanDoToWin.length === 0) {
            output.push(futureWinMove[i])
        }
        else {
            console.log('removing winning' + futureWinMove[i] + 'prev' + futureWinMove)
        }

    }

    return output
}

function checkIfMoveWillResultInPincerAttack(futureWinMove, board) {

    let output = []

    for (let i = 0; i < futureWinMove.length; i++) {
        let x = futureWinMove[i]
        let y = findSpotForCol(board, x, board.length);

        let copyBoard = JSON.parse(JSON.stringify(board))

        //make the move
        copyBoard[y][x] = 1

        let movesEnemyCanDoToPincer = findFuturePincerMove(copyBoard, 2)

        //if moves that enemy can do to win is none then that is a good move
        if (movesEnemyCanDoToPincer.length === 0) {
            output.push(futureWinMove[i])
        }
        else {
            console.log('removing pincer' + futureWinMove[i] + 'prev' + futureWinMove)
        }

    }

    return output
}

// console.log("winning move is " + findWinningMove(board, 1))
// console.log("defense move is " + findDefenceMove(board, 1))
// console.log("futureWinning move is " + findFutureWinningMove(board, 1))

// console.log(checkForFutureWin(board, 1, board.length, board[0].length))

// console.log(checkIfBelowIsNotNull(board, [[10, 1]]))

// console.log(findFutureDefenseMove(board, 1))

// console.log(checkForPincerFormation(board, 1, board.length, board[0].length))
// console.log("pincer move is " + findFuturePincerMove(board, 1))

// console.log(checkIfMoveWillResultInEnemyWinning([1, 3, 4, 5], board))

