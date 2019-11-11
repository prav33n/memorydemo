import { setUpGameGrid, addEventListeners, getGameConfig, stopTimer } from './gameScript';
require('../styles/index.scss');

const difficultyConfig = {
    easy: 4,
    medium: 6,
    hard: 10,
};


/* This can also be rewriten as async function, fetch game config and setup needed listeners */
function setUpGame(n = 4) {
    getGameConfig(n).then((response) => {
        if(!response) {
            alert('No response from server');
            return;
        }
        document.getElementById('resetBoard').addEventListener('click', resetBoard);
        setUpGameGrid(5, response);
        addEventListeners(response);
        setUpDifficulty();    
    }, () => alert('Cant connect to config server \n Please start the server in a new terminal'));
}


const resetBoard = () => {
    stopTimer();
    document.getElementById("timer").innerHTML = '00:00';
    setUpGame();
}

const changeDifficulty = (e) => {
    const difficulty = e.target.getAttribute('data-id');
    const cards = difficultyConfig[difficulty];
    resetBoard();
    setUpGame(cards);
};

const setUpDifficulty = () => {
    const difficultyButtons = document.getElementsByClassName('difficultyButton');
    for(let i = 0; i< difficultyButtons.length; i++) {
        difficultyButtons[i].addEventListener('click', changeDifficulty);
    }
}

// Called for first setup of the game
setUpGame();