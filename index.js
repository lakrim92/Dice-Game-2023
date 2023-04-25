let scores, roundScore, activePlayer, roll, gamePlaying;

/*Game initialization*/

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

const dice = Math.floor(Math.random() * 6 + 1);

init();
const diceDOM = document.querySelector('.dice');

document.querySelector('.btn-roll').addEventListener('click', function () {

    //1. Roll a random number
    if (gamePlaying) {

        const dice = Math.floor(Math.random() * 6 + 1);

        //2. Display the result
        document.querySelector('.dice').style.display = 'flex';
        diceDOM.src = 'images/dice-' + dice + '.png';

        //3. Update round score if 1 is thrown
        if (dice == 6 && gameScore == 6) {
            scores[activePlayer] = 0;
            document.querySelector('#current-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        } else if (dice !== 1) {
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore
        } else {
            
            //Next Player
            nextPlayer();
        }
        gameScore = dice;
        

    } //1. Roll a random number
});
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});


function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);
