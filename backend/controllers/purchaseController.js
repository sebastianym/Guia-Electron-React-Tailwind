const Purchase = require("../models/Purchase");

exports.createPurchase = async (req, res) => {
  try {
    // Extraemos solo los campos necesarios y confiamos en que el modelo asigne date, time, createdAt y updatedAt
    const { purchaseValue, userId, materialId, supplierId } = req.body;
    // Opcionalmente, podrías validar que estos campos existan y sean correctos.
    const purchase = await Purchase.create({ 
      purchaseValue, 
      userId, 
      materialId, 
      supplierId 
    });
    res.status(201).json(purchase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.findAll();
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePurchase = async (req, res) => {
  try {
    const { id, ...updateData } = req.body;
    if (!id) return res.status(400).json({ error: "El ID es requerido" });

    const purchase = await Purchase.findByPk(id);
    if (!purchase) return res.status(404).json({ error: "Compra no encontrada" });

    await purchase.update(updateData);
    res.json({ message: "Compra actualizada correctamente", purchase });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePurchase = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "El ID es requerido" });

    const purchase = await Purchase.findByPk(id);
    if (!purchase) return res.status(404).json({ error: "Compra no encontrada" });

    await purchase.destroy();
    res.json({ message: "Compra eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
