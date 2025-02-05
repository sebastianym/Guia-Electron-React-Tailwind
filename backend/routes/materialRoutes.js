const express = require('express');
const { createMaterial, getMaterials } = require('../controllers/materialController');
const router = express.Router();

router.post('/', createMaterial);
router.get('/', getMaterials);

module.exports = router;
