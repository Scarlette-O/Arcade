const cells = document.getElementsByClassName("cell");
const resetButton = document.getElementById("resetButton");
const statusDisplay = document.getElementById("statusDisplay");
const winnerText = document.getElementById("winnerText");
const player1NameInput = document.getElementById("player1Name");
const player2NameInput = document.getElementById("player2Name");
const player1Display = document.getElementById("player1Display");
const player2Display = document.getElementById("player2Display");

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
let player1Name = "";
let player2Name = "";
let isComputerMode = false;

function start() {
  Array.from(cells).forEach((cell) => cell.addEventListener("click", clicked));
  resetButton.addEventListener("click", resetGame);
  player1Name = player1NameInput.value || "Player 1";
  player2Name = player2NameInput.value || "Player 2";

  const startingPlayer = Math.random() < 0.5 ? "X" : "O";
  currentPlayer = startingPlayer;

  player1Display.textContent = getPlayerName("X");
  player2Display.textContent = getPlayerName("O");
  statusDisplay.textContent = `${getPlayerName(currentPlayer)}'s turn`;
  running = true;
  const playerSelect = document.getElementById("playerSelect");
  playerSelect.addEventListener("change", changeMode);
  changeMode();
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

function getPlayerName(player) {
  if (isComputerMode && player === "O") {
    return "Computer";
  }
  return player === "X" ? player1Name : player2Name;
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  const playerName = getPlayerName(currentPlayer);
  statusDisplay.textContent = `${playerName}'s turn`;
  player1Display.textContent = playerName;
  player2Display.textContent = playerName === player1Name ? player2Name : player1Name;
}

function changeMode() {
  const playerSelect = document.getElementById("playerSelect");
  isComputerMode = playerSelect.value === "Computer";
  resetGame();
  if (isComputerMode) {
    player2NameInput.value = "Computer";
    player2NameInput.disabled = true;
  } else {
    player2NameInput.value = "";
    player2NameInput.disabled = false;
  }
}

function resetGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.textContent = `${getPlayerName(currentPlayer)}'s turn`;
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
      const winnerName = getPlayerName(currentPlayer);
      statusDisplay.textContent = `${winnerName} wins!`;
      winnerText.textContent = `${winnerName} wins!`;
      running = false;
      winnerText.style.display = "block";
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