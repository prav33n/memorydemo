import { setUpGameGrid, addEventListeners, getGameConfig } from './gameScript';
require('../styles/index.scss');
const NUMBER_CARD_PAIRS = 6;
getGameConfig(NUMBER_CARD_PAIRS).then(response => {
    setUpGameGrid(5, response);
    addEventListeners(response);    
});
