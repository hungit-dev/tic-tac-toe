const Gameboard = (function () {
  //logic variables
  let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

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

  //Control logics of tic tac toe
  function gameController() {
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
        winner = Object.assign({}, activePlayer);
        foundWinner = true;
      }
    };
    const restart = function () {
      board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
      for (let i = 0; i < 9; i++) {
        divList[i].textContent = "";
      }
      winnerDisplay.textContent = "";
      uiBoard.style.pointerEvents = "auto";
      uiBoard.style.opacity = 1;
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
        winnerDisplay.textContent = "TIE";
        uiBoard.style.pointerEvents = "none";
        uiBoard.style.opacity = 0.5;
      }
    };
    //function select cells for both players
    const select = function (a, b) {
      board[a][b] = activePlayer.symbol;
      checkForWinner();
      switchActivePlayer();

      //restart game if found winner
      if (foundWinner === true) {
        winnerDisplay.textContent = `Winner for this round is ${winner.name}`;
        uiBoard.style.pointerEvents = "none";
        uiBoard.style.opacity = 0.5;
      }
      //restart game and declare Tie if all cells have been selected and there is no winner
      if (foundWinner === false) {
        declareTie();
      }
    };

    return { select, restart };
  }
  const controller = gameController(); //run logics

  //Display and Render on web page
  //DOM variables

  const divList = document.querySelectorAll(".cell");
  const winnerDisplay = document.querySelector(".winner-display");
  const uiBoard = document.querySelector(".container");
  const dialog = document.querySelector("dialog");
  const startButton = document.querySelector("#start-button");
  const changeNameButton = document.querySelector("#change-name-button");
  const submitButton = document.querySelector("#submit-button");
  const closeButton = document.querySelector("#close-button");
  const restartButton = document.querySelector("#restart-button");
  const player1Name = document.querySelector("#player1-name");
  const player2Name = document.querySelector("#player2-name");

  function displayController() {
    //display UIboard for user when clicking "start" button
    startButton.addEventListener("click", () => {
      uiBoard.style.display = "grid";
    });
    //display Form for changing users' names
    changeNameButton.addEventListener("click", () => {
      dialog.showModal();
    });
    //Change name for players when clicking in form
    submitButton.addEventListener("click", (event) => {
      event.preventDefault();
      if (player1Name.value === "" || player2Name.value === "") {
        alert("please fill out the entire form!");
        return;
      }
      players[0].name = player1Name.value;
      players[1].name = player2Name.value;

      dialog.close();
    });
    //close the form when clicking
    closeButton.addEventListener("click", (event) => {
      event.preventDefault();
      dialog.close();
    });
    //restart Game when clicking
    restartButton.addEventListener("click", () => {
      controller.restart();
    });
    //Let user interact with board, render logic
    const display = function () {
      divList.forEach((div) => {
        div.addEventListener("click", function (event) {
          // Checks for selected cells first
          if (event.target.textContent === "") {
            if (event.target === divList[0]) {
              event.target.textContent = activePlayer.symbol;
              controller.select(0, 0);
            }
            if (event.target === divList[1]) {
              event.target.textContent = activePlayer.symbol;
              controller.select(0, 1);
            }
            if (event.target === divList[2]) {
              event.target.textContent = activePlayer.symbol;
              controller.select(0, 2);
            }
            if (event.target === divList[3]) {
              event.target.textContent = activePlayer.symbol;
              controller.select(1, 0);
            }
            if (event.target === divList[4]) {
              event.target.textContent = activePlayer.symbol;
              controller.select(1, 1);
            }
            if (event.target === divList[5]) {
              event.target.textContent = activePlayer.symbol;
              controller.select(1, 2);
            }
            if (event.target === divList[6]) {
              event.target.textContent = activePlayer.symbol;
              controller.select(2, 0);
            }
            if (event.target === divList[7]) {
              event.target.textContent = activePlayer.symbol;
              controller.select(2, 1);
            }
            if (event.target === divList[8]) {
              event.target.textContent = activePlayer.symbol;
              controller.select(2, 2);
            }
          }
        });
      });
    };
    return { display };
  }

  return { gameController, displayController };
})();

const play = Gameboard.displayController().display;
play();
