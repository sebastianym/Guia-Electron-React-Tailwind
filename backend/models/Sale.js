const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Material = require('./Material');
const ClientCompany = require('./ClientCompany');

const Sale = sequelize.define('Sale', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  saleValue: { type: DataTypes.FLOAT, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
  time: { type: DataTypes.DATE, allowNull: false }
});

Sale.belongsTo(User, { foreignKey: 'userId' });
Sale.belongsTo(Material, { foreignKey: 'materialId' });
Sale.belongsTo(ClientCompany, { foreignKey: 'clientCompanyId', allowNull: true });

module.exports = Sale;
