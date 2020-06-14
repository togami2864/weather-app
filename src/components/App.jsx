import React, { useState } from "react";
import keys from "../API/keys";

const api = {
  key: keys.API_KEY,
  base: keys.BASE_URL,
};

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
};
