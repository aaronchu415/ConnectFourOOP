/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

var currPlayer = 1; // active player: 1 or 2
var board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // DONE - TODO: set "board" to empty HEIGHT x WIDTH matrix array

  board = []

  for (let y = 0; y < HEIGHT; y++) {
    let row = []
    for (let x = 0; x < WIDTH; x++) {
      row.push(null)
    }
    board.push(row)
  }

}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // DONE - TODO: get "board" variable from the item in HTML w/ID of "board"
  let board = document.getElementById('board');
  if (board === null) {
    return;
  }

  // TODO: add comment for this code
  // creates top row with id x
  var top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  board.append(top);

  // TODO: add comment for this code
  // creates rows below top row w/ id = 'y-x' for coordinates on board
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    board.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

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

/** placeInTable: update DOM to place piece into HTML board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement("div");

  if (currPlayer === 1) {
    piece.setAttribute("class", "piece playerOne");
  } else {
    piece.setAttribute("class", "piece playerTwo");
  }

  const td = document.getElementById(`${y}-${x}`);
  td.appendChild(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  setTimeout(function () {
    alert(msg);
  }, 300);
}

function resetGame() {
  setTimeout(function () {
    makeBoard();
    clearBoard()
    makeHtmlBoard();
  }, 300);
}

function clearBoard() {
  var myNode = document.getElementById("board");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(board, x, HEIGHT);
  if (y === null) {
    return;
  }


  //update board variable with player #
  board[y][x] = currPlayer


  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  let boardIsFilled = checkBoardIsFilled(board);
  // const boardIsFilled = board.every(row => {
  //   return row.every(cell => {
  //     //not null means its filled. 
  //     return cell !== null
  //   })
  // })

  if (boardIsFilled) {
    endGame('Tie Game')
    return resetGame()
  }

  // check for win
  if (checkForWin(board, currPlayer, HEIGHT, WIDTH)) {
    endGame(`Player ${currPlayer} won!`);
    return resetGame()
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1
}

function checkBoardIsFilled(board) {
  return board.every(row => {
    return row.every(cell => {
      //not null means its filled. 
      return cell !== null
    })
  })
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

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
// document.addEventListener("DOMContentLoaded", function(){
makeBoard();
makeHtmlBoard();
// })

var count = 0;

setInterval(function () {

  let move = 0
  let moves = []
  if (currPlayer === 1) {

    let winningMoves = findWinningMove(board, 1)
    let defenseMoves = findDefenceMove(board, 1)
    let futureWinMove = findFutureWinningMove(board, 1)
    futureWinMove = checkIfMoveWillResultInEnemyWinning(futureWinMove, board)
    futureWinMove = checkIfMoveWillResultInPincerAttack(futureWinMove, board)
    let futureDefenseMove = findFutureDefenseMove(board, 1)
    futureDefenseMove = checkIfMoveWillResultInEnemyWinning(futureDefenseMove, board)
    futureDefenseMove = checkIfMoveWillResultInPincerAttack(futureDefenseMove, board)
    let futurePincerMove = findFuturePincerMove(board, 1)
    futurePincerMove = checkIfMoveWillResultInEnemyWinning(futurePincerMove, board)
    let pincerDefenseMove = findPincerDefenseMove(board, 1)
    pincerDefenseMove = checkIfMoveWillResultInEnemyWinning(pincerDefenseMove, board)
    pincerDefenseMove = checkIfMoveWillResultInPincerAttack(pincerDefenseMove, board)



    moves = winningMoves.concat(defenseMoves).concat(futurePincerMove).concat(pincerDefenseMove).concat(futureWinMove).concat(futureDefenseMove)
    console.log("winning move is " + winningMoves)
    console.log("defense move is " + defenseMoves)
    console.log("pincer move is " + futurePincerMove)
    console.log("pincer defence move is " + pincerDefenseMove)
    console.log("future winning move is " + futureWinMove)
    console.log("future defense move is " + futureDefenseMove)
    console.log('---------------------')

    if (moves.length === 0) {
      move = Math.floor(Math.random() * (WIDTH - 1))
      var y = findSpotForCol(board, move, HEIGHT);
      if (y !== null) {

        if (checkIfMoveWillResultInEnemyWinning([move], board).length !== 0 || count > 10) {
          document.getElementById(`${move}`).click()
        } else {
          console.log('skipped over current random move of ' + move)
          count++
        }
      }


    } else {
      move = moves[0]
      document.getElementById(`${move}`).click()
      count = 0
    }


  }


}, 150);
