const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const themeBtn = document.getElementById("themeToggle");

const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let xWins = 0;
let oWins = 0;

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

cells.forEach(cell => {
  cell.addEventListener("click", handleClick);
});

restartBtn.addEventListener("click", restartGame);

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

function handleClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  checkResult();
}

function checkResult() {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;

    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      gameActive = false;
      statusText.textContent = `Player ${currentPlayer} wins 🎉`;

      cells[a].classList.add("win");
      cells[b].classList.add("win");
      cells[c].classList.add("win");

      updateScore();
      return;
    }
  }

  if (!board.includes("")) {
    statusText.textContent = "It's a draw 😐";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;

  if (currentPlayer === "O") {
    setTimeout(computerMove, 500);
  }
}

function computerMove() {
  if (!gameActive) return;

  let emptyCells = board
    .map((val, index) => val === "" ? index : null)
    .filter(v => v !== null);

  let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

  board[randomIndex] = "O";
  cells[randomIndex].textContent = "O";

  checkResult();
}

function updateScore() {
  if (currentPlayer === "X") {
    xWins++;
    scoreX.textContent = xWins;
  } else {
    oWins++;
    scoreO.textContent = oWins;
  }
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = "Player X's turn";

  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("win");
  });
}
