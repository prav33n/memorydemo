const baseUrl = "http://localhost:8111";
let timer = null;

function checkGameEndCondition() {
    const matchedCards = document.getElementsByClassName("matched");
    const totalCards = document.getElementsByClassName("gameCard");
    return (matchedCards.length === totalCards.length);
}

/* Remove the event listener when the transition ends */
function transitionHandling(e) {
    const card = e.target;
    card.classList.remove('click');
    card.removeEventListener('transitionend', transitionHandling);
    const gameEnded = checkGameEndCondition();
    if(gameEnded) {
        // HACK: Force alert to trigger in the next frame render 
        setTimeout(() => alert(`Congrats! You matched all the cards \n Your Time : ${document.getElementById("timer").innerHTML}`), 0);
    }
};


function startTimer() {
    timer = setInterval(countuptimer,1000);
};


/* Handles logic to reveal the image hidden in the cards and matching them */
function handleCardClick(e) {
    if(!timer) {
        startTimer();   
    }
    const card = e.target;
    const activeCards = document.getElementsByClassName("active");
    if(activeCards.length >= 2) {
        activeCards[0].classList.remove('active');
        activeCards[0].classList.remove('active');
    }
    card.classList.add('active');
    card.classList.add('click');
    card.addEventListener('transitionend', transitionHandling, false);
    if(activeCards.length == 2){
        const card1 = activeCards[0];
        const card2 = activeCards[1];
        if(card1.getAttribute('data-id') === card2.getAttribute('data-id')) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            card1.removeEventListener('click', handleCardClick);
            card2.removeEventListener('click', handleCardClick);
        }
    }
    const gameEnded = checkGameEndCondition();
    if(gameEnded) {
        stopTimer();
    }
};


function countuptimer() { //TIMER FUNCTION TO CALCULATE THE TOTAL GAME TIME. 
	var time = document.getElementById("timer").innerHTML.split(":");
	var  mins = parseInt(time[0]);
	var seconds = parseInt(time[1]);
	if(seconds >= 60){
		mins++;
		seconds = 0;
		}
	else 
		seconds++;
	if(seconds < 10 && mins < 10)
	document.getElementById("timer").innerHTML = "0"+mins+":0"+seconds;
	else if(mins < 10)
	document.getElementById("timer").innerHTML = "0"+mins+":"+seconds;
	else 
	document.getElementById("timer").innerHTML = mins+":"+seconds;
}


export const stopTimer = () => {
    clearInterval(timer);
    timer = null;
};

/* Fetch the game config from server async*/
export const getGameConfig = async (n = 6) => {
    const response = await fetch(`${baseUrl}/getGameConfig/${n}`, { mode: 'cors' });
    const myJson = await response.json();
    return myJson;  
};  

/* Creates the memory cards from the game config passed to the function */
export const setUpGameGrid = (n = 5, gameConfig = []) => {
    const config  = [...gameConfig, ...gameConfig ];
    config.sort(() => Math.random() - 0.5);
    const gameContainer = document.getElementById("gameContent");
    let gameCards = [];
    for(let i=0; i < config.length ; i++) {
        gameCards.push(`
            <div class= "gameCard" data-id=${config[i].name} style="width:${100/n}%; height:${100/n}%;">
                <img class="gameCardContent" style="width:100%; height:100%;"
                    src="${config[i].url}.svg" 
                </img>
            </div>`
        );
    }
    gameContainer.innerHTML = gameCards.join(' ');
};

/* Adds eventListner for the memory cards */
export const addEventListeners = () => {
    const gameCards = document.getElementsByClassName("gameCard");
    for(let i=0; i < gameCards.length; i++) {
        gameCards[i].addEventListener('click', handleCardClick);
    }
};