const express = require('express');
const { createClient, getClients, updateClient, deleteClient } = require('../controllers/clientController');
const router = express.Router();

router.post('/', createClient);
router.get('/', getClients);
router.put('/', updateClient);  // Actualizar cliente
router.delete('/', deleteClient); // Eliminar cliente

module.exports = router;
