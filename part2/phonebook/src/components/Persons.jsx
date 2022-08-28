import React from 'react';

const Persons = ({ person, query, onDelete }) => {
  const phoneBook = [...person];

  const filteredPhoneBook = phoneBook.filter((person) => {
    return person.name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div>
      {filteredPhoneBook.map((person) => {
        return (
          <div key={person.id} id={person.id}>
            {person.name} {person.number}
            <button onClick={onDelete} value={person.name}>
              delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Persons;
