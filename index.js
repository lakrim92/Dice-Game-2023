/*logique du jeu. Tout d'abord, nous allons définir les variables dont nous avons besoin*/
let scores, roundScore, activePlayer, roll, gamePlaying;

/*Ensuite, nous allons créer une fonction init() qui initialise le jeu*/

/*Ces lignes de code sont utilisées pour réinitialiser une partie de jeu de dés.
La première ligne masque l'image du dé.
Les lignes suivantes réinitialisent les scores et les valeurs actuelles des deux joueurs (Player 1 et Player 2), ainsi que leurs noms.
Les quatre prochaines lignes enlèvent la classe "winner" et la classe "active" des deux joueurs.
Enfin, la dernière ligne ajoute la classe "active" au joueur 1, de sorte que le jeu commence avec ce joueur.*/
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


/*Ce code effectue les opérations suivantes :
1. Génère un nombre aléatoire entre 1 et 6 à l'aide de la méthode Math.random() et l'arrondit à l'entier inférieur à l'aide de la méthode Math.floor(). Le résultat est stocké dans la variable "dice".
2. Appelle une fonction nommée "init()". On ne peut pas déterminer les opérations exactes effectuées par cette fonction sans avoir accès à son code source.
3. Sélectionne un élément HTML avec la classe "dice" à l'aide de la méthode document.querySelector() et stocke-le dans la variable "diceDOM".
4. Ajoute un événement click à un élément HTML avec la classe "btn-roll" à l'aide de la méthode addEventListener(). Lorsque l'utilisateur clique sur cet élément, la fonction anonyme suivante est exécutée :*/
const dice = Math.floor(Math.random() * 6 + 1);

init();
const diceDOM = document.querySelector('.dice');

document.querySelector('.btn-roll').addEventListener('click', function () {


    /*Ce code simule un jeu de dés. Voici les différentes tâches ou opérations réalisées :
1.
Roll a random number : Le code génère un nombre aléatoire entre 1 et 6 inclus.
2.
Display the result : Le résultat du lancer de dé est affiché sur l'interface utilisateur à l'aide d'une image de dé.
3.
Update round score if 1 is thrown : Si le joueur obtient un 6 deux fois de suite, son score total est remis à 0 et c'est au tour du joueur suivant de jouer. Sinon, si le joueur obtient un nombre différent de 1, son score pour ce tour est incrémenté. Si le joueur obtient un 1, son tour est terminé et c'est au joueur suivant de jouer.
Le code vérifie également si le jeu est en cours en utilisant la variable gamePlaying. Si cette variable est vraie, le code exécute les opérations décrites ci-dessus. Si gamePlaying est faux, le code ne fait rien.*/
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
        console.log(gameScore);

    } //1. Roll a random number
});

/*Ce code ajoute un écouteur d'événement sur le bouton "Hold" de la page. Lorsque le bouton est cliqué, le code vérifie si le jeu est en cours (gamePlaying est true). Si le jeu est en cours, le score actuel du joueur actif est ajouté au score global et l'interface utilisateur est mise à jour pour afficher ce nouveau score global. Ensuite, le code vérifie si le score global du joueur actif est supérieur ou égal à 100. Si oui, le joueur actif est déclaré vainqueur et le jeu se termine. Si non, le jeu continue avec le joueur suivant. Si le jeu n'est pas en cours, le bouton "Hold" n'a pas d'effet.*/
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



//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//var x = document.querySelector('#score-0').textContent;*/