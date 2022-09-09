import React from 'react';
import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import { getAll, create, deletePerson, update } from './services';
import './index.css';

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
      ? deletePerson(e.target.id).then(() =>
          getAll().then((data) => setPersons(data))
        )
      : setMessage([]);
  };

  return (
    <div className="flex sm:flex-col md:flex-row lg:flex-row">
      <div className="rounded-xl basis-2/4 flex flex-col justify-center m-10 bg-white bg-opacity-30 p-10 content-center h-max">
        <div className="flex justify-between pb-9 ">
          <h2 className="font-bold lg:text-4xl md:text-xl">Phonebook</h2>
          {message.length !== 0 ? (
            <Notification message={message[0]} status={message[1]} />
          ) : (
            ''
          )}
          <Filter
            filterQuery={filterQuery}
            handleFilterChange={handleFilterChange}
          />
        </div>
        <PersonForm
          handleFormSubmit={handleFormSubmit}
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
        />
      </div>
      <div className="flex basis-2/4 justify-center p-5 lg:px-5 xl:px-0">
        <Persons
          person={persons}
          query={filterQuery}
          onDelete={handleDeletePerson}
        />
      </div>
    </div>
  );
};

export default App;
