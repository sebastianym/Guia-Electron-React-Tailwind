const ClientCompany = require('../models/ClientCompany');

exports.createClient = async (req, res) => {
  try {
    const client = await ClientCompany.create(req.body);
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getClients = async (req, res) => {
  try {
    const clients = await ClientCompany.findAll();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
