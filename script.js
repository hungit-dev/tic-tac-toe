const Gameboard = (function () {
  let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const getBoard = function () {
    return board;
  };
  //Control logic of tic tac toe
  function gameController() {
    let players = [
      {
        name: "player1",
        symbol: "X",
      },
      {
        name: "player2",
        symbol: "O",
      },
    ];
    let winner;
    let foundWinner = false;
    let activePlayer = players[0];
    //functions logic

    const showActivePlayer = function () {
      return activePlayer;
    };
    const switchActivePlayer = function () {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const checkForWinner = function () {
      if (
        (board[0][0] === activePlayer.symbol) &
          (board[0][1] === activePlayer.symbol) &
          (board[0][2] === activePlayer.symbol) ||
        (board[1][0] === activePlayer.symbol) &
          (board[1][1] === activePlayer.symbol) &
          (board[1][2] === activePlayer.symbol) ||
        (board[2][0] === activePlayer.symbol) &
          (board[2][1] === activePlayer.symbol) &
          (board[2][2] === activePlayer.symbol) ||
        (board[0][0] === activePlayer.symbol) &
          (board[1][0] === activePlayer.symbol) &
          (board[2][0] === activePlayer.symbol) ||
        (board[0][1] === activePlayer.symbol) &
          (board[1][1] === activePlayer.symbol) &
          (board[2][1] === activePlayer.symbol) ||
        (board[0][2] === activePlayer.symbol) &
          (board[1][2] === activePlayer.symbol) &
          (board[2][2] === activePlayer.symbol) ||
        (board[0][0] === activePlayer.symbol) &
          (board[1][1] === activePlayer.symbol) &
          (board[2][2] === activePlayer.symbol) ||
        (board[0][2] === activePlayer.symbol) &
          (board[1][1] === activePlayer.symbol) &
          (board[2][0] === activePlayer.symbol)
      ) {
        winner = activePlayer;
        console.log("Winner is: " + activePlayer.name);
        foundWinner = true;
      }
    };
    const restart = function () {
      board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
      activePlayer = players[0];
      foundWinner = false;
    };
    const declareTie = function (a, b) {
      if (
        (board[0][0] !== 0) &
        (board[0][1] !== 0) &
        (board[0][2] !== 0) &
        (board[1][0] !== 0) &
        (board[1][1] !== 0) &
        (board[1][2] !== 0) &
        (board[2][0] !== 0) &
        (board[2][1] !== 0) &
        (board[2][2] !== 0)
      ) {
        console.log(board);
        restart();
        console.log("TIE");
        console.log("Player for new game is: " + activePlayer.name);
      }
    };
    //function play
    const select = function (a, b) {
      //if cell hasn't been selected
      if (board[a][b] === 0) {
        board[a][b] = activePlayer.symbol;
        console.log("the player just selected is: " + activePlayer.name);
        checkForWinner();
        switchActivePlayer();

        //restart game if found winner
        if (foundWinner === true) {
          restart();
          console.log("game done!");
          console.log("Player for new Round: " + activePlayer.name);
        }
        //restart game and declare Tie if all cells have been selected and there is no winner
        if (foundWinner === false) {
          declareTie();
        }
        return;
      }
      //if select selected cell
      if (board[a][b] !== 0) {
        console.log("This cell has been selected!");
        console.log("the current player is: " + activePlayer.name);
      }
    };

    return { showActivePlayer, select };
  }
  return { getBoard, gameController };
})();

const playRound = Gameboard.gameController();
playRound.select(0, 0);
playRound.select(0, 2);
playRound.select(1, 1);
playRound.select(2, 2);
playRound.select(2, 1);
playRound.select(1, 2);
console.log(Gameboard.getBoard());
