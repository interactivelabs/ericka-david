import React, { createContext, useState, useEffect } from "react";
import { oneOfType, arrayOf, node } from "prop-types";

const GuestsContext = createContext();
const { Provider, Consumer } = GuestsContext;

const GuestsProvider = ({ children }) => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(false);
  const addGuests = values =>
    fetch("/api/guests", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values) // body data type must match "Content-Type" header
    })
      .then(res => res.json())
      .then(data => setGuests([...guests, data]));
  useEffect(() => {
    setLoading(true);
    fetch("/api/guests")
      .then(res => res.json())
      .then(data => {
        setGuests(data);
        setLoading(false);
      });
  }, []);
  return <Provider value={{ guests, loading, addGuests }}>{children}</Provider>;
};

GuestsProvider.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired
};

export { GuestsProvider, Consumer as GithubConsumer, GuestsContext };
