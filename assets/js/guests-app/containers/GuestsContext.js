import React, { createContext, useState, useEffect } from "react";
import { oneOfType, arrayOf, node } from "prop-types";

const GuestsContext = createContext();
const { Provider, Consumer } = GuestsContext;

const GuestsProvider = ({ children }) => {
  const [guests, setGuests] = useState([]);
  const addGuests = values =>
    fetch("/api/guests", {
      mode: "cors",
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    })
      .then(res => res.json())
      .then(data => setGuests([...guests, data]));
  const getGuests = () =>
    fetch("/api/guests")
      .then(res => res.json())
      .then(data => setGuests(data));
  useEffect(() => {
    getGuests();
  }, []);
  return <Provider value={{ guests, addGuests }}>{children}</Provider>;
};

GuestsProvider.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired
};

export { GuestsProvider, Consumer as GithubConsumer, GuestsContext };
