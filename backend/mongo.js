const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.env.MONGODB_URI;

const url = password;

mongoose.connect(url, { createIndexes: true, useUnifiedTopology: true });

const Person = mongoose.model("Person", {
  name: String,
  number: String
});

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log("phonebook:");
    result.forEach(person => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
} else {
  const name = process.argv[3];
  const number = process.argv[4];
  const person = new Person({ name, number });
  person.save().then(response => {
    console.log(`${name} name ${number} number`);
    mongoose.connection.close();
  });
}
