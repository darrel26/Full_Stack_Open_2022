import React from 'react';
import '../index.css';

const Persons = ({ person, query, onDelete }) => {
  const phoneBook = [...person];

  const filteredPhoneBook = phoneBook.filter((person) => {
    return person.name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="w-full mr-10">
      {filteredPhoneBook.map((person) => {
        return (
          <div
            key={person.id}
            id={person.id}
            className="rounded-xl shadow-lg my-6 px-6 bg-white h-max p-5"
          >
            <div className="flex basis-3/4 items-center">
              <img
                className="lg:h-24 md:h-12 rounded-full sm:mx-0 sm:shrink-0 "
                src={`https://picsum.photos/seed/${person.id}/64`}
                alt="Contact Image"
              />
              <div className="flex flex-col basis-3/4 lg:px-6 md: px-4">
                <div className="lg:text-2xl md:text-md text-black font-semibold pb-2">
                  {person.name}
                </div>
                <div className="text-slate-500 lg:text-xl md:text-sm font-mediumn">
                  {person.number}
                </div>
              </div>
              <div className="flex basis-1/4 justify-end">
                <button
                  className="rounded-xl flex border border-red-600 text-red-600 font-bold hover:bg-red-500 hover:text-white lg:h-11 md:h-8 lg:px-4 md:px-2 items-center justify-center"
                  onClick={onDelete}
                  value={person.name}
                  id={person.id}
                >
                  X
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Persons;
