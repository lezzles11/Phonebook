const mongoose = require("mongoose");

require("dotenv").config();
const uri = process.env.MONGODB_URI;

mongoose.createConnection(
  "mongodb+srv://lezzles:orangeorange@react-ebtnd.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true
  }
);

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
