import React from "react";

const Persons = ({ person, query }) => {
  const phoneBook = [...person];

  const filteredPhoneBook = phoneBook.filter((person) => {
    return person.name.toLowerCase().includes(query.toLowerCase());
  });
  return (
    <div>
      {filteredPhoneBook.map((person) => {
        return (
          <div key={person.id}>
            {person.name} {person.number}
          </div>
        );
      })}
    </div>
  );
};

export default Persons;
