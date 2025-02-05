const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Material = require('./Material');
const Supplier = require('./Supplier');

const Purchase = sequelize.define('Purchase', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  purchaseValue: { 
    type: DataTypes.FLOAT, 
    allowNull: false 
  },
  // Usamos DATEONLY para almacenar solo la fecha y TIME para la hora.
  date: { 
    type: DataTypes.DATEONLY, 
    allowNull: false,
    defaultValue: DataTypes.NOW  // Esto asigna la fecha actual
  },
  time: { 
    type: DataTypes.TIME, 
    allowNull: false,
    defaultValue: DataTypes.NOW  // En algunos dialectos puede funcionar; si no, podrías asignarlo con un hook
  }
}, {
  timestamps: true  // Esto genera automáticamente los campos createdAt y updatedAt
});

// Definición de relaciones
Purchase.belongsTo(User, { foreignKey: 'userId' });
Purchase.belongsTo(Material, { foreignKey: 'materialId' });
Purchase.belongsTo(Supplier, { foreignKey: 'supplierId' });

module.exports = Purchase;
