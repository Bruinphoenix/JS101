const readline = require('readline-sync');
const MESSAGES = require('./mortgage_messages.json');
const VALID_RESPONSES = ['y', 'n'];

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number, allowFloats) {
  if (number < 0) return true;
  if (allowFloats) {
    return number.trimStart() === '' || Number.isNaN(Number(number));
  } else {
    return number.trimStart() === '' || !Number.isInteger(Number(number));
  }
}

function getValidNumber(initialPrompt, errorPrompt, allowFloats) {
  /*
    Retreives a number from the user and ensures that is valid.
    @param {string} initialPrompt - the string output to the user to
    prompt them to give the desired input
    @param {string} errorPrompt - the string output to the user if their
    initial input attempt is invalid.
    @param {boolean} allowFloats - if this is true, the function will allow
    the user to input float values, if not, only integers will be accepted.
    @returns {number} the verified number given by the user
  */

  prompt(initialPrompt);
  let inputNumber = readline.question();

  //ensure the entered number is valid
  while (invalidNumber(inputNumber, allowFloats)) {
    prompt(errorPrompt);
    inputNumber = readline.question();
  }
  return inputNumber;
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

  //check validity of langauge input and repromt if nessisary
  while (!VALID_RESPONSES.includes(input)) {
    prompt(errorPrompt);
    input = readline.question();
  }
  return input;
}


function calculatePayment(totalLoan, APR, durationMonths) {
  /*
    Calculates the monthly payment on a given fixed rate mortgage.
    @param {number} TotalLoan - the total loan principle.
    @param {number} APR - the annual percentage rate of the loan,
    in number form. ie 17% would be given as 17.
    @param {number} durationMonths - the duration of the loan, in months
    @returns {number} A number representing the monthly payment.
  */

  //convert the APR to decimal notation and find the monthly rate.
  const DECIMAL_APR = APR / 100;
  const MONTHLY_RATE = DECIMAL_APR / 12;

  let monthlyPayment = totalLoan * (MONTHLY_RATE /
    (1 - Math.pow((1 + MONTHLY_RATE), (-durationMonths))));
  console.log(monthlyPayment);
  monthlyPayment = monthlyPayment.toFixed(2);
  return monthlyPayment;
}


function calcUserInterface() {
  /*
    Implements a simple terminal accesible user interface for the
    calculatePayment function.
    @param- none
    @returns- none
  */

  prompt(MESSAGES.welcome);

  while (true) {
    let totalMonths = getValidNumber(MESSAGES.promptMonths,
      MESSAGES.incorrectMonths, false);
    let totalPrinciple = getValidNumber(MESSAGES.promptLoanTotal,
      MESSAGES.incorrectLoanTotal, true);
    let APR = getValidNumber(MESSAGES.promptAPR, MESSAGES.incorrectAPR, true);

    const MONTHLY_PAYMENT = calculatePayment(totalPrinciple, APR, totalMonths);
    prompt(`Your monthly payment will be $${MONTHLY_PAYMENT}.`);

    let runAgainResponse = getValidInput(MESSAGES.promptRunAgain,
      MESSAGES.incorrectRunAgain, VALID_RESPONSES);
    if (runAgainResponse === 'n') break;
  }

  prompt(MESSAGES.goodbye);
}


calcUserInterface();
