const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Importar cors
const app = express();

// Cargar variables de entorno
dotenv.config();

// Configurar CORS
app.use(cors());

// Middleware para manejar JSON
app.use(express.json());

// Rutas principales
app.use('/api/posts', require('./src/routes/posts'));

// Log para confirmar las rutas registradas
console.log(
    'Rutas registradas:',
    app._router.stack
        .filter(layer => layer.route)
        .map(layer => ({
            path: layer.route.path,
            methods: Object.keys(layer.route.methods),
        }))
);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
