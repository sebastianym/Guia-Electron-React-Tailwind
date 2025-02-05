const express = require('express');
const { createSupplier, getSuppliers, updateSupplier, deleteSupplier } = require('../controllers/supplierController');
const router = express.Router();

router.post('/', createSupplier);
router.get('/', getSuppliers);
router.put('/', updateSupplier);  // Actualizar proveedor
router.delete('/', deleteSupplier); // Eliminar proveedor

module.exports = router;
