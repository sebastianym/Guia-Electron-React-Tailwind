const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Material = sequelize.define('Material', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  pricePerKg: { type: DataTypes.FLOAT, allowNull: false }
}, { timestamps: false });

module.exports = Material;
