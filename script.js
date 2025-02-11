function Gameboard() {
    // Define array and dimensions
    let board = [],
    rows = 3,
    columns = 3;

    // While i < rows, board[i] = an empty array
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        // For each array inside board add an element until j is no longer < columns
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }
    const getBoard = () => board;

    const placeMarker = (row, column, player) => {
        if (board[row][column].getValue() == 0) {
            board[row][column].addMarker(player.marker);
        } else if (board[row][column].getValue() != 0) {
            // If at the chosen index a marker is preset, return nothing and print a warning
            console.log('Cell already taken!');
        }
    }

    // Reset the board elements to defualt values
    const resetBoard = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                board[i][j] = Cell();
            }
        }
    }

    const printBoard = () => {
        // What's happening here is that we're essentially creating a new array that contains the values of the cells and printing it out
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    }

    return {
        getBoard,
        placeMarker,
        resetBoard,
        printBoard,
    }

}

function GameController
(
    playerOneName = 'Player One',
    playerTwoName = 'Player Two'
) {

    let board = Gameboard();

    let players =
    [
        {
            playerName: playerOneName,
            marker: 1,
        },
        {
            playerName: playerTwoName,
            marker: 2,
        }
    ]

    // Define starting player
    let currentPlayer = players[0];

    // If currentPlayer is playerOne then switch currentPlayer to playerTwo and vice versa
    const switchTurn = () => currentPlayer = currentPlayer === players[0] ? players[1] : players[0];

    // Return currentPlayer value
    const getPlayer = () => currentPlayer;

    const restartGame = () => {
        board.resetBoard();
        currentPlayer = players[0];
        console.log("New game has been created.");
        board.printBoard();
        renderBoard(game);
    }

    const checkWinner = (board) => {
        let winningCombinations = [
            // Column wins
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            // Row wins
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            // Diagonal wins
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]],
        ];

        for (let combination of winningCombinations) {
            let [a, b, c] = combination;
            if (
                board[a[0]][a[1]].getValue() === board[b[0]][b[1]].getValue() &&
                board[b[0]][b[1]].getValue() === board[c[0]][c[1]].getValue() &&
                board[a[0]][a[1]].getValue() != 0
            ) {
                return board[a[0]][a[1]].getValue();
            }
        }
        return null;
    }

    const boardFull = (board) => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j].getValue() == 0) {
                    return false;
                }
            }
        }
        return true;
    }

    const playRound = (row, column) => {
        // Prevent move if cell already has a marker
        if (board.getBoard()[row][column].getValue() != 0) {
            console.log("Place your marker on another cell.")
            return;
        }
        console.log(`${getPlayer().playerName} is placing their marker at row: ${row}, column ${column}.`);
        board.placeMarker(row, column, getPlayer());
        board.printBoard();
        
        let winner = checkWinner(board.getBoard());
        if (winner) {
            console.log(`Player ${players.find(p => p.marker === winner).playerName} wins!`);
            restartGame();
            return;
        }

        // TODO: Check for a tie
        if (boardFull(board.getBoard())) {
            console.log(`Game ended with a tie!`)
            restartGame();
            return;
        }

        switchTurn();
    }

    return {
        getPlayer,
        playRound,
        restartGame,
        getBoard: () => board.getBoard(),
    }
}

let boardElement = document.getElementById('gameboard');
let restartBtn = document.getElementById('restart-btn');

function renderBoard(game) {
    boardElement.innerHTML = '';

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let newCell = document.createElement('div');
            newCell.classList.add('cell');
            newCell.dataset.row = i;
            newCell.dataset.column = j;
            newCell.textContent = game.getBoard()[i][j].getValue() === 0 ? '' : game.getBoard()[i][j].getValue();

            newCell.addEventListener('click', () => {
                game.playRound(i ,j);
                renderBoard(game);
            })

            boardElement.appendChild(newCell);
        }
    }

}

function Cell() {
    let value = 0;

    const addMarker = (player) => value = player;
    const getValue = () => value;

    return {
        addMarker,
        getValue,
    }
}

let game = GameController();
renderBoard(game);

restartBtn.addEventListener('click', () => {
    game.restartGame();
})