import React, { useState, useEffect } from "react";
import keys from "../API/keys";

const api = {
  key: keys.API_KEY,
  base: keys.BASE_URL,
};

const App = () => {
  const [query, setQuery] = useState("Itabashi,Tokyo");
  const [weather, setWeather] = useState({});

  const handleDateBuild = () => {
    let date = String(new Date());
    date = date.slice(3, 15);
    return date;
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setQuery("");
          setWeather(result);
        });
    }
  };
  useEffect(() => {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setQuery("");
        setWeather(result);
      });
  }, []);

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 18
            ? "App hot"
            : "App cold"
          : "App"
      }
    >
      <main>
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={handleSearch}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div className="container">
            <div className="location-container">
              <div className="location">
                {weather.name},{weather.sys.country}
              </div>
              <div className="date">{handleDateBuild(new Date())}</div>
            </div>
            <div className="weather-container">
              <div className="temperature">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          <div className="error">No results found</div>
        )}
      </main>
    </div>
  );
};

export default App;
