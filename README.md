# Atelier — Catálogo de ropa masculina elegante

Proyecto Final · Desarrollo de Sistemas Web 2026

Aplicación web full stack para gestionar y mostrar un catálogo de ropa masculina (sastreros, chombas, pantalones de vestir y camisas).

## Tecnologías

* **Front-End:** React 18 + Vite
* **Back-End:** Node.js + Express
* **Base de datos:** MongoDB Atlas (Mongoose), una colección `products`

## Funcionalidades

* Catálogo con búsqueda por nombre y filtro por categoría
* Detalle del producto en una ventana modal
* Panel de administración: crear, editar y eliminar productos (CRUD completo)
* API REST:

|Método|Ruta|Descripción|
|-|-|-|
|GET|`/api/products?category=\&search=`|Lista productos (con filtros opcionales)|
|GET|`/api/products/:id`|Obtiene un producto|
|POST|`/api/products`|Crea un producto|
|PUT|`/api/products/:id`|Actualiza un producto|
|DELETE|`/api/products/:id`|Elimina un producto|

## Ejecutar en local

### 1\. Back-End

```bash
cd backend
npm install
cp .env.example .env     # completar MONGODB\_URI con tu cadena de Atlas
npm run seed             # (opcional) carga 12 productos de ejemplo
npm run dev
```

### 2\. Front-End

```bash
cd frontend
npm install
cp .env.example .env     # VITE\_API\_URL=http://localhost:4000/api
npm run dev
```

Abrir http://localhost:5173

## Despliegue

**Base de datos (MongoDB Atlas)**

1. Crear cuenta y un cluster gratuito (M0).
2. *Database Access*: crear un usuario con contraseña.
3. *Network Access*: permitir acceso desde `0.0.0.0/0`.
4. *Connect → Drivers*: copiar la cadena de conexión y reemplazar usuario/contraseña. Agregar el nombre de la base (`/catalogo`) antes del `?`.

**Back-End (Render o Railway)**

1. Subir el repo a GitHub y crear un *Web Service* desde el repo.
2. Root directory: `backend` · Build: `npm install` · Start: `npm start`.
3. Variables de entorno: `MONGODB\_URI` y `CORS\_ORIGIN` (la URL del front una vez desplegado).
4. Copiar la URL pública del servicio (ej: `https://mi-api.onrender.com`).

**Front-End (Vercel o Netlify)**

1. Importar el mismo repo.
2. Root directory: `frontend` · Build: `npm run build` · Output: `dist`.
3. Variable de entorno: `VITE\_API\_URL=https://mi-api.onrender.com/api`.
4. Desplegar y copiar la URL pública.

Después, volver al back-end y poner esa URL del front en `CORS\_ORIGIN`.

