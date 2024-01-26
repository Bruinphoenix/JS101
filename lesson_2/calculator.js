



function calculator() {
  const readline = require('readline-sync');
  const ALL_MESSAGES = require('./calc_messages.json');
  //__________________________________________________________
  //INTERNAL FUNCTION DEFINITIONS
  //defines the prompt method used to communicate with the user
  function prompt(message) {
    console.log(`=> ${message}`);
  }

  //defines the function used to check if an input number is valid
  function invalidNumber(number) {
    return number.trimStart() === '' || Number.isNaN(Number(number));
  }
  //________________________________________________________________________________

  //FUNCTION BODY
  prompt(ALL_MESSAGES.decideLanguage);
  let language = readline.question();
  const MESSAGES = jsonObj[language];

  prompt(MESSAGES.welcome);
  let runAgain = true;

  while (runAgain) {
    prompt(MESSAGES.promt1);
    let number1 = readline.question();

    while (invalidNumber(number1)) {
      prompt(MESSAGES.invalidNum);
      number1 = readline.question();
    }

    prompt(MESSAGES.promt2);
    let number2 = readline.question();

    while (invalidNumber(number2)) {
      prompt(MESSAGES.invalidNum);
      number2 = readline.question();
    }

    prompt(MESSAGES.promtOperator);
    let operation = readline.question();

    while (!['1', '2', '3', '4'].includes(operation)) {
      prompt(MESSAGES.invalidOperator)
      operation = readline.question();
    }

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

    prompt(`The result is: ${output}`);

    //check if the use would like to run another calculation 
    while (true) {
      prompt(MESSAGES.promtRunAgain);
      let runAgainResponse = readline.question();
      if (runAgainResponse === 'n') {
        runAgain = false;
        break;
      }
      else if (runAgainResponse === 'y') {
        break;
      }
    }

  }
  prompt(MESSAGES.goodbye);
}

calculator();