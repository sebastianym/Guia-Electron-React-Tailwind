const Material = require('../models/Material');

exports.createMaterial = async (req, res) => {
  try {
    const material = await Material.create(req.body);
    res.status(201).json(material);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMaterials = async (req, res) => {
  try {
    const materials = await Material.findAll();
    res.json(materials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMaterial = async (req, res) => {
  try {
    const { id, ...updateData } = req.body; // Extrae id y los nuevos datos
    if (!id) return res.status(400).json({ error: "El ID es requerido" });

    const material = await Material.findByPk(id);
    if (!material) return res.status(404).json({ error: "Material no encontrado" });

    await material.update(updateData);
    res.json({ message: "Material actualizado correctamente", material });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMaterial = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "El ID es requerido" });

    const material = await Material.findByPk(id);
    if (!material) return res.status(404).json({ error: "Material no encontrado" });

    await material.destroy();
    res.json({ message: "Material eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
