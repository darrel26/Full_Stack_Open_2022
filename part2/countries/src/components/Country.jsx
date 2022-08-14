import axios from "axios";
import React, { useEffect, useState } from "react";

const Country = ({ country }) => {
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country[0].latlng[0]}&lon=${country[0].latlng[1]}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) =>
        setWeatherData({
          icon: `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`,
          temp: res.data.main.temp - 273,
          wind: res.data.wind.speed,
        })
      );
  }, [country]);

  return (
    <>
      {country.map((country) => {
        return (
          <div key={country.ccna2 + country.ccna3}>
            <h2>{country.name.common}</h2>
            <div>
              capital {country.capital}
              <br />
              area {country.area}
            </div>
            <h4>languages:</h4>
            <ul>
              {Object.values(country.languages).map((language) => {
                return <li key={language}>{language}</li>;
              })}
            </ul>
            <img
              src={country.flags.png}
              alt={country.name.common + " flag"}
            ></img>
            <div>
              <h3>Weather in {country.capital}</h3>
              <p>temperature {Math.floor(weatherData.temp)} Celcius</p>
              <img src={weatherData.icon} alt={weatherData.temp} />
              <p>wind {weatherData.wind} m/s</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Country;
