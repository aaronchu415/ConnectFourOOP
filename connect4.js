/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */


/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */


class Game {
  constructor(height, width, players) {
    this.height = height;
    this.width = width;
    this.board = [];
    this.currPlayer = players[0];
    this.freezeBoard = false;

    this.players = players

    this.makeBoard();
    this.makeHtmlBoard();
  }

  // Method
  makeBoard() {
    this.board = [];

    for (let y = 0; y < this.height; y++) {
      let row = [];
      for (let x = 0; x < this.width; x++) {
        row.push(null);
      }
      this.board.push(row);
    }
  }

  makeHtmlBoard() {
    // DONE - TODO: get "board" variable from the item in HTML w/ID of "board"
    let board = document.getElementById('board');
    if (board === null) {
      return;
    }

    // TODO: add comment for this code
    // creates top row with id x
    var top = document.createElement("tr");
    top.setAttribute("id", "column-top");
    top.addEventListener("click", this.handleClick.bind(this));

    for (var x = 0; x < this.width; x++) {
      var headCell = document.createElement("td");
      headCell.setAttribute("id", x);
      top.append(headCell);
    }
    board.append(top);

    // TODO: add comment for this code
    // creates rows below top row w/ id = 'y-x' for coordinates on board
    for (var y = 0; y < this.height; y++) {
      const row = document.createElement("tr");
      for (var x = 0; x < this.width; x++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", `${y}-${x}`);
        row.append(cell);
      }
      board.append(row);
    }
  }

  findSpotForCol(board, x, height) {
    // TODO: write the real version of this, rather than always returning 0
    // looks for null from bottom, if greater than height, then return null
    for (var i = height - 1; i >= 0; i--) {
      if (board[i][x] === null) {
        return i;
      }
    }
    return null;
  }

  placeInTable(y, x) {
    // TODO: make a div and insert into correct table cell
    const piece = document.createElement("div");

    if (this.currPlayer.id === 1) {
      piece.setAttribute("class", `piece playerOne ${this.currPlayer.color.toLowerCase()}`);
    } else {
      piece.setAttribute("class", `piece playerTwo ${this.currPlayer.color.toLowerCase()}`);
    }

    const td = document.getElementById(`${y}-${x}`);
    td.appendChild(piece);
  }

  endGame(msg) {
    // TODO: pop up alert message
    this.freezeBoard = true

    setTimeout(function () {
      alert(msg);
    }, 300);
  }

  resetGame() {
    //   // setTimeout(function () {
    //   //   this.makeBoard();
    //   //   this.clearBoard()
    //   //   this.makeHtmlBoard();
    //   // }, 300);
  }

  // clearBoard() {
  //   var myNode = document.getElementById("board");
  //   while (myNode.firstChild) {
  //     myNode.removeChild(myNode.firstChild);
  //   }
  // }

  handleClick(evt) {

    if (this.freezeBoard === true) {
      return
    };

    // get x from ID of clicked cell
    var x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    var y = this.findSpotForCol(this.board, x, this.height);
    if (y === null) {
      return;
    }


    //update board variable with player #
    this.board[y][x] = this.currPlayer.id


    // place piece in board and add to HTML table
    // TODO: add line to update in-memory board
    this.placeInTable(y, x);

    // check for tie
    // TODO: check if all cells in board are filled; if so call, call endGame
    let boardIsFilled = this.checkBoardIsFilled(this.board);
    // const boardIsFilled = board.every(row => {
    //   return row.every(cell => {
    //     //not null means its filled. 
    //     return cell !== null
    //   })
    // })

    if (boardIsFilled) {
      this.endGame('Tie Game')
      return this.resetGame()
    }

    // check for win
    if (this.checkForWin(this.board, this.currPlayer.id, this.height, this.width)) {
      this.endGame(`Player ${this.currPlayer.id} won!`);
      return this.resetGame()
    }

    // switch players
    // TODO: switch currPlayer 1 <-> 2
    this.currPlayer = this.currPlayer.id === 1 ? this.players[1] : this.players[0]
  }

  checkBoardIsFilled(board) {
    return board.every(row => {
      return row.every(cell => {
        //not null means its filled. 
        return cell !== null
      })
    })
  }

  checkForWin(board, currPlayerID, height, width) {
    function _win(cells) {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer

      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < height &&
          x >= 0 &&
          x < width &&
          board[y][x] === currPlayerID
      );
    }

    // TODO: read and understand this code. Add comments to help you.

    //loop through each cell in the board
    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {

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

}

var game;

function startGame() {

  //clear html board
  clearBoard();

  let players = []
  let playerId = 0

  //get color from form and make player. append player obj to players array
  var elements = document.querySelectorAll("select");
  for (var i = 0; i < elements.length; ++i) {
    var color = elements[i].value;
    playerId++

    console.log(color, playerId)
    let player = new Player(color, playerId)
    players.push(player)
  }


  //create a new game instance
  game = new Game(6, 7, players);

  function clearBoard() {
    var myNode = document.getElementById("board");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
  }
}

class Player {

  constructor(color, id) {
    this.color = color
    this.id = id
  }

}


var count = 0;

setInterval(function () {

  if (game === undefined) {
    return
  }

  let move = 0
  let moves = []
  if (game.currPlayer.id === 1) {

    let winningMoves = findWinningMove(game.board, 1)
    let defenseMoves = findDefenceMove(game.board, 1)
    let futureWinMove = findFutureWinningMove(game.board, 1)
    futureWinMove = checkIfMoveWillResultInEnemyWinning(futureWinMove, game.board)
    futureWinMove = checkIfMoveWillResultInPincerAttack(futureWinMove, game.board)
    let futureDefenseMove = findFutureDefenseMove(game.board, 1)
    futureDefenseMove = checkIfMoveWillResultInEnemyWinning(futureDefenseMove, game.board)
    futureDefenseMove = checkIfMoveWillResultInPincerAttack(futureDefenseMove, game.board)
    let futurePincerMove = findFuturePincerMove(game.board, 1)
    futurePincerMove = checkIfMoveWillResultInEnemyWinning(futurePincerMove, game.board)
    let pincerDefenseMove = findPincerDefenseMove(game.board, 1)
    pincerDefenseMove = checkIfMoveWillResultInEnemyWinning(pincerDefenseMove, game.board)
    pincerDefenseMove = checkIfMoveWillResultInPincerAttack(pincerDefenseMove, game.board)

    moves = winningMoves.concat(defenseMoves).concat(futurePincerMove).concat(pincerDefenseMove).concat(futureWinMove).concat(futureDefenseMove)
    console.log("winning move is " + winningMoves)
    console.log("defense move is " + defenseMoves)
    console.log("pincer move is " + futurePincerMove)
    console.log("pincer defence move is " + pincerDefenseMove)
    console.log("future winning move is " + futureWinMove)
    console.log("future defense move is " + futureDefenseMove)
    console.log('---------------------')

    if (moves.length === 0) {
      move = Math.floor(Math.random() * (game.width - 1))
      var y = findSpotForCol(game.board, move, game.board.length);
      if (y !== null) {

        if ((checkIfMoveWillResultInEnemyWinning([move], game.board).length !== 0 && checkIfMoveWillResultInPincerAttack([move], game.board).length !== 0) || count > 10) {
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
