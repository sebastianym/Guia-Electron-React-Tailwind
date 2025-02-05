import React, { useEffect } from "react";
import { useState } from "react";
import { successAlert } from "../lib/utils/successAlert";

export default function ScaleForm() {
  const [formData, setFormData] = useState({
    material: "",
    weight: "",
  });

  const [errors, setErrors] = useState({});
  const [processedWeighings, setProcessedWeighings] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch("http://localhost:3002/api/materials");
        const data = await response.json();
        setMaterials(data);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };
    fetchMaterials();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.material) newErrors.material = "Seleccione un material";
    if (!formData.weight || formData.weight <= 0)
      newErrors.weight = "Ingrese un peso válido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const weighingData = {
        ...formData,
        timestamp: new Date().toLocaleString(),
      };

      setProcessedWeighings((prev) => [weighingData, ...prev]);
      setFormData({
        material: "",
        weight: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Error al procesar el pesaje");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Servicio de Báscula
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">
              Formulario de Servicio
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Material
                </label>
                <select
                  name="material"
                  value={formData.material}
                  onChange={handleInputChange}
                  className={`w-full p-3 text-lg border rounded-lg appearance-none bg-white
                    ${errors.material ? "border-red-500" : "border-gray-300"}
                    focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Seleccione un material</option>
                  {materials.map((material) => (
                    <option key={material.id} value={material.pricePerKg}>
                      {material.name}
                    </option>
                  ))}
                </select>
                {errors.material && (
                  <p className="text-red-500 text-sm mt-1">{errors.material}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Peso (kg)
                </label>
                <div className="flex gap-4">
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="El peso en kg"
                    className={`flex-1 p-3 text-lg border rounded-lg
                      ${errors.weight ? "border-red-500" : "border-gray-300"}
                      focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    readOnly={!isConnected}
                  />
                  <button
                    type="button"
                    disabled={!isConnected}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 
                      transition-colors disabled:opacity-50"
                  >
                    Pesar
                  </button>
                </div>
                {errors.weight && (
                  <p className="text-red-500 text-sm mt-1">{errors.weight}</p>
                )}
              </div>

              <div className="space-y-4 pt-4">
                <button
                  type="submit"
                  disabled={isLoading || !isConnected}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg text-lg font-medium
                    hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                >
                  {isLoading ? "Procesando..." : "Procesar pesaje"}
                </button>

                <button
                  type="button"
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg text-lg font-medium
                    hover:bg-green-700 transition-colors"
                  onClick={() => window.print()}
                >
                  Imprimir Ticket
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-6">Pesajes Procesados</h3>
            {processedWeighings.length === 0 ? (
              <p className="text-gray-500">No hay pesajes procesados.</p>
            ) : (
              <div className="space-y-4">
                {processedWeighings.map((weighing, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-100"
                  >
                    <p className="font-medium">Material: {weighing.material}</p>
                    <p>Peso: {weighing.weight} kg</p>
                    <p className="text-sm text-gray-500">
                      {weighing.timestamp}
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
