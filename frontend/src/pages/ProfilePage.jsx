import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    imageUrl: "", // Foto de perfil
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Token no disponible o expirado");
          return;
        }

        // Solicitud a la API para obtener el perfil
        const response = await axios.get("http://localhost:5000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Asegúrate de que los datos del perfil se establezcan correctamente
        setFormData({
          username: response.data.name || "", // Asignar nombre de usuario
          email: response.data.email || "",   // Asignar correo electrónico
          imageUrl: response.data.profile_image_url || "", // Asignar la URL de la imagen
        });
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
        setError("Hubo un problema al cargar el perfil. Verifica tu conexión.");
      }
    };

    fetchProfile(); // Cargar el perfil cuando se monta el componente
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Actualizar el estado en tiempo real mientras el usuario escribe
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir la recarga de la página
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token no disponible o expirado");
        return;
      }

      // Enviar la solicitud para actualizar el perfil
      await axios.patch("http://localhost:5000/api/users/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Perfil actualizado exitosamente.");
      setError(""); // Limpiar cualquier mensaje de error
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      setError("Hubo un problema al actualizar el perfil. Intenta de nuevo.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Tu Perfil</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div>
          <label htmlFor="username">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Nombre de usuario"
            value={formData.username}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", margin: "5px 0" }}
          />
        </div>
        <div>
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", margin: "5px 0" }}
          />
        </div>
        <div>
          <label htmlFor="imageUrl">URL de la imagen de perfil</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            placeholder="URL de la imagen"
            value={formData.imageUrl}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", margin: "5px 0" }}
          />
        </div>
        {formData.imageUrl && (
          <div style={{ textAlign: "center" }}>
            <img
              src={formData.imageUrl}
              alt="Perfil"
              style={{ width: "100px", height: "100px", borderRadius: "50%", marginBottom: "10px" }}
            />
          </div>
        )}
        <button type="submit" style={{ padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" }}>
          Actualizar Perfil
        </button>
      </form>
      {message && <p style={{ color: "green", textAlign: "center", marginTop: "10px" }}>{message}</p>}
      {error && <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>{error}</p>}
    </div>
  );
};

export default ProfilePage;
