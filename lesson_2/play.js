let myVar = [1];

function myFunc(myVar) {
  myVar = [2];
}

myFunc(myVar);
console.log(myVar); // [1]
