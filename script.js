const cells = document.querySelectorAll("[data-cell]");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function checkWin(player) {
    return winPatterns.find(pattern =>
        pattern.every(index => board[index] === player)
    );
}

function checkDraw() {
    return board.every(cell => cell !== "");
}

function handleClick(e) {
    const cell = e.target;
    const index = Array.from(cells).indexOf(cell);

    if (board[index] !== "") return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    const winningPattern = checkWin(currentPlayer);
    if (winningPattern) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        cells.forEach(cell => cell.classList.add("taken"));
        winningPattern.forEach(index => {
            cells[index].style.color = "red";
        });
    } else if (checkDraw()) {
        statusText.textContent = "It's a draw!";
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.color = "white"; // Reset cell color
        cell.classList.remove("taken");
    });
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
restartButton.addEventListener("click", restartGame);
