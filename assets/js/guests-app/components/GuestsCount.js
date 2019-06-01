import React from "react";
import { array, func } from "prop-types";

const getTotalGuests = guests =>
  guests.reduce((agg, g) => agg + g.guests + 1, 0);
const getKids = guests => guests.reduce((agg, g) => agg + g.kids, 0);
const getConfirmedGuests = guests =>
  guests.reduce((agg, g) => (g.confirmed ? agg + g.guests + 1 : agg), 0);

const GuestCount = ({ guests, sendCampaign }) => (
  <div className="col-md-4 order-md-2 mb-4">
    <h4 className="d-flex justify-content-between align-items-center mb-3">
      <span className="text-muted">Invitados Totales:</span>
      <span className="badge badge-secondary badge-pill">
        {getTotalGuests(guests)}
      </span>
    </h4>
    <h4 className="d-flex justify-content-between align-items-center mb-3">
      <span className="text-muted">Niños:</span>
      <span className="badge badge-secondary badge-pill">
        {getKids(guests)}
      </span>
    </h4>
    <button
      className="btn btn-primary btn-lg btn-block"
      type="button"
      onClick={sendCampaign}
    >
      Enviar Correos
    </button>
    <hr />
    <h4 className="d-flex justify-content-between align-items-center mb-3">
      <span className="text-muted">Invitados Confirmados:</span>
      <span className="badge badge-secondary badge-pill">
        {getConfirmedGuests(guests)}
      </span>
    </h4>
  </div>
);

GuestCount.propTypes = {
  guests: array.isRequired,
  sendCampaign: func.isRequired
};

export default GuestCount;
