import React, { useContext, useState } from "react";
import { GuestsContext } from "./GuestsContext";
import Hero from "../components/Hero";
import NewGuest from "../components/NewGuest";
import GuestsCount from "../components/GuestsCount";
import GuestsTable from "../components/GuestsTable";
import AddGuestButton from "../components/AddGuestButton";

const GuestsRegistry = () => {
  const [formOpenned, setFormOppened] = useState(false);
  const { guests, addGuests, deleteGuest, sendCampaign } = useContext(
    GuestsContext
  );
  const handleSubmit = values => {
    addGuests(values);
    setFormOppened(false);
  };
  const openForm = () => setFormOppened(true);
  return (
    <div className="container">
      <Hero />
      <div className="row">
        <GuestsCount guests={guests} sendCampaign={sendCampaign} />
        {formOpenned ? (
          <NewGuest handleSubmit={handleSubmit} />
        ) : (
          <AddGuestButton openForm={openForm} />
        )}
      </div>
      <GuestsTable guests={guests} deleteGuest={deleteGuest} />
    </div>
  );
};

export default GuestsRegistry;
