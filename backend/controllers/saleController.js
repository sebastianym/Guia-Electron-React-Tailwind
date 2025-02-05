const Sale = require("../models/Sale");

exports.createSale = async (req, res) => {
  try {
    const { saleValue, userId, materialId, clientCompanyId } = req.body;

    const sale = await Sale.create({
      saleValue, 
      userId, 
      materialId, 
      clientCompanyId 
    });
    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSales = async (req, res) => {
  try {
    const sales = await Sale.findAll();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSale = async (req, res) => {
  try {
    const { id, ...updateData } = req.body;
    if (!id) return res.status(400).json({ error: "El ID es requerido" });

    const sale = await Sale.findByPk(id);
    if (!sale) return res.status(404).json({ error: "Venta no encontrada" });

    await sale.update(updateData);
    res.json({ message: "Venta actualizada correctamente", sale });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSale = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "El ID es requerido" });

    const sale = await Sale.findByPk(id);
    if (!sale) return res.status(404).json({ error: "Venta no encontrada" });

    await sale.destroy();
    res.json({ message: "Venta eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
