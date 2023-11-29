let score = 0;
let currentNumber = getRandomNumber();
let targetNumber = getRandomNumber(); // Initial target number
let isWaitingForNextRound = false;

function getRandomNumber() {
    return Math.floor(Math.random() * 1000) + 1; // Generate a random number between 1 and 10
}

function updateResultText() {
    const resultElement = document.getElementById('result');
    resultElement.textContent = `Is the number higher or lower than ${targetNumber}?`;
}

function checkGuess(guess) {
    if (isWaitingForNextRound) {
        return; // Do nothing if waiting for the next round
    }

    const newNumber = getRandomNumber();
    const resultElement = document.getElementById('result');
    const scoreElement = document.getElementById('score');
    const higherButton = document.getElementById('higher');
    const lowerButton = document.getElementById('lower');

    if ((guess === 'higher' && newNumber > targetNumber) || (guess === 'lower' && newNumber < targetNumber)) {
        resultElement.textContent = `✅ Correct! The number was ${newNumber}.`;
        score++;
        isWaitingForNextRound = true;

        // Update the score display
        scoreElement.textContent = score;

        setTimeout(() => {
            // Reset the text and enable buttons after a delay
            targetNumber = getRandomNumber(); // Generate a new random target number
            updateResultText();
            isWaitingForNextRound = false;
            higherButton.disabled = false;
            lowerButton.disabled = false;
        }, 1500); // 1500 milliseconds (1.5 seconds)

        // Disable buttons during the cooldown
        higherButton.disabled = true;
        lowerButton.disabled = true;
    } else {
        resultElement.textContent = `❌ Incorrect! The number was ${newNumber}.`;
        score = 0; // Reset score if the guess is incorrect

        // Update the score display
        scoreElement.textContent = score;

        setTimeout(() => {
            // Start a new game after a delay
            startNewGame();
        }, 1500); // 1500 milliseconds (1.5 seconds)
    }
}

function startNewGame() {
    // Start a new game by generating a new random number and resetting the score
    currentNumber = getRandomNumber();
    targetNumber = getRandomNumber(); // Generate a new random target number
    score = 0;
    isWaitingForNextRound = false;
    updateResultText();
    document.getElementById('score').textContent = '0';

    // Enable buttons for the new game
    document.getElementById('higher').disabled = false;
    document.getElementById('lower').disabled = false;
}

// Initialize the initial result text
updateResultText();