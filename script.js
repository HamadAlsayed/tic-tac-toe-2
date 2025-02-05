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
            board[i].push('cell');
        }
    }
    const getBoard = () => board;

    const placeMarker = () => {
        // Check if, at the chosen index, there is already a marker
        // If at the chosen index a marker is preset, return nothing and print a warning
        // Else change the marker at index from 0 to the coresponding player's marker
    }

    // Reset the board elements to defualt values
    const resetBoard = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                board[i] = 'cell';
            }
        }
    }

    return {
        getBoard,
        placeMarker,
        resetBoard,
    }

}

function GameController
(
    playerOneName = 'Player One',
    playerTwoName = 'Player Two'
) {

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
    const switchTurn = () => currentPlayer == players[0] ? players[1] : players[0];

    // Return currentPlayer value
    const getPlayer = () => currentPlayer;

    return {
        switchTurn,
        getPlayer,
    }
}