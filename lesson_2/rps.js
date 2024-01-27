const readline = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

let userWins = 0;
let computerWins = 0;

function prompt(message) {
  console.log(`=> ${message}`);
}

function didUserWin(choice, computerChoice) {
  if ((choice === 'rock' && computerChoice === 'scissors') ||
    (choice === 'paper' && computerChoice === 'rock') ||
    (choice === 'scissors' && computerChoice === 'paper') ||
    (choice === 'rock' && computerChoice === 'lizard') ||
    (choice === 'lizard' && computerChoice === 'spock') ||
    (choice === 'spock' && computerChoice === 'scissors') ||
    (choice === 'scissors' && computerChoice === 'lizard') ||
    (choice === 'lizard' && computerChoice === 'paper') ||
    (choice === 'paper' && computerChoice === 'spock') ||
    (choice === 'spock' && computerChoice === 'rock')) {
    return true;
  }
  else {
    return false;
  }
}

function displayWinner(choice, computerChoice) {
  prompt(`You chose ${choice}, computer chose ${computerChoice}`);

  if (didUserWin(choice, computerChoice)) {
    prompt('You win!');
    return 'user';
  } else if (choice === computerChoice) {
    prompt("It's a tie!");
    return undefined;
  } else {
    prompt("The computer wins!");
    return 'computer';
  }
}

//promt the user for their choice
while (true) {
  prompt(`Choose one: ${VALID_CHOICES.join(', ')}`);
  let choice = readline.question();

  //ensure that the users choice is valid
  while (!VALID_CHOICES.includes(choice)) {
    prompt("That's not a valid choice");
    choice = readline.question();
  }

  //compute a random choice for the computer
  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];

  //determine the winner and update the win tally acordingly.
  let winner = displayWinner(choice, computerChoice);
  if (winner === 'user') userWins++;
  if (winner === 'computer') computerWins++;

  //check if either player has reached 5 wins to become grand winner
  if (userWins >= 5) {
    prompt('You are the grand winner! Congratulations!');
    break;
  } else if (computerWins >= 5) {
    prompt('The computer is the grand winner! Better luck next time.');
    break;
  }

  //promt the user to see if they wish to play again
  prompt('Do you want to play again (y/n)?');
  let answer = readline.question().toLowerCase();
  while (answer[0] !== 'n' && answer[0] !== 'y') {
    prompt('Please enter "y" or "n".');
    answer = readline.question().toLowerCase();
  }

  if (answer[0] !== 'y') break;
}