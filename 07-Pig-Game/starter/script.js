'use strict';
// {} []
// Elements
const totalScoreElP0 = document.getElementById(`score--0`); //change
const totalScoreElP1 = document.getElementById(`score--1`); //change
const diceImage = document.querySelector('.dice');
const rollDiceBtn = document.querySelector('.btn--roll');

// Initials
diceImage.classList.add('hidden');
totalScoreElP0.textContent = 0;
totalScoreElP1.textContent = 0;
let currentScore = 0;
let activePlayer = 0;
let totalScore = [0, 0];
let gameEnd = false;

//functions
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 1 ? 0 : 1;
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
};
//---------------Gaame Logic-----------------
// Roll Dice Button
rollDiceBtn.addEventListener('click', function () {
  // Creating dice
  if (!gameEnd) {
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    diceImage.src = `dice-${diceNum}.png`;
    if (diceImage.classList.contains('hidden')) {
      diceImage.classList.remove('hidden');
    }

    // current Score
    if (diceNum !== 1) {
      currentScore += diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //change
    } else {
      //switch Player
      switchPlayer();
    }
  }
});

// {} []
// Hold Button
document.querySelector('.btn--hold').addEventListener('click', function () {
  // Add Total Score
  if (!gameEnd) {
    totalScore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScore[activePlayer]; // Change
    if (totalScore[activePlayer] >= 20) {
      // Game End
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      gameEnd = true;
    } else {
      //switch Player
      switchPlayer();
    }
  }
});

// {} []
// New Game Button
document.querySelector('.btn--new').addEventListener('click', function () {
  // diceImage.classList.add('hidden');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  totalScoreElP0.textContent = 0;
  totalScoreElP1.textContent = 0;
  currentScore = 0;
  activePlayer = 0;
  totalScore = [0, 0];
  gameEnd = false;
});
