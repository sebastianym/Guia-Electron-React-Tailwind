const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Material = require('./Material');
const Supplier = require('./Supplier');

const Purchase = sequelize.define('Purchase', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  purchaseValue: { type: DataTypes.FLOAT, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
  time: { type: DataTypes.DATE, allowNull: false }
});

Purchase.belongsTo(User, { foreignKey: 'userId' });
Purchase.belongsTo(Material, { foreignKey: 'materialId' });
Purchase.belongsTo(Supplier, { foreignKey: 'supplierId' });

module.exports = Purchase;
