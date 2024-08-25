import React from "react";

function RegistrationPage() {
  return (
    <div>
      <h1>Registrarse</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Dirección de correo electrónico
          </label>
          <input type="email" className="form-control" id="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input type="password" className="form-control" id="password" />
        </div>
        <button type="submit" className="btn btn-primary">
          Registrarse
        </button>
      </form>
    </div>
  );
}

export default RegistrationPage;
