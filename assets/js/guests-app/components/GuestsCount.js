import React from "react";
import { array } from "prop-types";

const GuestCount = ({ guests }) => (
  <div className="col-md-4 order-md-2 mb-4">
    <h4 className="d-flex justify-content-between align-items-center mb-3">
      <span className="text-muted">Invitados Totales:</span>
      <span className="badge badge-secondary badge-pill">{guests.length}</span>
    </h4>
  </div>
);

GuestCount.propTypes = {
  guests: array.isRequired
};

export default GuestCount;
