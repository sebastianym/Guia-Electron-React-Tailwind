const User = require('./User');
const Supplier = require('./Supplier');
const ClientCompany = require('./ClientCompany');
const Material = require('./Material');
const Sale = require('./Sale');
const Purchase = require('./Purchase');

User.hasMany(Sale, { foreignKey: 'userId' });
User.hasMany(Purchase, { foreignKey: 'userId' });

Material.hasMany(Sale, { foreignKey: 'materialId' });
Material.hasMany(Purchase, { foreignKey: 'materialId' });

Supplier.hasMany(Purchase, { foreignKey: 'supplierId' });

ClientCompany.hasMany(Sale, { foreignKey: 'clientCompanyId' });

module.exports = { User, Supplier, ClientCompany, Material, Sale, Purchase };
