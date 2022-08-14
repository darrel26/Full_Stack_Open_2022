import React from "react";

const Search = ({ searchQuery, handleSearchQueryChanges }) => {
  return (
    <div>
      find countries{" "}
      <input value={searchQuery} onChange={handleSearchQueryChanges}></input>
    </div>
  );
};

export default Search;
