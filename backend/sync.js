// backend/sync.js
const sequelize = require('./db');
const Usuario = require('./models/Usuario');

async function syncDb() {
  try {
    await sequelize.sync({ alter: true }); // alter: true actualiza el esquema según el modelo
    console.log('Base de datos sincronizada');
  } catch (error) {
    console.error('Error sincronizando la base de datos:', error);
  }
}

module.exports = syncDb;
