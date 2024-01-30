let rlSync = require('readline-sync');

function screamer() {
  console.log('What is your name?');
  let name = rlSync.question();
  if (name[(name.length - 1)] === '!') {
    console.log(`HELLO ${name.toUpperCase()}. WHY ARE WE SCREAMING?`)
  } else {
    console.log(`Hello ${name}.`)
  }
}

screamer();