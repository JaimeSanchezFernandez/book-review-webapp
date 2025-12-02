BookVerse – Aplicación Web de Reseñas de Libros

Proyecto final — Programación de Servidores Web (CUNEF)
Autores: Jaime Sánchez Fernández & Eduardo

Descripción del proyecto

BookVerse es una aplicación web full-stack diseñada para gestionar libros, usuarios y reseñas.
Permite:

Registrarse e iniciar sesión

Ver libros disponibles

Añadir libros nuevos

Escribir y leer reseñas

Ver detalles de cada libro

Mantener sesiones con JWT

Gestión completa desde un backend con API REST

Está desarrollada con HTML, CSS y JavaScript (frontend) y Node.js + Express + MongoDB (backend).

Tecnologías utilizadas
Frontend

HTML5 semántico

CSS3 (layout, diseño responsive y estilos personalizados, sin frameworks)

JavaScript vanilla (API Fetch, manejo del DOM)

Sistema de componentes simples para las vistas

Backend

Node.js + Express

Mongoose (modelos y validación)

JWT (autenticación)

BcryptJS (cifrado de contraseñas)

CORS y Dotenv

Base de datos

MongoDB Atlas (base de datos en la nube)

Estructura del proyecto
book-review-webapp/
│
├── backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   ├── package.json
│   ├── Dockerfile
│
├── frontend/
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md

Configuración de la base de datos (MongoDB Atlas)

En el archivo backend/.env se usa:

MONGO_URI=mongodb+srv://xxxxx.mongodb.net/bookverse
JWT_SECRET=supersecreto123
PORT=5000


Solo necesitas:

Crear un cluster en MongoDB Atlas

Obtener el connection string

Sustituirlo en MONGO_URI

Ejecución del proyecto (modo sin Docker)
1. Instalar dependencias

En /backend:

npm install


En /frontend (no usa node, solo archivos estáticos).

2. Iniciar el backend
node src/app.js


El servidor abre en:

http://localhost:5000

3. Abrir el frontend

Solo debes abrir el archivo:

frontend/index.html


O usar extensión Live Server en VS Code.

Ejecución con Docker (opcional)

El profesor indicó que Docker era opcional siempre que se usara MongoDB Atlas.

Pero igualmente el proyecto incluye contenedores listos:

docker compose up --build


Servicios incluidos:

backend

frontend (servido por NGINX)

mongo (solo si se desactiva Mongo Atlas)

Endpoints principales de la API
Auth
Método	Endpoint	Descripción
POST	/api/auth/register	Registrar usuario
POST	/api/auth/login	Iniciar sesión
Libros
Método	Endpoint	Descripción
GET	/api/books	Lista de libros
POST	/api/books	Crear libro
GET	/api/books/:id	Ver detalles
Reseñas
Método	Endpoint	Descripción
POST	/api/reviews/:bookId	Añadir reseña
GET	/api/reviews/:bookId	Ver reseñas del libro

Frontend: explicación técnica

El frontend está construido sin frameworks, utilizando:

HTML5 semántico

Estructuras como <nav>, <header>, <section>, <article> para mejorar claridad y accesibilidad.

CSS responsivo

Flexbox

Estilos personalizados

Paleta oscura y moderna

Sin Bootstrap ni Tailwind (por decisión del curso)

JavaScript organizado

El archivo app.js gestiona:

Peticiones Fetch a la API

Login y registro

Renderizado dinámico de libros

Gestión de reseñas

Control de sesión con localStorage

Backend: arquitectura

Organizado en capas:

models/ → Esquemas de Mongoose

controllers/ → Lógica de negocio

routes/ → Endpoints REST

middleware/ → Autenticación JWT

config/db.js → Conexión a MongoDB Atlas

🧪 Datos de ejemplo

El cluster de MongoDB Atlas contiene:

Usuarios reales creados durante las pruebas

Libros añadidos por nosotros

Resesñas asociadas

Conclusiones

BookVerse cumple con todos los requisitos del proyecto:

Arquitectura full-stack

Conexión real con base de datos en la nube

API REST bien estructurada

Autenticación con JWT

Frontend funcional y atractivo

Código limpio y documentado

👥 Autores

Jaime Sánchez Fernández

Eduardo H.
