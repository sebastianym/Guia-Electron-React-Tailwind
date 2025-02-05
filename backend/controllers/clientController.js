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

exports.updateClient = async (req, res) => {
  try {
    const { id, ...updateData } = req.body; // Extrae id y los nuevos datos
    if (!id) return res.status(400).json({ error: "El ID es requerido" });

    const client = await ClientCompany.findByPk(id);
    if (!client) return res.status(404).json({ error: "Cliente no encontrado" });

    await client.update(updateData);
    res.json({ message: "Cliente actualizado correctamente", client });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "El ID es requerido" });

    const client = await ClientCompany.findByPk(id);
    if (!client) return res.status(404).json({ error: "Cliente no encontrado" });

    await client.destroy();
    res.json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
