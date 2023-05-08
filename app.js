const cells = document.getElementsByClassName("cell");
const winner = document.getElementById("winnerText");
const resetButton = document.getElementsByTagName("Reset");
const statusDisplay = document.getElementsByClassName("GameStatus")

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

function start(){
    cells.forEach((cells) => cells.addEventListener('click', clicked));
    resetButton.addEventListener("click", resetGame);
    statusDisplay.textContent = "Player ${currentPlayer}'s turn";
    running = true;
}

function clicked(){
    const cellIndex = this.getAttribute('cellIndex');
    if(options[cellIndex] != "" || !running){
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function turns() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    statusDisplay.textContent = "${currentPlayer}'s turn";
}

function resetGame(){
        currentPlayer = 'X';
        options = ["", "", "", "", "", "", "", "", ""];
        statusDisplay.textContent = "${currentPlayer}'s turn";
        cells.forEach(cells => cells.textContent)
        running = true;
}

function winnerResult(){
    let gameWin = false;
    for (let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i]; 
        let a = options[condition[0]];
        let b = options[condition[1]];
        let c = options[condition[2]];
        if (a === ""|| b === ""|| c === ""){
            continue;
        }
        if (a === b && b === c){
            gameWin = true;
            break;
        }
    }
    if (gameWin){
        statusDisplay.textContent = "${currentPlayer} wins";
        running = false;
    }
    else if (!options.includes("")){
        statusDisplay.textContent = "Draw"
        running = false;
    }
    else {
        changePlayer();
    }

}
