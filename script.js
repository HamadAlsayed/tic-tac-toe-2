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

    board = Gameboard();
    let getBoard = board.getBoard();

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
        console.log("New game has been created.");
        board.printBoard();
    }

    const playRound = (row, column) => {
        if (board.getBoard()[row][column].getValue() != 0) {
            console.log("Place your marker on another cell.")
            return;
        }
        console.log(`${getPlayer().playerName} is placing their marker at row: ${row}, column ${column}.`);
        board.placeMarker(row, column, getPlayer());
        switchTurn();
        board.printBoard();
    }

    return {
        getPlayer,
        playRound,
        restartGame,
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