function greetings(array, object) {
  console.log(`Hello, ${array.join(' ')}! Nice to have a ${object.title} ${object.occupation} around.`);
}


greetings(["John", "Q", "Doe"], { title: "Master", occupation: "Plumber" });