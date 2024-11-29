# Sistema de Posts

Este proyecto es una aplicación CRUD básica que permite gestionar una lista de posts. La aplicación utiliza un backend desarrollado con Node.js y un frontend con React. 

## Características

- Crear, listar, eliminar y filtrar posts.
- Validaciones en el backend para garantizar que los datos sean válidos.
- Manejo de errores en el frontend con mensajes claros al usuario.
- Diseño limpio y profesional utilizando Material-UI.

## Requisitos previos

- Node.js (v16 o superior).
- PostgreSQL (v17.2).
- npm o yarn instalado.

## Instrucciones de instalación

### Backend

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd backend

2. Instala las dependencias:
    npm install

3. Crea un archivo .env en la carpeta backend con las siguientes variables:
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=tu_usuario
    DB_PASSWORD=tu_contraseña
    DB_NAME=post_app
    PORT=5000

4. Ejecuta las migraciones para crear las tablas en la base de datos:
    node server.js

5. Inicia el servidor:
    npm start

### Frontend

1. Ve a la carpeta del frontend:
    cd frontend

2. Instala las dependencias:
    npm install

3. Inicia la aplicación:
    npm start

La aplicación estará disponible en http://localhost:3000.


### Funcionalidades

Crear posts: Completa el formulario y presiona "Enter" o el botón "Crear".
Eliminar posts: Haz clic en el ícono de basura junto al post que deseas eliminar.
Filtrar posts: Ingresa un término en el campo de filtro para buscar por nombre.

### Estructura del proyecto

/backend
  ├── config/        # Configuración de la base de datos
  ├── models/        # Definición de modelos Sequelize
  ├── routes/        # Rutas del backend
  ├── server.js      # Punto de entrada del servidor
/frontend
  ├── src/
      ├── components/ # Componentes React
      ├── redux/      # Estado global con Redux Toolkit
      ├── App.js      # Componente principal
      ├── index.js    # Punto de entrada

### Tecnologías utilizadas

Backend:
Node.js
Express.js
Sequelize
PostgreSQL
Frontend:
React
Material-UI
Axios
Redux Toolkit

### Pruebas

Backend
Usa Postman o cualquier herramienta para probar los endpoints:

GET /api/posts: Lista todos los posts.
POST /api/posts: Crea un nuevo post.
DELETE /api/posts/:id: Elimina un post por ID.

Frontend
Verifica que la interfaz permite realizar todas las operaciones CRUD.
Asegúrate de que los mensajes de error se muestren correctamente. 








