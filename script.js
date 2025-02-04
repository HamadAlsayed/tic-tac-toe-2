function Gameboard() {
    const board = [];
    const rows = 3;
    const columns = 3;

    // Populate board with arrays to turn it into a 2D array
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push('cell');
        }
    }
    
    

    return {
        

    }
}

function playerFactory(playerOneName = 'Player One', playerTwoName = 'Player Two') {

}

function gameController() {

}

let game = Gameboard();