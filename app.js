const cells = document.getElementsByClassName("cell");
const resetButton = document.getElementById("resetButton");
const statusDisplay = document.getElementById("statusDisplay");
const winnerText = document.getElementById("winnerText");

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

function start() {
  Array.from(cells).forEach((cell) => cell.addEventListener("click", clicked));
  resetButton.addEventListener("click", resetGame);
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  running = true;
}

function clicked() {
  const cellIndex = parseInt(this.getAttribute("cellIndex"));
  if (options[cellIndex] !== "" || !running) {
    return;
  }
  updateCell(this, cellIndex);
  checkWinner();
  changePlayer();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  Array.from(cells).forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("X", "O");
  });
  winnerText.textContent = "";
  running = true;
}

function checkWinner() {
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (
      options[a] === currentPlayer &&
      options[b] === currentPlayer &&
      options[c] === currentPlayer
    ) {
      statusDisplay.textContent = `Player ${currentPlayer} wins!`;
      winnerText.textContent = `Player ${currentPlayer} wins!`;
      running = false;
      return;
    }
  }

  if (!options.includes("")) {
    statusDisplay.textContent = "It's a draw!";
    winnerText.textContent = "It's a draw!";
    running = false;
    return;
  }
}

start();