// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);  // Aseguramos que cart inicie como un array
  const [orders, setOrders] = useState([]);  // Aseguramos que orders inicie como un array
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Obtener los datos del perfil
    axios
      .get("/api/users/profile", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => setUser(response.data))
      .catch((error) => {
        console.error("Error al obtener los datos del perfil:", error);
        navigate("/login");
      });

    // Obtener el carrito
    axios
      .get("/api/users/cart", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        const cartData = Array.isArray(response.data) ? response.data : []; // Convertir a array si no lo es
        setCart(cartData);
      })
      .catch((error) => {
        console.error("Error al obtener el carrito:", error);
        setCart([]); // Establecer como un array vacío en caso de error
      });

    // Obtener compras pasadas
    axios
      .get("/api/users/orders", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        const ordersData = Array.isArray(response.data) ? response.data : []; // Convertir a array si no lo es
        setOrders(ordersData);
      })
      .catch((error) => {
        console.error("Error al obtener las compras:", error);
        setOrders([]); // Establecer como un array vacío en caso de error
      });
  }, [navigate]);

  if (!user) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div>
      <h1>Mi Perfil</h1>
      <p>Bienvenido, {user.username}.</p>
      <p>Email: {user.email}</p>
      <p>Dirección: {user.direccion}</p>
      <p>Teléfono: {user.telefono}</p>

      <h2>Resumen del Carrito</h2>
      {cart.length > 0 ? (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>{item.nombre_producto} - {item.cantidad}</li>
          ))}
        </ul>
      ) : (
        <p>No hay productos en el carrito.</p>
      )}

      <h2>Compras Pasadas</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>{order.nombre_producto} - {order.fecha_compra}</li>
          ))}
        </ul>
      ) : (
        <p>No hay compras pasadas.</p>
      )}

      <button
        className="btn btn-secondary"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
}

export default ProfilePage;
