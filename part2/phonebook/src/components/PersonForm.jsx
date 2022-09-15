import React from 'react';
import '../index.css';

const PersonForm = ({
  handleFormSubmit,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={handleFormSubmit} className="grid gap-7">
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Name :{' '}
        </label>
        <input
          id="name"
          value={newName}
          onChange={handleNameChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div>
        <label
          htmlFor="number"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Number :{' '}
        </label>
        <input
          id="number"
          value={newNumber}
          onChange={handleNumberChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-max sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        ADD
      </button>
    </form>
  );
};

export default PersonForm;
