import React, { useState, useEffect } from "react";

function CartPage() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []);

    const handleRemoveFromCart = (index) => {
        const updatedCart = cartItems.filter((item, i) => i !== index);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div>
            <h1>Carrito de Compras</h1>
            {cartItems.length === 0 ? (
                <p>El carrito está vacío.</p>
            ) : (
                <div>
                    <ul className="list-group mb-3">
                        {cartItems.map((item, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <h5>{item.name}</h5>
                                    <p>Precio: ${item.price}</p>
                                    <p>Cantidad: {item.quantity}</p>
                                </div>
                                <button onClick={() => handleRemoveFromCart(index)} className="btn btn-danger">
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                    <h3>Total: ${calculateTotal()}</h3>
                    <button className="btn btn-primary">Proceder al Pago</button>
                </div>
            )}
        </div>
    );
}

export default CartPage;
