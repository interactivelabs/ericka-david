import React from "react";
import { func } from "prop-types";
const AddGuestButton = ({ openForm }) => (
  <div className="col-md-8 order-md-1">
    <h4 className="mb-3">Registrar Invitado</h4>
    <button
      className="btn btn-primary btn-lg btn-block"
      type="button"
      onClick={openForm}
    >
      Registrar Invitado
    </button>
  </div>
);

AddGuestButton.propTypes = {
  openForm: func.isRequired
};

export default AddGuestButton;
