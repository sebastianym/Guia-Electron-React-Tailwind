// backend/db.js
const { Sequelize } = require('sequelize');
const sqlite3 = require('sqlite3');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  dialectModule: sqlite3,
  storage: "C:\\Users\\Sebas\\OneDrive\\Desktop\\database.sqlite", // Ruta absoluta para pruebas
  logging: false,
});

module.exports = sequelize;
