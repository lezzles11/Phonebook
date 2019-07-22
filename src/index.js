import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Filter from './components/Filter'
import Person from './components/Person'
import Footer from './components/Footer'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import axios from 'axios'
import './components/styles/styles.css'
import PersonService from './components/services/persons'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const del = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
    PersonService
      .del(person.id)
      .then(returned =>
        setPersons(persons.filter(p => p.id !== person.id)))
      .then(() => {
        setMessage(`Deleted ${person.name} from phonebook!`)
      })
        .catch(error => {
          setMessage(`Information of ${person.name} has already been removed from server`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }}
    
  const update = (id, personObject) =>
  PersonService
    .update(id, personObject)
    .then(returnedPerson => 
      setPersons(persons.map(person => person.id !== id 
        ? person
        : returnedPerson)))
    .then(() => 
      console.log('Replaced!')
      )
    .then(() => {
      setMessage(`Updated ${personObject.name}'s number!`)
    })
    .catch(error => {
      setMessage('removed')
      setTimeout(() => {
        setMessage(null)
      }, 5000) 
    })

  const addPerson = event => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber 
      //id: persons.length + 1
    };
    const found = persons.find(person => person.name === newName)
    if (found !== undefined) {
        if (window.confirm(`${newName}'s is already added to phonebook, replace with a new one?`)) {
          update(found.id, personObject)
        }
    } else {
      setPersons(persons.concat(personObject));
      PersonService
      .create(personObject)
      .then(response => {
        console.log(response) })
      .then(() => {
        setMessage(`Added ${personObject.name}`)
      })
    }
    setNewName("");
    setNewNumber("")
  };
  const filterChangeHandler = event => {
    console.log(event.target.value);
    setNewFilter(event.target.value);
  };
  const nameChangeHandler = event => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const numberChangeHandler = event => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const Rows = () =>
  persons
      .filter(person =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
      )
      .map(person => <Person 
      key={person.id}
      person={person} 
      onClick={() => del(person)}
      />);
  return (
    <div>
     <h1> Phonebook </h1>
     <Notification message={message} />
     <Filter newFilter={newFilter} filterChangeHandler={filterChangeHandler}/>
      <h1> Add a New Contact </h1>
      <PersonForm 
      addPerson={addPerson} 
      newName={newName} 
      nameChangeHandler={nameChangeHandler}
      newNumber={newNumber}
      numberChangeHandler={numberChangeHandler} />
      <h1>Numbers </h1>
      <div>{Rows()}</div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);