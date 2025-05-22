const board = document.getElementById("board");
const status = document.getElementById("status");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Create the game board
function createBoard() {
    board.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.index = i;
        cell.addEventListener("click", handleClick);
        board.appendChild(cell);
    }
}

// Handle user clicks
function handleClick(event) {
    const index = event.target.dataset.index;

    if (gameBoard[index] === "" && gameActive) {
        gameBoard[index] = currentPlayer;
        event.target.innerText = currentPlayer;

        if (checkWinner()) {
            status.innerText = `${currentPlayer} wins! 🎉`;
            gameActive = false;
            return;
        }

        if (gameBoard.includes("")) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.innerText = `Player ${currentPlayer}'s turn`;
        } else {
            status.innerText = "It's a draw! 🤝";
            gameActive = false;
        }
    }
}

// Check for winner
function checkWinner() {
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

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (
            gameBoard[a] &&
            gameBoard[a] === gameBoard[b] &&
            gameBoard[a] === gameBoard[c]
        ) {
            return true;
        }
    }
    return false;
}

// Reset the game
function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    status.innerText = `Player X's turn`;
    createBoard();
}

// Initialize the game
createBoard();
