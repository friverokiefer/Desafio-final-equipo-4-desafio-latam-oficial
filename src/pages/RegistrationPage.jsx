// src/pages/RegistrationPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegistrationPage() {
  const [username, setUsername] = useState(""); // Cambiar a username
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/register", { // Asegúrate de que la URL esté correcta
        username,
        email,
        password,
        direccion,
        telefono,
      });
      
      alert("Registro exitoso");
      navigate("/login");
    } catch (error) {
      console.error("Error al registrarse:", error);
      setErrorMessage("Hubo un problema con el registro. Inténtalo nuevamente.");
    }
  };

  return (
    <div>
      <h1>Registrarse</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Nombre de Usuario</label> {/* Cambiar a username */}
          <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required /> {/* Cambiar a username */}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Dirección de correo electrónico</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">Dirección</label>
          <input type="text" className="form-control" id="direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">Teléfono</label>
          <input type="text" className="form-control" id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
        </div>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <button type="submit" className="btn btn-primary">Registrarse</button>
      </form>
    </div>
  );
}

export default RegistrationPage;
