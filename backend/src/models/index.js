const sequelize = require('../config/database');
const Post = require('./post');

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); // Sincroniza la base de datos (esto borra los datos existentes)
        console.log('Tablas sincronizadas con éxito');
    } catch (error) {
        console.error('Error al sincronizar las tablas:', error);
    }
};

syncDatabase();

module.exports = { Post };
