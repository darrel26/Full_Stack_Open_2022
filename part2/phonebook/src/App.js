import React from 'react';
import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import { getAll, create, deletePerson, update } from './services';
import Swal from 'sweetalert2';
import './index.css';

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
    };

    const availability = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    const changedPerson = { ...availability, number: newNumber };

    availability === undefined
      ? Swal.fire({
          title: 'Are you sure?',
          icon: 'question',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'Cancel',
        })
          .then((result) => {
            if (result.isConfirmed) {
              create(newPerson).then((data) => {
                setPersons([...persons, data]);
                Swal.fire(`Added ${newPerson.name}`, '', 'success');
              });
            } else {
              Swal.fire(' Cancelled', '', 'error');
            }
          })
          .catch((error) =>
            Swal.fire(`${error.response.data.error}`, '', 'error')
          )
      : Swal.fire({
          title: `${availability.name} is already added to your phonebook, replace with a new one ?`,
          icon: 'warning',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'Cancel',
        })
          .then((result) => {
            if (result.isConfirmed) {
              update(availability.id, changedPerson)
                .then((res) => res.data)
                .then(() => {
                  Swal.fire(
                    `Success change ${availability.name} contact number`,
                    '',
                    'success'
                  );
                })
                .then(() => getAll().then((data) => setPersons(data)));
            } else {
              Swal.fire(' Cancelled', '', 'error');
            }
          })
          .catch((error) =>
            Swal.fire(`${error.response.data.error}`, '', 'error')
          );
  };
  const handleDeletePerson = (e) => {
    Swal.fire({
      title: `Are you sure you want to delete ${e.target.value} ?`,
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        deletePerson(e.target.id).then(() => {
          getAll().then((data) => setPersons(data));
        });
        Swal.fire(`${e.target.value} Deleted`, '', 'success');
      } else {
        Swal.fire(' Cancelled', '', 'error');
      }
    });
  };

  return (
    <div className="flex sm:flex-col md:flex-row lg:flex-row">
      <div className="rounded-xl basis-2/4 flex flex-col justify-center m-10 bg-white bg-opacity-30 p-10 content-center h-max">
        <div className="flex justify-between pb-9 ">
          <h2 className="font-bold lg:text-4xl md:text-xl">Phonebook</h2>
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
