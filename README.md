📚 BookVerse – Aplicación Web de Reseñas de Libros

Proyecto final – Programación de Servidores Web (CUNEF)
Autores: Jaime Sánchez , Eduardo Hortelano y Lucia Parreño

🚀 Descripción del proyecto

BookVerse es una aplicación web full stack que permite gestionar libros, usuarios y reseñas.
Incluye:

Registro e inicio de sesión

API REST (Node.js + Express)

Base de datos en MongoDB Atlas

Frontend HTML, CSS y JS con lógica 100% cliente

Panel de libros, detalles, reseñas y filtrado

🛠️ Tecnologías utilizadas
Frontend

HTML semántico

CSS propio

JavaScript (fetch API)

Componentes dinámicos renderizados con JS

Backend

Node.js + Express

MongoDB + Mongoose

JWT (autenticación)

CORS

Dotenv

DevOps / Infraestructura

GitHub (proyecto completo)

Docker (implementación opcional del profesor)

MongoDB Atlas (base de datos en la nube)

📁 Estructura del proyecto
book-review-webapp/
│── backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   ├── package.json
│   └── Dockerfile
│
│── frontend/
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   └── Dockerfile
│
│── docker-compose.yml   (opcional)
└── README.md

🧩 Backend (Node + Express + MongoDB)
🔌 Conexión a la base de datos

En backend/src/config/db.js:

mongoose.connect(process.env.MONGO_URI)


En .env:

MONGO_URI=mongodb+srv://...
JWT_SECRET=loquesea123
PORT=5000

🔐 Autenticación JWT

Registro de usuarios

Login con email y contraseña

Token guardado en localStorage (frontend)

Middleware authMiddleware.js protege rutas privadas

🎨 Frontend
Componentes principales

index.html → Página principal con login + listado de libros

app.js → Toda la lógica del cliente (fetch, renderizado, eventos)

styles.css → Estilos propios con modo oscuro

Funcionalidades

Login / registro

Visualización del catálogo de libros

Detalles del libro

Añadir reseñas

Mostrar reseñas existentes

🐳 Docker (opcional según el profesor)

El profesor indicó que no es obligatorio usar Docker si se usa MongoDB Atlas.

Pero el proyecto incluye soporte Docker por si se usa localmente.

docker compose up --build

▶️ Cómo ejecutar el proyecto sin Docker
1. Clonar el repositorio
git clone https://github.com/JaimeSanchezFernandez/book-review-webapp.git
cd book-review-webapp/backend

2. Instalar dependencias
npm install

3. Crear archivo .env
MONGO_URI=mongodb+srv://...
JWT_SECRET=mi_clave
PORT=5000

4. Ejecutar backend
node src/app.js

5. Abrir frontend

Abrir frontend/index.html en el navegador.

🧪 Pruebas realizadas

Registro e inicio de sesión ✔️

Tokens y rutas protegidas ✔️

CRUD correcto de libros y reseñas ✔️

Base de datos Atlas funcionando ✔️

Frontend renderiza los datos dinámicamente ✔️

📦 Estado final del proyecto

✔️ Funcionalidad completa backend + frontend

✔️ Base de datos en la nube

✔️ Código organizado y documentado

✔️ Proyecto subido a GitHub

✔️ Despliegue local sin errores

👨‍🏫 Autoría

Proyecto desarrollado para la asignatura Programación de Servidores Web (CUNEF).
