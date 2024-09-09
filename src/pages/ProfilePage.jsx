import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function ProfilePage() {
  const { user } = useContext(AuthContext);  // user debería tener un id

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    direccion: "",
    telefono: "",
    imageUrl: "",
  });

  // Este useEffect se ejecuta cuando user existe y tiene un id
  useEffect(() => {
    if (user && user.id) {
      axios.get(`/api/users/${user.id}`)
        .then(response => {
          setProfile(response.data);  // Aquí debes obtener los datos correctos
        })
        .catch(error => {
          console.error("Error al obtener los datos del perfil:", error);
        });
    }
  }, [user]);

  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleSaveProfile = async () => {
    try {
      await axios.patch(`/api/users/${user.id}`, profile);
      setEditMode(false);
      alert("Perfil actualizado con éxito.");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Mi Perfil</h1>
      <div className="row">
        <div className="col-md-6">
          <h3>Bienvenido, {profile.username}</h3>
          <img
            src={profile.imageUrl || "/uploads/default.png"}
            alt="Perfil"
            className="img-thumbnail mb-3"
            style={{ maxWidth: "200px" }}
          />
          <h4>Email: {profile.email}</h4>
          <h4>Dirección: {profile.direccion}</h4>
          <h4>Teléfono: {profile.telefono}</h4>
        </div>
      </div>

      <div className="mt-4">
        {!editMode ? (
          <button className="btn btn-primary" onClick={handleEditProfile}>
            Editar Perfil
          </button>
        ) : (
          <>
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleInputChange}
              className="form-control mb-2"
              placeholder="Nombre de usuario"
            />
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              className="form-control mb-2"
              placeholder="Email"
            />
            <input
              type="text"
              name="direccion"
              value={profile.direccion}
              onChange={handleInputChange}
              className="form-control mb-2"
              placeholder="Dirección"
            />
            <input
              type="text"
              name="telefono"
              value={profile.telefono}
              onChange={handleInputChange}
              className="form-control mb-2"
              placeholder="Teléfono"
            />
            <input
              type="text"
              name="imageUrl"
              value={profile.imageUrl}
              onChange={handleInputChange}
              className="form-control mb-2"
              placeholder="URL de la imagen"
            />
            <button className="btn btn-success" onClick={handleSaveProfile}>
              Guardar Cambios
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
