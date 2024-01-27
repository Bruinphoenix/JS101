function calculator() {
  //Import required objects and set internal variables
  const readline = require('readline-sync');
  const ALL_MESSAGES = require('./calc_messages.json');
  let runAgain = true;

  //defines the prompt method used to communicate with the user
  function prompt(message) {
    console.log(`=> ${message}`);
  }

  //defines the function used to check if an input number is valid
  function invalidNumber(number) {
    return number.trimStart() === '' || Number.isNaN(Number(number));
  }
  //______________________________________________________________

  //FUNCTION BODY
  //prompt user to decide the interface language
  prompt(ALL_MESSAGES.decideLanguage);
  let language = readline.question();

  //create an object storing the messages in the selected language
  const MESSAGES = ALL_MESSAGES[language];

  //welcome the user to the program
  prompt(MESSAGES.welcome);

  //promt the user for the first number they want to use
  while (runAgain) {
    prompt(MESSAGES.promt1);
    let number1 = readline.question();

    //ensure the entered number is valid
    while (invalidNumber(number1)) {
      prompt(MESSAGES.invalidNum);
      number1 = readline.question();
    }

    //promt the user for the first number they want to use
    prompt(MESSAGES.promt2);
    let number2 = readline.question();

    //ensure the entered number is valid
    while (invalidNumber(number2)) {
      prompt(MESSAGES.invalidNum);
      number2 = readline.question();
    }

    //promt the user for the operator they want to use;
    prompt(MESSAGES.promtOperator);
    let operation = readline.question();

    //ensure the entered operator is valid
    while (!['1', '2', '3', '4'].includes(operation)) {
      prompt(MESSAGES.invalidOperator);
      operation = readline.question();
    }

    //output the result of the users numbers and operator
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

    //output the result
    prompt(`The result is: ${output}`);

    //check if the use would like to run another calculation
    while (true) {
      prompt(MESSAGES.promtRunAgain);
      let runAgainResponse = readline.question();
      if (runAgainResponse === 'n') {
        runAgain = false;
        break;
      } else if (runAgainResponse === 'y') {
        break;
      }
    }

  }
  prompt(MESSAGES.goodbye);
}

calculator();