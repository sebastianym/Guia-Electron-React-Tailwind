// models/Sale.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Material = require('./Material');
const ClientCompany = require('./ClientCompany');

const Sale = sequelize.define('Sale', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  saleValue: { type: DataTypes.FLOAT, allowNull: false },
  // Usamos DATEONLY para almacenar solo la fecha y TIME para la hora.
  date: { 
    type: DataTypes.DATEONLY, 
    allowNull: false,
    defaultValue: DataTypes.NOW  // asigna la fecha actual
  },
  time: { 
    type: DataTypes.TIME, 
    allowNull: false,
    defaultValue: DataTypes.NOW  // En algunos dialectos puede funcionar; si no, podrías asignarlo con un hook
  }
}, {
  timestamps: true // Sequelize administrará createdAt y updatedAt automáticamente
});

Sale.belongsTo(User, { foreignKey: 'userId' });
Sale.belongsTo(Material, { foreignKey: 'materialId' });
Sale.belongsTo(ClientCompany, { foreignKey: 'clientCompanyId', allowNull: true });

module.exports = Sale;
