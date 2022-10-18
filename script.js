let gameboard = ["", "", "", "", "", "", "", "", ""];

// GAME MODULE
const game = (() => {
  const updateGameboard = () => {
    gameboard.forEach((square, index) => {
      gameboard[index] = document.querySelector(
        `.gameboard :nth-child(${index + 1})`
      ).innerHTML;
    });
    console.log(gameboard);
  };

  const restart = () => {
    gameMessage.innerHTML = "Player X's turn";
    gameboard = ["", "", "", "", "", "", "", "", ""];
    let squares = document.querySelectorAll(".square");
    squares.forEach((square) => (square.innerHTML = ""));
  };

  const checkForGameEnd = () => {
    /*
    !  ⠀⠀⠀⠀⣀⠤⠔⠒⠒⠒⠒⠒⠒⠒⠦⢄⣀⠀⠀⠀⠀
    !  ⠀⢀⡴⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠑⢄⠀⠀
    !  ⢀⠎⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢣⠀
    !  ⢸⠀⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢢⠈⡇
    !  ⢸⠀⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡼⠀⡇
    !  ⠘⡆⢸⠀⢀⣀⣤⣄⡀⠀⠀⠀⢀⣤⣤⣄⡀⠀⡇⡸⠀
    !  ⠀⠘⣾⠀⣿⣿⣿⣿⣿⠀⠀⠀⣿⣿⣿⣿⣿⠀⡗⠁⠀
    !  ⠀⠀⣿⠀⠙⢿⣿⠿⠃⢠⢠⡀⠙⠿⣿⠿⠃⠀⡇⠀⠀
    !  ⠀⠀⠘⣄⡀⠀⠀⠀⢠⣿⢸⣿⠀⠀⠀⠀⠀⣠⠇⠀⠀
    !  ⠀⠀⠀⠀⡏⢷⡄⠀⠘⠟⠈⠿⠁⠀⢠⡞⡹⠁⠀⠀⠀
    !  ⠀⠀⠀⠀⢹⠸⠘⢢⢠⠤⠤⡤⡄⢰⢡⠁⡇⠀⠀⠀⠀
    !  ⠀⠀⠀⠀⢸⠀⠣⣹⢸⠒⠒⡗⡇⣩⠌⢀⡇⠀⠀⠀⠀
    !  ⠀⠀⠀⠀⠈⢧⡀⠀⠉⠉⠉⠉⠁⠀⣀⠜⠀⠀⠀⠀⠀
    !  ⠀⠀⠀⠀⠀⠀⠉⠓⠢⠤⠤⠤⠔⠊⠁⠀⠀⠀⠀⠀⠀
   */

    if (
      (gameboard[0] === gameboard[1] &&
        gameboard[0] === gameboard[2] &&
        gameboard[0] !== "") ||
      (gameboard[3] === gameboard[4] &&
        gameboard[3] === gameboard[5] &&
        gameboard[3] !== "") ||
      (gameboard[6] === gameboard[7] &&
        gameboard[6] === gameboard[8] &&
        gameboard[6] !== "") ||
      (gameboard[0] === gameboard[3] &&
        gameboard[0] === gameboard[6] &&
        gameboard[0] !== "") ||
      (gameboard[1] === gameboard[4] &&
        gameboard[1] === gameboard[7] &&
        gameboard[1] !== "") ||
      (gameboard[2] === gameboard[5] &&
        gameboard[2] === gameboard[8] &&
        gameboard[2] !== "") ||
      (gameboard[0] === gameboard[4] &&
        gameboard[0] === gameboard[8] &&
        gameboard[0] !== "") ||
      (gameboard[2] === gameboard[4] &&
        gameboard[2] === gameboard[6] &&
        gameboard[2] !== "")
    ) {
      // Make squares unclickable
      squares.forEach((square) => {
        square.style.pointerEvents = "none";
      });
      if (mark === "X") {
        gameMessage.innerHTML = `Player O won`;
      } else {
        gameMessage.innerHTML = `Player X won`;
      }
    }
  };

  const playRound = (e) => {
    if (!e.target.innerHTML) {
      if (mark === "X") {
        e.target.innerHTML = mark;
        mark = "O";
      } else if (mark === "O") {
        e.target.innerHTML = mark;
        mark = "X";
      }
      gameMessage.innerHTML = `Player ${mark}'s turn`;
    }
    updateGameboard();
    checkForGameEnd();
  };

  return {
    updateGameboard,
    checkForGameEnd,
    restart,
    playRound,
  };
})();

// INTERFACE
let squares = document.querySelectorAll(".square");
let gameMessage = document.querySelector(".game-message");
let restartBtn = document.querySelector(".restart");
let mark = "X";

restartBtn.addEventListener("click", () => {
  game.restart();
});

squares.forEach((square) => {
  square.addEventListener("click", (e) => game.playRound(e));
});
