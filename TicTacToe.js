window.addEventListener('DOMContentLoaded', () => { 
    const cells = Array.from(document.querySelectorAll('.cell'));                 
    const playersTurnDisplay = document.querySelector('.display-player');
    const resetBtn = document.querySelector('.resetButton');
    const announcer = document.querySelector('.announcer');

    // Created an array with 9 empty strings
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameOn = true;

    const playerXWon = 'playerXWon';
    const playerOWon = 'playerOWon';
    const tie = 'tie';

    // Index cells in game board
    // [0] [1] [2]
    // [3] [4] [5]
    // [6] [7] [8]

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // This function will validate if we have a winner or not
    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <=7; i++) {
            const winConditions = winningConditions[i];
            const a = gameBoard[winConditions[0]];
            const b = gameBoard[winConditions[1]];
            const c = gameBoard[winConditions[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b == c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            announce(currentPlayer === 'X' ? playerXWon : playerOWon);
            isGameOn = false;
            return;
        }

        if (!gameBoard.includes(''))
        announce(tie);
    }

    const announce = (type) => {
        switch(type) {
            case playerOWon:
                announcer.innerHTML = 'Player <span class"playerO">O</span> Won!!!';
                break;
            case playerXWon:
                announcer.innerHTML = 'Player <span class"playerX">X</span> Won!!!';
                break;
            case tie:
                announcer.innerHTML = 'Tie!';
        }

        announcer.classList.remove('hide');
    };

    // Checks if cell has a value already 
    const isValidAction = (cell) => {
        if (cell.innerText === 'X' || cell.innerText === 'O') {
            return false;
        }

        return true;
    };

    const updateGameBoard = (index) => {
        gameBoard[index] = currentPlayer;
    }

    const resetBoard = () => {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        isGameOn = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            switchPlayer();
        }

        cells.forEach(cell => {
            cell.innerText = '';
            cell.classList.remove('playerX');
            cell.classList.remove('playerO');
        });
    }

    // This function will notify whose turn it is and uses the ternary operator 
    const switchPlayer = () => {
        playersTurnDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playersTurnDisplay.innerText = currentPlayer;
        playersTurnDisplay.classList.add(`player${currentPlayer}`);
    }

    // This function runs when each player clicks on the cell representing whose turn it is
    const userAction = (cell, index) => {
        if(isValidAction(cell) && isGameOn) {
            cell.innerText = currentPlayer;
            cell.classList.add(`player${currentPlayer}`);
            updateGameBoard(index);
            handleResultValidation();
            switchPlayer();
        }
    }

    // Event listener will fire a function for every single cell that is clicked on
    cells.forEach( (cell, index) => {
        cell.addEventListener('click', () => userAction(cell, index));
    });

    resetBtn.addEventListener('click', resetBoard);
});
