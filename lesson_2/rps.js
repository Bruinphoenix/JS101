const readline = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
const VALID_YESNO = ['y', 'n'];
const WIN_COMBOS = {
  rock: ['scissors', 'lizard',],
  paper: ['rock', 'spock',],
  scissors: ['paper', 'lizard',],
  lizard: ['spock', 'paper',],
  spock: ['scissors', 'rock',]
};
const MESS = require('./rps_messages.json');

let userWins = 0;
let computerWins = 0;

function prompt(message) {
  console.log(`=> ${message}`);
}

function choiceShortToLong(choice) {
  //convert choice shorthand to the full string
  switch (choice) {
    case 'r':
      choice = 'rock';
      break;
    case 'p':
      choice = 'paper';
      break;
    case 'sc':
      choice = 'scissors';
      break;
    case 'l':
      choice = 'lizard';
      break;
    case 'sp':
      choice = 'spock';
      break;
  }
  return choice;
}

function didUserWin(userChoice, computerChoice) {
  if (WIN_COMBOS[userChoice].includes(computerChoice)) {
    return true;
  }
  return false;
}

function displayWinner(userChoice) {
  //make a random selection for the computers choice
  const randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  const computerChoice = VALID_CHOICES[randomIndex];

  prompt(`You chose ${userChoice}, computer chose ${computerChoice}`);

  if (didUserWin(userChoice, computerChoice)) {
    prompt(MESS.userWin);
    return 'user';
  } else if (userChoice === computerChoice) {
    prompt(MESS.tie);
    return undefined;
  } else {
    prompt(MESS.compWin);
    return 'computer';
  }
}

function getValidInput(initialPrompt, errorPrompt, VALID_RESPONSES) {
  /*
    Retreives an imput string from the user and ensures that is valid.
    @param {string} initialPrompt - the string output to the user to
    prompt them to give the desired input
    @param {string} errorPrompt - the string output to the user if their
    initial input attempt is invalid.
    @param {array} VALID_RESPONSES - an array containing strings of all
    valid responses.
    @returns {string} - the verified string given by the user.
  */

  prompt(initialPrompt);
  let input = readline.question();

  //if the user imput shorthand, convert to full string
  input = choiceShortToLong(input);

  //check validity of langauge input and repromt if nessisary
  while (!VALID_RESPONSES.includes(input)) {
    prompt(errorPrompt);
    input = readline.question();
    input = choiceShortToLong(input);
  }
  return input;
}

function playRPS() {
  prompt(MESS.welcome);

  while (true) {
    let userChoice = getValidInput(MESS.promptValidInputs,
      MESS.invalidInput, VALID_CHOICES);

    //determine the winner and update the win tally acordingly.
    let winner = displayWinner(userChoice);
    if (winner === 'user') userWins++;
    if (winner === 'computer') computerWins++;

    //check if either player has reached 5 wins to become grand winner
    if (userWins >= 5) {
      prompt(MESS.userGrandWin);
      break;
    } else if (computerWins >= 5) {
      prompt(MESS.compGrandWin);
      break;
    }

    //promt the user to see if they wish to play again
    let playAgain = getValidInput(MESS.promptPlayAgain,
      MESS.invalidPlayAgain, VALID_YESNO);

    if (playAgain !== 'y') break;
  }
}

playRPS();