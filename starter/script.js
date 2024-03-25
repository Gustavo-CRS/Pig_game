'use strict';

//variables
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1'); // faster way to select by an id
const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
let current = document.getElementById(`current--${activePlayer}`);

//game logic
function start() {
  playing = true;
  currentScore = 0;
  scores = [0, 0];
  score0.textContent = 0;
  score1.textContent = 0;
  current.textContent = 0;
  dice.classList.add('hidden');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  if (activePlayer === 1) {
    switchPlayer();
  }
}

function rollDice() {
  if (playing) {
    const diceResult = Math.trunc(Math.random() * 6) + 1;
    displayDice(diceResult);
    if (diceResult !== 1) {
      currentScore += diceResult;
      current.textContent = currentScore;
    } else {
      currentScore = 0;
      current.textContent = 0;
      switchPlayer();
    }
  }
}

function displayDice(result) {
  dice.classList.remove('hidden');
  dice.src = `dice-${result}.png`;
}

function hold() {
  if (playing) {
    scores[activePlayer] += currentScore;
    currentScore = 0;
    current.textContent = 0;
    if (activePlayer === 0) {
      score0.textContent = scores[activePlayer];
    } else {
      score1.textContent = scores[activePlayer];
    }
    checkWinner();
  }
}

function switchPlayer() {
  activePlayer = activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  current = document.getElementById(`current--${activePlayer}`);
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

function checkWinner() {
  if (scores[activePlayer] >= 100) {
    playing = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    dice.classList.add('hidden');
  } else {
    switchPlayer();
  }
}

// setup buttons and start conditions
start();

btnRoll.addEventListener('click', rollDice);
btnNew.addEventListener('click', start);
btnHold.addEventListener('click', hold);
