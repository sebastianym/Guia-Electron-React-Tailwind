const express = require('express');
const { createMaterial, getMaterials, updateMaterial, deleteMaterial } = require('../controllers/materialController');
const router = express.Router();

router.post('/', createMaterial);
router.get('/', getMaterials);
router.put('/', updateMaterial);  // Actualizar material
router.delete('/', deleteMaterial); // Eliminar material

module.exports = router;
