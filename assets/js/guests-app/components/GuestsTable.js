import React from "react";
import { array } from "prop-types";

const GestsTable = ({ guests, deleteGuest }) => (
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
            <th scope="col">Invitados</th>
            <th scope="col">Niños</th>
            <th scope="col" className="text-center">
              Confirmado
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {guests.map(guest => (
            <tr key={guest.guestid}>
              <td>{guest.firstname}</td>
              <td>{guest.lastname}</td>
              <td>{guest.familyname}</td>
              <td>{guest.guests}</td>
              <td>{guest.kids}</td>
              <td className="text-center">
                <input type="checkbox" readOnly checked={guest.confirmed} />
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => deleteGuest(guest.guestid)}
                >
                  <i className="fal fa-trash" />
                </button>
              </td>
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
