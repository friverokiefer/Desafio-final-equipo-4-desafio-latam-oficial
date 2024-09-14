-- Crear una nueva base de datos llamada music_store_jwt
CREATE DATABASE music_store_jwt;

-- Conectarse a la base de datos
\c music_store_jwt;

-- Crear la tabla de usuarios necesaria para la autenticación con JWT
CREATE TABLE users (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);