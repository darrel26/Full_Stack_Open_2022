import React from 'react';
import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import { getAll, create, deletePerson, update } from './services';

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    getAll().then((data) => setPersons(data));
  }, []);

  const [filterQuery, setFilterQuery] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

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
      id: Math.floor(Math.random() * 1000),
    };

    const availability = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    const changedPerson = { ...availability, number: newNumber };

    availability === undefined
      ? create(newPerson).then((data) => setPersons([...persons, data]))
      : window.confirm(
          `${availability.name} is already added to your phonebook, replace with a new one ?`
        )
      ? update(availability.id, changedPerson)
          .then((res) => res.data)
          .then(() => getAll().then((data) => setPersons(data)))
      : '';
  };

  const handleDeletePerson = (e) => {
    window.confirm(`Delete ${e.target.value} ?`)
      ? deletePerson(e.target.parentElement.id).then(() =>
          getAll().then((data) => setPersons(data))
        )
      : '';
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
