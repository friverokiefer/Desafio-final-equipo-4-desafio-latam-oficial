// frontend/src/pages/PurchaseHistoryPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PurchaseHistoryPage() {
  const [purchases, setPurchases] = useState([]);
  const [error, setError] = useState('');

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/compras/historial`, {
          withCredentials: true,
        });
        setPurchases(response.data);
      } catch (error) {
        console.error('Error al obtener el historial de compras:', error);
        setError('Hubo un problema al cargar el historial de compras.');
      }
    };

    fetchPurchases();
  }, [backendUrl]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const defaultImageUrl = '/public/img/default-image.jpg'; // Asegúrate de tener esta imagen

  return (
    <div className="container mt-4">
      <h1>Historial de Compras</h1>
      {error && <p className="text-danger">{error}</p>}
      {purchases.length === 0 ? (
        <p>No tienes compras registradas.</p>
      ) : (
        purchases.map((purchase) => (
          <div key={purchase.id} className="mb-4">
            <h3>
              Compra #{purchase.id} - Fecha:{' '}
              {new Date(purchase.purchase_date).toLocaleString()}
            </h3>
            <p>
              Total: <strong>{formatPrice(purchase.total_amount)}</strong>
            </p>
            <div className="row">
              {purchase.items.map((item) => {
                // Construir la URL de la imagen, manejando casos donde image_url es null
                let imageUrl = '';
                if (item.image_url) {
                  imageUrl = item.image_url.startsWith('http')
                    ? item.image_url
                    : `${backendUrl}${item.image_url}`;
                } else {
                  imageUrl = `${backendUrl}${defaultImageUrl}`;
                }

                return (
                  <div key={item.product_id || item.id} className="col-md-4 mb-3">
                    <div className="card h-100">
                      <img
                        src={imageUrl}
                        className="card-img-top"
                        alt={item.product_name}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{item.product_name}</h5>
                        <p className="card-text">Cantidad: {item.quantity}</p>
                        <p className="card-text">
                          Precio: {formatPrice(item.price)}
                        </p>
                        <p className="card-text">
                          Subtotal: {formatPrice(item.subtotal)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default PurchaseHistoryPage;
