// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import CartPage from "./pages/CartPage"; // Página del carrito
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext"; // Proveedor del contexto del carrito
import ProtectedRoute from "./components/ProtectedRoute"; // Componente de ruta protegida

function App() {
  return (
    <CartProvider> {/* Envolvemos la aplicación con el proveedor del carrito */}
      <Router>
        <Header />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/cart" element={<CartPage />} /> {/* Ruta del carrito */}
          </Routes>
        </div>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
