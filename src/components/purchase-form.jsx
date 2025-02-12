import React, { useEffect, useState } from "react";
import { successAlert } from "../lib/utils/successAlert";

export default function PurchaseForm() {
  const [formData, setFormData] = useState({
    provider: "",
    material: "",
    weight: "50", // peso constante (50 kg)
    pricePerKg: "",
    totalPrice: "0",
  });
  const [errors, setErrors] = useState({});
  const [materials, setMaterials] = useState([]);
  const [providers, setProviders] = useState([]);
  const [processedPurchases, setProcessedPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  // Cargar proveedores y materiales
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch("http://localhost:3002/api/suppliers");
        const data = await response.json();
        setProviders(data);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    const fetchMaterials = async () => {
      try {
        const response = await fetch("http://localhost:3002/api/materials");
        const data = await response.json();
        setMaterials(data);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };

    fetchProviders();
    fetchMaterials();
    setLoading(false);
  }, []);

  // Validación del formulario
  const validateForm = () => {
    const newErrors = {};
    if (!formData.provider) newErrors.provider = "Seleccione un proveedor";
    if (!formData.material) newErrors.material = "Seleccione un material";
    if (!formData.weight || Number(formData.weight) <= 0)
      newErrors.weight = "Ingrese un peso válido";
    if (!formData.pricePerKg || Number(formData.pricePerKg) <= 0)
      newErrors.pricePerKg = "Ingrese un precio válido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejo del cambio en el input (por ejemplo, para el proveedor)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Actualiza el precio por Kg y calcula el total al seleccionar un material
  const handleMaterialChange = (e) => {
    const selectedMaterial = e.target.value;
    const material = materials.find((m) => m.name === selectedMaterial);

    setFormData((prev) => ({
      ...prev,
      material: selectedMaterial,
      pricePerKg: material ? material.pricePerKg : "",
      totalPrice: prev.weight
        ? (Number(prev.weight) * (material ? material.pricePerKg : 0)).toFixed(2)
        : "0",
    }));
  };

  // Procesa la compra (solo se almacena en el array local)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Obtenemos el proveedor para mostrar su nombre en la lista
    const providerObj = providers.find((p) => p.id === formData.provider);

    const purchaseData = {
      material: formData.material,
      weight: Number(formData.weight),
      pricePerKg: Number(formData.pricePerKg),
      totalPrice: Number(formData.totalPrice),
      // Datos adicionales para el envío a la base de datos:
      purchaseValue: Number(formData.totalPrice),
      userId: 1, // valor fijo hasta integrar el token
      materialId: materials.find((m) => m.name === formData.material)?.id || null,
      supplierId: formData.provider,
    };

    setProcessedPurchases((prev) => [...prev, purchaseData]);
    successAlert(
      "Compra procesada",
      "La compra se ha registrado localmente.",
      "success"
    );

    // Reiniciamos el formulario manteniendo el peso constante
    setFormData({
      provider: "",
      material: "",
      weight: "50",
      pricePerKg: "",
      totalPrice: "0",
    });
  };

  // Envía las compras procesadas a la base de datos y vacía el array
  const handlePrintTicket = async () => {
    if (processedPurchases.length === 0) return;

    setIsLoading(true);
    try {
      // Enviar cada compra a la base de datos
      for (const purchaseData of processedPurchases) {
        console.log("Enviando compra:", purchaseData);
        const response = await fetch("http://localhost:3002/api/purchase", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(purchaseData),
        });

        if (!response.ok) {
          throw new Error("Error al enviar una o más compras a la base de datos");
        }
      }

      // Imprime el ticket (puedes reemplazar window.print() por tu función personalizada)
      window.print();

      successAlert(
        "Ticket impreso",
        "Las compras han sido enviadas a la base de datos y se ha impreso el ticket.",
        "success"
      );
      // Vaciar el array de compras procesadas
      setProcessedPurchases([]);
    } catch (error) {
      successAlert("Error", error.message || "Error al procesar las compras", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Permite eliminar una compra individual de la lista
  const handleRemovePurchase = (id) => {
    setProcessedPurchases((prev) => prev.filter((purchase) => purchase.id !== id));
  };

  const isFormValid =
    formData.provider && formData.material && Number(formData.weight) > 0;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Compra de Material
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario de Compra */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">
              Formulario de Compra
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Proveedor */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Proveedor
                </label>
                <select
                  name="provider"
                  value={formData.provider}
                  onChange={handleInputChange}
                  className="w-full p-3 text-lg border rounded-lg bg-white"
                >
                  <option value="">Seleccione un proveedor</option>
                  {providers.map((provider) => (
                    <option key={provider.id} value={provider.id}>
                      {provider.name}
                    </option>
                  ))}
                </select>
                {errors.provider && (
                  <p className="text-red-500 text-sm mt-1">{errors.provider}</p>
                )}
              </div>

              {/* Material */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Material
                </label>
                <select
                  name="material"
                  value={formData.material}
                  onChange={handleMaterialChange}
                  className="w-full p-3 text-lg border rounded-lg bg-white"
                >
                  <option value="">Seleccione un material</option>
                  {materials.map((material) => (
                    <option key={material.id} value={material.name}>
                      {material.name}
                    </option>
                  ))}
                </select>
                {errors.material && (
                  <p className="text-red-500 text-sm mt-1">{errors.material}</p>
                )}
              </div>

              {/* Peso */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Peso (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  readOnly
                  className="w-full p-3 text-lg border rounded-lg bg-gray-50"
                />
                {errors.weight && (
                  <p className="text-red-500 text-sm mt-1">{errors.weight}</p>
                )}
              </div>

              {/* Precio por Kg */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Precio por Kg
                </label>
                <input
                  type="text"
                  name="pricePerKg"
                  value={formData.pricePerKg}
                  readOnly
                  className="w-full p-3 text-lg border rounded-lg bg-gray-50"
                />
                {errors.pricePerKg && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.pricePerKg}
                  </p>
                )}
              </div>

              {/* Precio Total */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Precio Total
                </label>
                <input
                  type="text"
                  value={`$${(Number(formData.pricePerKg) *
                    Number(formData.weight)).toFixed(2)}`}
                  readOnly
                  className="w-full p-3 text-lg border rounded-lg bg-gray-50 font-semibold"
                />
              </div>

              {/* Botones */}
              <div className="space-y-4 pt-4">
                <button
                  type="submit"
                  disabled={!isFormValid || isLoading}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg text-lg font-medium hover:bg-blue-700 disabled:bg-blue-300"
                >
                  {isLoading ? "Procesando..." : "Procesar Compra"}
                </button>

                <button
                  type="button"
                  disabled={processedPurchases.length === 0 || isLoading}
                  onClick={handlePrintTicket}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg text-lg font-medium hover:bg-green-700 disabled:bg-green-300"
                >
                  {isLoading ? "Enviando..." : "Imprimir Ticket"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Lista de Compras Procesadas */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-6">
              Compras Procesadas
            </h3>
            {processedPurchases.length === 0 ? (
              <p className="text-gray-500">No hay compras procesadas.</p>
            ) : (
              <div className="space-y-4">
                {processedPurchases.map((purchase) => (
                  <div
                    key={purchase.id}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-100 flex flex-col gap-2"
                  >
                    <p className="font-medium">
                      Proveedor: {purchase.provider}
                    </p>
                    <p>Material: {purchase.material}</p>
                    <p>Peso: {purchase.weight} kg</p>
                    <p className="font-semibold text-blue-600">
                      Total: ${purchase.totalPrice}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleRemovePurchase(purchase.id)}
                      className="self-end bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
