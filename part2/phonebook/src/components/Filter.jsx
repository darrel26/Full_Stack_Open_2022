import React from 'react';

const Filter = ({ filterQuery, handleFilterChange }) => {
  return (
    <div className="flex justify-end">
      <input
        value={filterQuery}
        onChange={handleFilterChange}
        placeholder="Search"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block lg:w-full md:w-3/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
};

export default Filter;
