import React from "react";
import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 }
  ]);
  const [filterQuery, setFilterQuery] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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
    setPersons([
      ...persons,
      {
        name: newName,
        number: newNumber,
        id: +new Date()
      }
    ]);
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
      <Persons person={persons} query={filterQuery} />
    </div>
  );
};

export default App;
