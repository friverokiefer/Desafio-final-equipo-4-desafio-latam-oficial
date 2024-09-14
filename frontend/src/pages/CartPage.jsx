import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function CartPage() {
  const { cart, removeFromCart, addToCart, clearCart } = useContext(CartContext);
  const { user, isAuthenticated } = useContext(AuthContext);

  const calculateTotal = () => {
    const total = cart.reduce(
      (total, item) => {
        const price = typeof item.price === 'string' 
          ? parseFloat(item.price.replace(/[^\d,]/g, "").replace(",", ".")) 
          : item.price;
        return total + price * item.quantity;
      },
      0
    );
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(total);
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      addToCart(item, -1);
    }
  };

  const handleIncreaseQuantity = (item) => {
    addToCart(item, 1);
  };

  const handleCheckout = async () => {
    if (isAuthenticated) {
      try {
        const purchaseData = cart.map((item) => ({
          userId: user.id,
          productId: item.id,
          productName: item.name,
          quantity: item.quantity,
        }));

        await axios.post("http://localhost:5000/api/compras", { purchases: purchaseData });
        alert("Compra exitosa. Se ha guardado en tu historial.");
        clearCart();
      } catch (error) {
        console.error("Error al procesar la compra:", error);
        alert("Hubo un problema al registrar la compra.");
      }
    } else {
      alert("Compra exitosa.");
      clearCart();
    }
  };

  return (
    <div>
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          <ul className="list-group mb-3">
            {cart.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="img-thumbnail"
                    style={{ width: "80px", height: "80px", objectFit: "cover", marginRight: "15px" }}
                  />
                </Link>
                <div className="flex-grow-1">
                  <Link to={`/product/${item.id}`} className="text-decoration-none text-dark">
                    <h5>{item.name}</h5>
                  </Link>
                  <p>Precio: {item.price}</p>
                  <div className="d-flex align-items-center">
                    <p className="mb-0 me-2">Cantidad: {item.quantity}</p>
                    <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => handleDecreaseQuantity(item)}>
                      -
                    </button>
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => handleIncreaseQuantity(item)}>
                      +
                    </button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(index)} className="btn btn-danger ms-3">
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <h3>Total: {calculateTotal()}</h3>
          <button onClick={handleCheckout} className="btn btn-primary">Proceder al Pago</button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
