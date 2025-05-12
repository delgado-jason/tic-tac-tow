

//  PLAYER FUNCTION  //

function player(name, token) {

    name;
    token;

    const getName = () => name;
    const getToken = () => token;

    return { getName, getToken };

}

//  BOARD FUNCTION  //

const board = (function(){
    
    // Set the cells
    const cells = 9;

    let gameboard = [];

    // Create the gameboard
    for (let i = 0; i < cells; i++) {
        gameboard.push(i + 1);
    }

    const getGameboard = () => gameboard;

    const updateGameboard = (id, token) => { 
        const index = gameboard.indexOf(id);
        gameboard[index] = token;
    }

    return {getGameboard, updateGameboard};
})()

// Variable for the form button before start of game
const formBtn = document.getElementById('formBtn');

// Event Listener for form button

formBtn.addEventListener('click', e => {
    e.preventDefault();
    startGame(e);
})

//  START GAME FUNCTION //

function startGame(e) {
    // Set win to false
    let win = false;

    // Get player names
    const p1Name = e.target.form[0].value;
    const p2Name = e.target.form[1].value;

    // Generate a random token for player 1
    const p1Token = generateToken();

    // Create player 1
    const player1 = player(p1Name, p1Token);

    // Get the token for player 2
    let p2Token;
    if (player1.getToken() === 'X') {
        p2Token = 'O';
    } else {
        p2Token = 'X';
    }

    // Create player 2
    const player2 = player(p2Name, p2Token);
    
    //  GAME FUNCTION    //

    const game = (() => {

        const display = displayController();

        // Hide the form
        display.hideForm();

        let playerTurn;

        // If player token equals 'x' that player goes first
        if (player1.getToken() === 'X') {

            // Display the current player name 
            display.startMessage(player1.getName());

            // Set player turn to player 1
            playerTurn = 'p1';

        } else {
            display.startMessage(player2.getName());

            // Set player turn to player 2
            playerTurn = 'p2';
        }
        
        // Display gameboard
        display.gameboardToggleHidden();


        const boardDiv = document.getElementById('board');

        // Start game loop
        while (win === false) {

            // Add event listener for gameboard
            boardDiv.addEventListener('click', e => {
                // Get the id of the cell
                let id = parseInt(e.target.id);

                // Check who's turn it is
                if (playerTurn === 'p1') {
                    
                    // Check to see if cell is occupied
                    if (e.target.innerText === '') {

                        // Mark the cell with player token
                        e.target.innerText = player1.getToken();

                        // Update gameboard
                        board.updateGameboard(id, player1.getToken());

                        // Check for a win
                        win = checkWin(player1.getToken());
                        if (win === true) {

                            display.winMessage(player1.getName());

                            // Hide gameboard
                            display.gameboardToggleHidden();

                            // Show play again button
                            display.playAgainToggleHidden();
                        } else {

                            // Switch turns
                            playerTurn = changeTurn(playerTurn);

                            // Display current player message
                            display.standardMessage(player2.getName());

                        }

                    }
                    
                } else {
                    // Check to see if cell is occupied
                    if (e.target.innerText === '') {

                        // Mark the cell with player token
                        e.target.innerText = player2.getToken();

                        // Update gameboard
                        board.updateGameboard(id, player2.getToken());

                        // Check for a win
                        win = checkWin(player2.getToken())
                        if (win === true) {

                            display.winMessage(player2.getName());

                            // Hide gameboard
                            display.gameboardToggleHidden();

                            // Show play again button
                            display.playAgainToggleHidden();
                        } else {

                            // Switch turns
                            playerTurn = changeTurn(playerTurn);

                            // Display current player message
                            display.standardMessage(player1.getName());

                        }

                    }
                }
            }); //<--- end of event listener

            win = true;

        } //<--- end of while loop

        const playAgainBtn = document.getElementById('playAgain');
        playAgainBtn.addEventListener('click', e => {
            location.reload();
        })

    })()

}

//  DISPLAY CONTROLLER FUNCTION //

function displayController() {

    const boardDiv = document.getElementById('board');
    const nameForm = document.getElementById('nameForm');
    const messageDiv = document.getElementById('message');
    const playAgainBtn = document.getElementById('playAgain');
    

    const hideGameboard = () => {
        boardDiv.classList.add('hidden');
    }

    const gameboardToggleHidden = () => {
        boardDiv.classList.toggle('hidden');
    }

    const hideForm = () => {
        nameForm.classList.add('hidden');
    }

    const formToggleHidden = () => {
        nameForm.classList.toggle('hidden');
    }

    const startMessage = (name) => {
        // Create the message
        messageDiv.innerText = `${name}, you go first. You are X.`;
    }

    const standardMessage = (name) => {
        messageDiv.innerText = `${name}, it's now your turn.`;
    }

    const winMessage = (name) => {
        messageDiv.classList.add('win-message');
        messageDiv.innerText = `${name}, congratulation. You win!!`;
    }

    const playAgainToggleHidden = () => playAgainBtn.classList.toggle('hidden');

    return {
        hideGameboard, 
        gameboardToggleHidden, 
        hideForm, 
        formToggleHidden, 
        startMessage,
        standardMessage,
        winMessage,
        playAgainToggleHidden
    };
}
//  GENERATE TOKEN FUNCTION //

function generateToken() {
    const randNum = Math.floor(Math.random() * 2);

    if (randNum === 0) {
        let playerToken = 'X';
        return playerToken;
    } else {
        let playerToken = 'O';
        return playerToken;
    }
}

//  CHECK WIN FUNCTION  //
function checkWin(token) {

    let win;

    if (board.getGameboard()[0] === token && board.getGameboard()[1] === token && board.getGameboard()[2] === token) {
        win = true;
    } else if (board.getGameboard()[3] === token && board.getGameboard()[4] === token && board.getGameboard()[5] === token) {
        win = true;
    } else if (board.getGameboard()[6] === token && board.getGameboard()[7] === token && board.getGameboard()[8] === token) {
        win = true;
    } else if (board.getGameboard()[0] === token && board.getGameboard()[3] === token && board.getGameboard()[6] === token) {
        win = true;
    } else if (board.getGameboard()[1] === token && board.getGameboard()[4] === token && board.getGameboard()[7] === token) {
        win = true;
    } else if (board.getGameboard()[2] === token && board.getGameboard()[5] === token && board.getGameboard()[8] === token) {
        win = true;
    } else if (board.getGameboard()[0] === token && board.getGameboard()[4] === token && board.getGameboard()[8] === token) {
        win = true;
    } else if (board.getGameboard()[2] === token && board.getGameboard()[4] === token && board.getGameboard()[6] === token) {
        win = true;
    } else {
        win = false;
    }

    return win;
}

// CHANGE TURN FUNCTION //
 function changeTurn(currentTurn) {
    let turn;
    if (currentTurn === 'p1') {
        turn = 'p2';
    } else {
        turn = 'p1';
    }

    return turn;
 }