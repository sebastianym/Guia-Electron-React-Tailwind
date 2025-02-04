// backend/db.js
const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite'), // Se crea el archivo en la carpeta backend
  logging: false,
});

module.exports = sequelize;
