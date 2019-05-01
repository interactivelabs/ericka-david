import React from "react";

const App = () => (
  <div className="container">
    <div class="py-5 text-center">
      <h2>Invitados</h2>
      <p class="lead">Para Agregar y checar la lista de invitados</p>
    </div>
    <div className="row">
      <div className="col-md-4 order-md-2 mb-4">
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-muted">Invitados Totales:</span>
          <span className="badge badge-secondary badge-pill">3</span>
        </h4>
      </div>
      <div className="col-md-8 order-md-1">
        <h4 className="mb-3">Agregar Invitado</h4>
        <form className="needs-validation" noValidate>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="firstName">Nombre(s)</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="Nombre(s)"
                required
              />
              <div className="invalid-feedback">El nombre(s) es requerido</div>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="lastName">Apellido(s)</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Apellido(s)"
                required
              />
              <div className="invalid-feedback">
                El Apellido(s) es requerido
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="familyname">Pertenece a la familia:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">@</span>
              </div>
              <input
                type="text"
                className="form-control"
                id="familyname"
                placeholder="Nombre de familia"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="you@example.com"
            />
            <div className="invalid-feedback">
              Please enter a valid email address for shipping updates.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="1234 Main St"
              required
            />
            <div className="invalid-feedback">
              Please enter your shipping address.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="address2">
              Address 2 <span className="text-muted">(Optional)</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="address2"
              placeholder="Apartment or suite"
            />
          </div>
          <div className="row">
            <div className="col-md-3 mb-3">
              <label htmlFor="zip">Zip</label>
              <input
                type="text"
                className="form-control"
                id="zip"
                placeholder=""
                required
              />
              <div className="invalid-feedback">Zip code required.</div>
            </div>
            <div className="col-md-3 mb-3" />
            <div className="col-md-3 mb-3">
              <div>&nbsp;</div>
              <label className="form-check-label" htmlFor="confirmed">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="confirmed"
                />
                Confirmado
              </label>
            </div>
          </div>
          <hr className="mb-4" />
          <button className="btn btn-primary btn-lg btn-block" type="submit">
            Agregar Invitado
          </button>
        </form>
      </div>
    </div>
    <hr className="mb-4" />
    <div className="row">
      <h4 className="mb-3">Lista de Invitados</h4>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default App;
