import React, { useEffect, useState } from "react";
import { successAlert } from "../lib/utils/successAlert";

export default function SaleForm() {
  // Se usa "clientCompany" en lugar de "provider"
  const [formData, setFormData] = useState({
    clientCompany: "",
    material: "",
    weight: "50", // peso constante (50 kg)
    pricePerKg: "",
    totalPrice: "0",
  });
  const [errors, setErrors] = useState({});
  const [materials, setMaterials] = useState([]);
  const [clientCompanies, setClientCompanies] = useState([]);
  const [processedSales, setProcessedSales] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false); // Si llega a conectarse la báscula

  // Cargar clientCompanies y materiales  
  useEffect(() => {
    const fetchClientCompanies = async () => {
      try {
        // Ajusta la URL de acuerdo a tu endpoint para las client companies
        const response = await fetch("http://localhost:3002/api/clients");
        const data = await response.json();
        setClientCompanies(data);
      } catch (error) {
        console.error("Error fetching client companies:", error);
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

    fetchClientCompanies();
    fetchMaterials();
  }, []);

  // Validación del formulario
  const validateForm = () => {
    const newErrors = {};
    if (!formData.clientCompany) newErrors.clientCompany = "Seleccione un cliente";
    if (!formData.material) newErrors.material = "Seleccione un material";
    if (!formData.weight || Number(formData.weight) <= 0)
      newErrors.weight = "Ingrese un peso válido";
    if (!formData.pricePerKg || Number(formData.pricePerKg) <= 0)
      newErrors.pricePerKg = "Ingrese un precio válido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejo de cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      if (name === "weight" || name === "pricePerKg") {
        const weight = name === "weight" ? value : prev.weight;
        const price = name === "pricePerKg" ? value : prev.pricePerKg;
        newData.totalPrice = (
          Number.parseFloat(weight || 0) * Number.parseFloat(price || 0)
        ).toFixed(2);
      }
      return newData;
    });
  };

  // Al seleccionar un material se actualiza el precio por Kg y se calcula el total
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

  // Procesa la venta (se almacena en el array local)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    // Obtenemos el cliente (clientCompany) para mostrar su nombre en la lista
    const clientObj = clientCompanies.find(
      (client) => client.id === formData.clientCompany
    );

    // Se arma el objeto de venta (sin date, time, createdAt y updatedAt, que se asignarán automáticamente)
    const saleData = {
      material: formData.material,
      weight: Number(formData.weight),
      pricePerKg: Number(formData.pricePerKg),
      totalPrice: Number(formData.totalPrice),
      saleValue: Number(formData.totalPrice),
      userId: 1, // valor fijo hasta integrar la autenticación
      materialId: materials.find((m) => m.name === formData.material)?.id || null,
      clientCompanyId: formData.clientCompany,
      // Los campos de fecha/hora se asignarán automáticamente en el modelo
    };

    // Se agrega la venta al array local de ventas procesadas
    setProcessedSales((prev) => [...prev, saleData]);
    successAlert(
      "Venta procesada",
      "La venta se ha registrado localmente.",
      "success"
    );

    // Reiniciamos el formulario
    setFormData({
      clientCompany: "",
      material: "",
      weight: "50",
      pricePerKg: "",
      totalPrice: "0",
    });
    setIsLoading(false);
  };

  // Envía las ventas procesadas a la base de datos y vacía el array
  const handlePrintTicket = async () => {
    if (processedSales.length === 0) return;

    setIsLoading(true);
    try {
      // Enviar cada venta a la base de datos
      for (const saleData of processedSales) {
        console.log("Enviando venta a la base de datos:", saleData);
        const response = await fetch("http://localhost:3002/api/sale", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(saleData),
        });
        if (!response.ok) {
          throw new Error("Error al enviar una o más ventas a la base de datos");
        }
      }

      // Imprime el ticket (puedes reemplazar window.print() por tu función de ticket)
      window.print();

      successAlert(
        "Ticket impreso",
        "Las ventas han sido enviadas a la base de datos y se ha impreso el ticket.",
        "success"
      );
      // Vaciar el array de ventas procesadas
      setProcessedSales([]);
    } catch (error) {
      successAlert("Error", error.message || "Error al procesar las ventas", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    formData.clientCompany && formData.material && Number(formData.weight) > 0;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Venta de Material
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario de Venta */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">
              Formulario de Venta
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Cliente (Client Company) */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Cliente
                </label>
                <select
                  name="clientCompany"
                  value={formData.clientCompany}
                  onChange={handleInputChange}
                  className={`w-full p-3 text-lg border rounded-lg bg-white ${
                    errors.clientCompany ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Seleccione un cliente</option>
                  {clientCompanies.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
                {errors.clientCompany && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.clientCompany}
                  </p>
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
                  className={`w-full p-3 text-lg border rounded-lg bg-white ${
                    errors.material ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
                  onChange={handleInputChange}
                  placeholder="Ingrese el peso en kg"
                  className={`w-full p-3 text-lg border rounded-lg ${
                    errors.weight ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  // Aquí podrías habilitar o no la lectura directa según conexión
                  readOnly={!isConnected}
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
                  type="number"
                  name="pricePerKg"
                  value={formData.pricePerKg}
                  onChange={handleInputChange}
                  placeholder="0"
                  className={`w-full p-3 text-lg border rounded-lg ${
                    errors.pricePerKg ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
                  value={`$${formData.totalPrice}`}
                  readOnly
                  className="w-full p-3 text-lg border rounded-lg bg-gray-50 font-semibold"
                />
              </div>

              {/* Botones */}
              <div className="space-y-4 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                >
                  {isLoading ? "Procesando..." : "Procesar Venta"}
                </button>

                <button
                  type="button"
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg text-lg font-medium hover:bg-green-700 transition-colors"
                  onClick={handlePrintTicket}
                >
                  Imprimir Ticket
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Lista de Ventas Procesadas */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-6">
              Ventas Procesadas
            </h3>
            {processedSales.length === 0 ? (
              <p className="text-gray-500">No hay ventas procesadas.</p>
            ) : (
              <div className="space-y-4">
                {processedSales.map((sale, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-100"
                  >
                    <p className="font-medium">
                      Cliente: {sale.clientCompany}
                    </p>
                    <p>Material: {sale.material}</p>
                    <p>Peso: {sale.weight} kg</p>
                    <p className="font-semibold text-blue-600">
                      Total: ${sale.totalPrice}
                    </p>
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
