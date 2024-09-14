// frontend/src/pages/PurchaseHistoryPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PurchaseHistoryPage() {
  const [purchases, setPurchases] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/compras/historial');
        setPurchases(response.data);
      } catch (error) {
        console.error('Error al obtener el historial de compras:', error);
        setError('Hubo un problema al cargar el historial de compras.');
      }
    };

    fetchPurchases();
  }, []);

  return (
    <div>
      <h1>Historial de Compras</h1>
      {error && <p className="text-danger">{error}</p>}
      {purchases.length === 0 ? (
        <p>No tienes compras registradas.</p>
      ) : (
        purchases.map((purchase) => (
          <div key={purchase.id} className="mb-4">
            <h3>
              Compra #{purchase.id} - Fecha: {new Date(purchase.purchase_date).toLocaleString()}
            </h3>
            <p>
              Total:{' '}
              {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(
                purchase.total_amount
              )}
            </p>
            <ul className="list-group">
              {purchase.items.map((item) => (
                <li key={item.id} className="list-group-item">
                  <h5>{item.product_name}</h5>
                  <p>
                    Precio:{' '}
                    {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(
                      item.price
                    )}
                  </p>
                  <p>Cantidad: {item.quantity}</p>
                  <p>
                    Subtotal:{' '}
                    {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(
                      item.subtotal
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default PurchaseHistoryPage;
