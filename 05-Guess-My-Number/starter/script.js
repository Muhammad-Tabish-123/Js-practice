'use strict';

// console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent = 'Correct Number!';
// document.querySelector('.number').textContent = 20;
// document.querySelector('.guess').value = 10;
// document.querySelector('.score').textContent = 0;

const scoreLeft = function (value) {
  if (value === 20) score = 20;
  document.querySelector('.score').textContent = value;
};
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};
const displaySecretNumber = function (secrtNumber) {
  document.querySelector('.number').textContent = secrtNumber;
};
const setHighScore = function () {
  if (score > currentHighScore) currentHighScore = score;
  document.querySelector('.highscore').textContent = currentHighScore;
};
const bodyColor = function (color) {
  document.querySelector('body').style.backgroundColor = color;
};
const changeBoxWidth = function (width) {
  document.querySelector('.number').style.width = width;
};
const createSecretNumber = function () {
  // return Math.trunc(Math.random() * 20 + 1);
  secrteNumber = Math.trunc(Math.random() * 20 + 1);
};

// const secrteNumber = createSecretNumber();
let secrteNumber;
createSecretNumber();
// document.querySelector('.number').textContent = secrteNumber;
// displaySecretNumber(secrteNumber);

let currentHighScore = 0;
let score = Number(document.querySelector('.score').textContent);

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  if (!guess) {
    // document.querySelector('.message').textContent = '⛔️ No number!';
    displayMessage('⛔️ No number!');
  } else if (guess === secrteNumber) {
    // document.querySelector('.message').textContent = '🎉 Correct Number!';
    displayMessage('🎉 Correct Number!');
    // document.querySelector('.number').textContent = secrteNumber;
    displaySecretNumber(secrteNumber);
    setHighScore();
    bodyColor('#60b347');
    changeBoxWidth('30rem');
  } else if (guess !== secrteNumber) {
    if (score > 1) {
      // document.querySelector('.message').textContent = guess > number ? '📈 Too high!' : '📉 Too Low!';
      displayMessage(guess > secrteNumber ? '📈 Too high!' : '📉 Too Low!');
      score--;
      // document.querySelector('.score').textContent = score;
      scoreLeft(score);

      // else if (guess > number) {
      //   document.querySelector('.message').textContent = '📈 Too high!';
      //   score--;
      //   document.querySelector('.score').textContent = score;
      // } else if (guess < number) {
      //   document.querySelector('.message').textContent = '📉 Too Low!';
      //   score--;
      //   document.querySelector('.score').textContent = score;
      // }
    } else {
      document.querySelector('.message').textContent = '💥 You lost the game!';
      // document.querySelector('.score').textContent = 0;
      scoreLeft(0);
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  bodyColor('');
  changeBoxWidth('15rem');
  displayMessage('Start guessing...');
  createSecretNumber();
  displaySecretNumber('?');
  // displaySecretNumber(secrteNumber);
  scoreLeft(20);
  document.querySelector('.guess').value = '';
  // location.reload();
});
