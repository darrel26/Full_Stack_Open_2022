import React from "react";

const CountryList = ({ country, onShow }) => {
  return (
    <>
      {country.map((country) => {
        return (
          <div key={country.cca2 + country.cca3}>
            <p>
              {country.name.common}{" "}
              <button onClick={onShow} value={country.name.common}>
                show
              </button>
            </p>
          </div>
        );
      })}
    </>
  );
};

export default CountryList;
