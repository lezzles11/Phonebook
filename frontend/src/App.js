import React, { useState, useEffect } from "react";
import personService from "./components/services/persons";
import Filter from "./components/Filter";
import Persons from "./components/Rows";

const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null;
  }

  const style = {
    color: notification.type === "error" ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  return <div style={style}>{notification.message}</div>;
};

const PersonForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        Name: <input onChange={props.handleNameChange} value={props.newName} />
      </div>
      <div>
        Number:{" "}
        <input onChange={props.handleNumberChange} value={props.newNumber} />
      </div>

      <button className="btn" type="submit">
        Add Contact
      </button>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({
    message: null
  });

  useEffect(() => {
    personService.getAll().then(data => {
      setPersons(data);
    });
  }, []);

  const handleNameChange = event => setNewName(event.target.value);
  const handleNumberChange = event => setNewNumber(event.target.value);
  const handleFilterChange = event => setFilter(event.target.value);

  const notify = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: null }), 10000);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const existingPerson = persons.find(p => p.name === newName);

    if (existingPerson) {
      const ok = window.confirm(`Replace ${newName}?`);

      if (ok) {
        personService
          .replace({
            ...existingPerson,
            number: newNumber
          })
          .then(replacedPerson => {
            setPersons(
              persons.map(p => (p.name === newName ? replacedPerson : p))
            );
            setNewName("");
            setNewNumber("");
            notify(`Replaced ${newName}!`);
          });
        /*
          .catch(() => {
            setPersons(persons.filter(p => p.name !== newName))
            notify(`Henkilön ${newName} oli jo poistettu`, 'error')
          })
          */
      }

      return;
    }

    personService
      .create({
        name: newName,
        number: newNumber
      })
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson));
        setNewName("");
        setNewNumber("");
        notify(`Deleted ${createdPerson.name}`);
      });
  };

  const deletePerson = id => {
    const person = persons.find(p => p.id === id);
    const ok = window.confirm(`Deleted ${person.name}!`);
    if (ok) {
      personService.remove(id).then(() => {
        setPersons(persons.filter(p => p.id !== id));
      });
      notify(`Deleted ${person.name}`);
    }
  };

  const personsToShow =
    filter.length === 0
      ? persons
      : persons.filter(p =>
          p.name.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <div className="container font4">
      <h2>Phonebook</h2>

      <Notification notification={notification} />

      <Filter handleChange={handleFilterChange} value={filter} />
      <br />
      <h3>Add a Contact</h3>

      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
      />
      <br />
      <h3>Numbers</h3>

      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
