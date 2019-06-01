import React, { createContext, useState, useEffect } from "react";
import { oneOfType, arrayOf, node } from "prop-types";

const GuestsContext = createContext();
const { Provider, Consumer } = GuestsContext;

const headers = {
  mode: "cors",
  method: "POST",
  cache: "no-cache",
  credentials: "same-origin",
  headers: { "Content-Type": "application/json" }
};

const GuestsProvider = ({ children }) => {
  const [guests, setGuests] = useState([]);
  const addGuests = values =>
    fetch("/api/guests", {
      ...headers,
      body: JSON.stringify(values)
    })
      .then(res => res.json())
      .then(data => setGuests([...guests, data]));
  const deleteGuest = guestid =>
    fetch(`/api/guests/${guestid}`, {
      ...headers,
      method: "DELETE"
    })
      .then(res => res.json())
      .then(() => setGuests(guests.filter(g => g.guestid !== guestid)));
  const getGuests = () =>
    fetch("/api/guests")
      .then(res => res.json())
      .then(data => setGuests(data));
  const sendCampaign = () =>
    fetch("/api/campaign/send")
      .then(res => res.json())
      .then(data => console.log(data));
  useEffect(() => {
    getGuests();
  }, []);
  return (
    <Provider
      value={{ guests, addGuests, getGuests, deleteGuest, sendCampaign }}
    >
      {children}
    </Provider>
  );
};

GuestsProvider.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired
};

export { GuestsProvider, Consumer as GithubConsumer, GuestsContext };
