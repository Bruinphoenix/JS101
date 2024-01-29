//Import required objects and set internal variables
const readline = require('readline-sync');
const ALL_MESSAGES = require('./calc_messages.json');
const VALID_LANGUAGE = ['en', 'fr'];
const VALID_OPERATORS = ['1', '2', '3', '4',];
let runAgain = true;

//defines the prompt method used to communicate with the user
function prompt(message) {
  console.log(`=> ${message}`);
}

//defines the function used to check if an input number is valid
function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

function getValidNumber(initialPrompt, errorPrompt) {
  prompt(initialPrompt);
  let inputNumber = readline.question();

  //ensure the entered number is valid
  while (invalidNumber(inputNumber)) {
    prompt(errorPrompt);
    inputNumber = readline.question();
  }
  return inputNumber;
}

function getValidInput(initialPrompt, errorPrompt, VALID_RESPONSES) {
  prompt(initialPrompt);
  let input = readline.question();

  //check validity of langauge input and repromt if nessisary
  while (!VALID_RESPONSES.includes(input)) {
    prompt(errorPrompt);
    input = readline.question();
  }
  return input;
}

function computeOperation(number1, number2, operation) {
  let output;
  switch (operation) {
    case '1':
      output = Number(number1) + Number(number2);
      break;
    case '2':
      output = Number(number1) - Number(number2);
      break;
    case '3':
      output = Number(number1) * Number(number2);
      break;
    case '4':
      output = Number(number1) / Number(number2);
      break;
  }
  return output;
}

function calculator() {

  let language = getValidInput(ALL_MESSAGES.decideLanguage,
    ALL_MESSAGES.incorrectLanguage,
    VALID_LANGUAGE);
  const MESSAGES = ALL_MESSAGES[language];

  prompt(MESSAGES.welcome);

  //promt the user for the numbers and operators they wish to use
  while (runAgain) {
    let number1 = getValidNumber(MESSAGES.prompt1, MESSAGES.invalidNum);
    let number2 = getValidNumber(MESSAGES.prompt2, MESSAGES.invalidNum);
    let operation = getValidInput(MESSAGES.promptOperator,
      MESSAGES.invalidOperator,
      VALID_OPERATORS,);

    let output = computeOperation(number1, number2, operation);

    prompt(`The result is: ${output}`);

    let runAgainResponse = getValidInput(MESSAGES.promptRunAgain,
      MESSAGES.incorrectRunAgain,
      ['y', 'n'],);

    if (runAgainResponse === 'n') {
      runAgain = false;
    }

  }
  prompt(MESSAGES.goodbye);
}
calculator();