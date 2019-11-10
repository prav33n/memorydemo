import { setUpGameGrid, addEventListeners, getGameConfig, stopTimer } from './gameScript';
require('../styles/index.scss');
const NUMBER_CARD_PAIRS = 6;
getGameConfig(NUMBER_CARD_PAIRS).then(response => {
    setUpGameGrid(5, response);
    addEventListeners(response);    
});

const resetBoard = () => {
    stopTimer();
    document.getElementById("timer").innerHTML = '00:00';
    getGameConfig(NUMBER_CARD_PAIRS).then(response => {
        setUpGameGrid(5, response);
        addEventListeners(response);    
    });
}

document.getElementById('resetBoard').addEventListener('click', resetBoard);