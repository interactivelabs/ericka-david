import React from "react";
import { func } from "prop-types";
import { Form, Text } from "informed";

const NewGuest = ({ handleSubmit }) => (
  <div className="col-md-8 order-md-1">
    <h4 className="mb-3">Agregar Invitado</h4>
    <Form
      onSubmit={values => {
        handleSubmit(values);
        console.log(values);
      }}
    >
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="firstname">Nombre(s)</label>
          <Text
            required
            id="firstname"
            field="firstname"
            type="text"
            className="form-control"
            placeholder="Nombre(s)"
          />
          <div className="invalid-feedback">El nombre(s) es requerido</div>
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="lastname">Apellido(s)</label>
          <Text
            required
            id="lastname"
            field="lastname"
            type="text"
            className="form-control"
            placeholder="Apellido(s)"
          />
          <div className="invalid-feedback">El Apellido(s) es requerido</div>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="familyname">Pertenece a la familia:</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">@</span>
          </div>
          <Text
            required
            id="familyname"
            field="familyname"
            type="text"
            className="form-control"
            placeholder="Nombre de familia"
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="email">Email</label>
        <Text
          id="email"
          field="email"
          type="email"
          className="form-control"
          placeholder="you@example.com"
        />
        <div className="invalid-feedback">
          Please enter a valid email address for shipping updates.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="phone">Telefono (Cel)</label>
        <Text
          id="phone"
          field="phone"
          type="tel"
          className="form-control"
          placeholder="411-533-2525"
        />
        <div className="invalid-feedback">
          Please enter a valid email address for shipping updates.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="address">Address</label>
        <Text
          id="address"
          field="address"
          type="text"
          className="form-control"
          placeholder="1234 Main St"
        />
        <div className="invalid-feedback">
          Please enter your shipping address.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="address2">
          Address 2 <span className="text-muted">(opcional)</span>
        </label>
        <Text
          id="address2"
          field="address2"
          type="text"
          className="form-control"
          placeholder="Apartmento"
        />
      </div>
      <div className="row">
        <div className="col-md-3 mb-3">
          <label htmlFor="zip">Codigo Postal</label>
          <Text
            id="zip"
            field="zip"
            type="text"
            className="form-control"
            placeholder="91111"
          />
          <div className="invalid-feedback">Zip code required.</div>
        </div>
        <div className="col-md-3 mb-3" />
        <div className="col-md-3 mb-3">
          <div>&nbsp;</div>
          <label className="form-check-label" htmlFor="confirmed">
            <Text type="checkbox" className="form-check-input" id="confirmed" />
            Confirmado
          </label>
        </div>
      </div>
      <hr className="mb-4" />
      <button className="btn btn-primary btn-lg btn-block" type="submit">
        Agregar Invitado
      </button>
    </Form>
  </div>
);

NewGuest.proptypes = {
  handleSubmit: func.isRequired
};

export default NewGuest;
