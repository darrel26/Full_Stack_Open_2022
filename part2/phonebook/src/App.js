import React from 'react';
import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import { getAll, create, deletePerson, update } from './services';

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    getAll().then((data) => setPersons(data));
  }, []);

  const [filterQuery, setFilterQuery] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [message, setMessage] = useState([]);

  const handleFilterChange = (e) => {
    setFilterQuery(e.target.value);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const availability = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    const changedPerson = { ...availability, number: newNumber };

    availability === undefined
      ? create(newPerson)
          .then((data) => {
            setPersons([...persons, data]);
            setMessage([`Added ${newPerson.name}`, 'success']);
          })
          .catch((error) => setMessage([error.response.data.error, 'warning']))
      : window.confirm(
          `${availability.name} is already added to your phonebook, replace with a new one ?`
        )
      ? update(availability.id, changedPerson)
          .then((res) => res.data)
          .then(() =>
            setMessage([`Change ${newPerson.name} number`, 'success'])
          )
          .then(() => getAll().then((data) => setPersons(data)))
          .catch((error) => setMessage([error.response.data.error, 'warning']))
      : '';
  };

  const handleDeletePerson = (e) => {
    setMessage([
      `Information of ${e.target.value} has already been removed from server`,
      'warning',
    ]);
    window.confirm(`Delete ${e.target.value} ?`)
      ? deletePerson(e.target.parentElement.id).then(() =>
          getAll().then((data) => setPersons(data))
        )
      : setMessage([]);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {message.length !== 0 ? (
        <Notification message={message[0]} status={message[1]} />
      ) : (
        ''
      )}
      <Filter
        filterQuery={filterQuery}
        handleFilterChange={handleFilterChange}
      />
      <h2>Add a new</h2>
      <PersonForm
        handleFormSubmit={handleFormSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        person={persons}
        query={filterQuery}
        onDelete={handleDeletePerson}
      />
    </div>
  );
};

export default App;
