let rlSync = require('readline-sync');

function arithmeticInt() {
  console.log('Enter the first number: ');
  let firstNum = rlSync.question();

  console.log('Enter the second number: ');
  let secondNum = rlSync.question();

  firstNum = Number(firstNum);
  secondNum = Number(secondNum);

  console.log(`${firstNum} + ${secondNum} = ${firstNum + secondNum}`);
  console.log(`${firstNum} - ${secondNum} = ${firstNum - secondNum}`);
  console.log(`${firstNum} * ${secondNum} = ${firstNum * secondNum}`);
  console.log(`${firstNum} / ${secondNum} = ${(firstNum / secondNum).toFixed(2)}`);
  console.log(`${firstNum} % ${secondNum} = ${firstNum % secondNum}`);
  console.log(`${firstNum} ** ${secondNum} = ${(firstNum ** secondNum).toFixed(2)}`);
}

arithmeticInt();