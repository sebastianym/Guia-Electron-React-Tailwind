const Supplier = require("../models/Supplier");

exports.createSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.status(201).json(supplier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSupplier = async (req, res) => {
  try {
    const { id, ...updateData } = req.body; // Extrae id y los nuevos datos
    if (!id) return res.status(400).json({ error: "El ID es requerido" });

    const supplier = await Supplier.findByPk(id);
    if (!supplier) return res.status(404).json({ error: "Proveedor no encontrado" });

    await supplier.update(updateData);
    res.json({ message: "Proveedor actualizado correctamente", supplier });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSupplier = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "El ID es requerido" });

    const supplier = await Supplier.findByPk(id);
    if (!supplier) return res.status(404).json({ error: "Proveedor no encontrado" });

    await supplier.destroy();
    res.json({ message: "Proveedor eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
