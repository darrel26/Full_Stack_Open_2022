import Search from "./components/Search";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country";
import CountryList from "./components/CountryList";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  const handleSearchQueryChanges = (e) => {
    setSearchQuery(e.target.value);
  };

  const countriesList = [...countries];

  const filteredCountries = countriesList.filter((country) => {
    return country.name.common
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  const handleClickShow = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <Search
        searchQuery={searchQuery}
        handleSearchQueryChanges={handleSearchQueryChanges}
      />
      <div>
        {filteredCountries.length === 1 ? (
          <Country country={filteredCountries} />
        ) : filteredCountries.length < 10 ? (
          <CountryList country={filteredCountries} onShow={handleClickShow} />
        ) : (
          <p>Too many matches, please specify another filter</p>
        )}
      </div>
    </div>
  );
}

export default App;
