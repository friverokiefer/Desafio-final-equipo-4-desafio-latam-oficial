Revisar archivo PDF

IMPORTANTE-Entrega1-sitio-grupo-4

Ahi están los detalles de la primera entrega

LEER ENTREGA 3 en pdf

.env local 



DB_USER=feliperiverokiefer

DB_PASSWORD=9807

DB_HOST=localhost

DB_PORT=5432

DB_NAME=music_store_jwt

SECRET_KEY=miClaveSuperSegura

PORT=5000








# Music Store - Desafío Final Equipo 4 - Desafío Latam

Este es un proyecto de tienda de música desarrollado como parte del Desafío Final del curso Full Stack. El proyecto consiste en un **backend** hecho con Node.js, Express y PostgreSQL, y un **frontend** hecho con React, utilizando Vite para la configuración del proyecto. La aplicación permite a los usuarios registrarse, iniciar sesión, ver productos (instrumentos), añadirlos a un carrito, y realizar compras.

## Estructura del Proyecto


├── backend
│   ├── config/              # Configuración de la base de datos
│   ├── middleware/          # Middlewares de autenticación
│   ├── public/              # Imágenes y recursos públicos
│   ├── routes/              # Rutas de la API
│   ├── tests/               # Tests con Mocha
│   ├── utils/               # Utilidades como hash de contraseñas
│   └── index.js             # Archivo principal del backend
├── frontend
│   ├── src/                 # Archivos fuente de React
│   └── vite.config.js       # Configuración de Vite para el frontend
└── patch.py                 # Script de Python para actualizar stock
`</code></div>``</div></pre>`

## Requisitos

### Backend

* **Node.js** v18 o superior
* **PostgreSQL** v13 o superior

### Frontend

* **Node.js** v18 o superior
* **Vite**

## Configuración del Entorno

### Variables de Entorno

Debes crear un archivo `.env` en la carpeta `backend` con las siguientes variables:

DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=5432
DB_NAME=music_store_jwt
SECRET_KEY=miClaveSuperSegura
PORT=5000
`</code></div>``</div></pre>`

En la carpeta `frontend`, también necesitarás un archivo `.env` con la siguiente configuración:

VITE_BACKEND_URL=http://localhost:5000


## Instalación y Ejecución

### Clonar el repositorio

git clone https://github.com/tu-usuario/Desafio-final-equipo-4-desafio-latam-oficial.git
cd Desafio-final-equipo-4-desafio-latam-oficial

### 1. Configuración del Backend

#### 1.1 Instalar dependencias

Ve a la carpeta del backend e instala las dependencias:

cd backend
npm install

#### 1.2 Configurar la base de datos

1. Inicia tu servidor de PostgreSQL.
2. Crea la base de datos ejecutando el script `database.sql` incluido en la carpeta `config`.

psql -U tu_usuario -d postgres -f config/database.sql

3. Inserta los datos de prueba ejecutando el script `insert_instruments.sql`.

psql -U tu_usuario -d music_store_jwt -f config/insert_instruments.sql

#### 1.3 Ejecutar el backend

Para iniciar el servidor, ejecuta el siguiente comando en la carpeta `backend`:

npm run start

El backend estará disponible en `http://localhost:5000`.

### 2. Configuración del Frontend

#### 2.1 Instalar dependencias

Ve a la carpeta del frontend e instala las dependencias:

cd ../frontend
npm install

#### 2.2 Ejecutar el frontend

Para iniciar el frontend, ejecuta el siguiente comando:

npm run dev

El frontend estará disponible en `http://localhost:5173`.

## Testing

### Backend

Los tests para el backend están configurados con **Mocha** y  **Chai** . Para ejecutarlos, usa:

cd backend
npm run test

### Frontend

Los tests para el frontend están configurados con **ESLint** para asegurarse de que el código sigue las mejores prácticas. Para ejecutarlo:

cd frontend
npm run lint

## Scripts Útiles

* **Backend** :
* `npm run start`: Inicia el servidor del backend.
* `npm run test`: Ejecuta los tests del backend.
* `npm run lint`: Revisa errores de estilo y código.
* **Frontend** :
* `npm run dev`: Inicia el servidor de desarrollo de Vite.
* `npm run build`: Construye la aplicación de producción.
* `npm run preview`: Previsualiza la versión construida.
* `npm run lint`: Revisa errores de estilo y código.
