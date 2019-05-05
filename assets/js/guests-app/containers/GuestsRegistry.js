import React, { useContext } from "react";
import { GuestsContext } from "./GuestsContext";
import NewGuest from "../components/NewGuest";
import GuestsTable from "../components/GuestsTable";

const GuestsRegistry = () => {
  const { guests, addGuests } = useContext(GuestsContext);
  return (
    <div className="container">
      <div className="py-5 text-center">
        <h2>Invitados</h2>
        <p className="lead">Para Agregar y checar la lista de invitados</p>
      </div>
      <div className="row">
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Invitados Totales:</span>
            <span className="badge badge-secondary badge-pill">
              {guests.length}
            </span>
          </h4>
        </div>
        <NewGuest handleSubmit={addGuests} />
      </div>
      <GuestsTable guests={guests} />
    </div>
  );
};

export default GuestsRegistry;
