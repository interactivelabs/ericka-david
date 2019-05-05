import React from "react";
import { array } from "prop-types";

const GestsTable = ({ guests }) => (
  <div>
    <hr className="mb-4" />
    <div className="row">
      <h4 className="mb-3">Lista de Invitados</h4>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Apellidos</th>
            <th scope="col">Familia</th>
            <th scope="col">Confirmado</th>
          </tr>
        </thead>
        <tbody>
          {guests.map(guest => (
            <tr>
              <td>{guest.firstname}</td>
              <td>{guest.lastname}</td>
              <td>{guest.familyname}</td>
              <td>{guest.confirmed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

GestsTable.proptypes = {
  guests: array.isRequired
};

export default GestsTable;
