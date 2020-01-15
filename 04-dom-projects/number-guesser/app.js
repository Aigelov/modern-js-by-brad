/**
GAME FUNCTION
 - Player must guess a number between a min and a max
 - Player gets a certain amount of guesses
 - Notify player of guesses remaining
 - Notify the player of the correct answer if lose
 - Let player choose to play again
 */

// Game values
let min = 1;
let max = 10;
let winningNum = getRandomNum(min, max);
let guessesLeft = 3;

// UI Elements
const gameWrapperUI = document.querySelector('#game');
const minNumUI = document.querySelector('.min-num');
const maxNumUI = document.querySelector('.max-num');
const guessBtnUI = document.querySelector('#guess-btn');
const guessInputUI = document.querySelector('#guess-input');
const messageUI = document.querySelector('.message');

// Assign UI min and max
minNumUI.textContent = min;
maxNumUI.textContent = max;

// Play Again event listener
gameWrapperUI.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('play-again')) {
    window.location.reload();
  }
});

// Listen for guess
guessBtnUI.addEventListener('click', (event) => {
  event.preventDefault();
  let guess = parseInt(guessInputUI.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    return;
  }

  // Check if won
  if (guess === winningNum) {
    // Game over - won
    gameOver(true, `${winningNum} is correct! YOU WIN!`);
  } else {
    // Wrong number
    guessesLeft -= 1;
    // Check if guesses left
    if (guessesLeft === 0) {
      // Game over - lost
      gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`)
    } else {
      // Game continues - answer wrong
      // Change border color
      guessInputUI.style.borderColor = 'red';
      // Clear input
      guessInputUI.value = '';
      // Set message
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
    }
  }
});

// Game Over
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';
  // Disable input
  guessInputUI.disabled = true;
  // Change border color
  guessInputUI.style.borderColor = color;
  // Set message
  setMessage(msg, color);

  // Play Again?
  guessBtnUI.value = 'Play Again';
  guessBtnUI.classList.remove('play-again');
  guessBtnUI.classList.add('play-again');
}

// Get winning num
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set message
function setMessage(msg, color) {
  messageUI.style.color = color;
  messageUI.textContent = msg;
}