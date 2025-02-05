const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const ClientCompany = sequelize.define('ClientCompany', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  NIT: { type: DataTypes.STRING, unique: true, allowNull: false }
}, { timestamps: false });

module.exports = ClientCompany;
