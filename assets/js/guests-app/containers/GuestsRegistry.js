import React, { useContext } from "react";
import { GuestsContext } from "./GuestsContext";
import Hero from "../components/Hero";
import NewGuest from "../components/NewGuest";
import GuestsCount from "../components/GuestsCount";
import GuestsTable from "../components/GuestsTable";

const GuestsRegistry = () => {
  const { guests, addGuests } = useContext(GuestsContext);
  return (
    <div className="container">
      <Hero />
      <div className="row">
        <GuestsCount guests={guests} />
        <NewGuest handleSubmit={addGuests} />
      </div>
      <GuestsTable guests={guests} />
    </div>
  );
};

export default GuestsRegistry;
