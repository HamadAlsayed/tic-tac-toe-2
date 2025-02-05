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

    const resetBoard = () => {
        
    }

    return {
        getBoard,
        placeMarker,
        resetBoard,
    }

}