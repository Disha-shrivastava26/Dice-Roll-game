'use strict';

//Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// we need to declare variable before initizle them
let currentScore, activePlayer, playing, score;

//funct when we {reload} or {newGame}
const init = function () {
  //starting conditions

  diceEl.classList.add('hidden');

  score = [0, 0]; // an array to store the total score for each player

  currentScore = 0;
  activePlayer = 0; // this variable will decide which player is currentplayer
  playing = true; // this will enable the action of buttons
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};

//when we reload
init();

//first function switch the player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  // what if player0 is active we toggle the player-active
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//event 1 when i clicked on the dice roll the dice get visible with random(1-6)
// every time we click the button
// the total should be calculated

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1 generate a random
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.display the dice and show the random number
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; // here the randome will show

    //3. we check the condition we rolled dice is 1 then

    if (dice != 1) {
      currentScore += dice;
      // we want the dynamically active player holds the currentscore
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

// adding the functionality on the hold button
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add the current score to active player Score

    score[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    // 2. if the score of active player is 100
    if (score[activePlayer] >= 10) {
      //finish the game
      playing = false;
      diceEl.classList.add(`hidden`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      switchPlayer();
    }
  }
});

// now add the functionality to the new game button
//1. all the score will be back to zero
//2. automatically activeplayer will the first player
//3.dice display will be none
//4. playing boolean will be true now again

btnNew.addEventListener('click', init);
