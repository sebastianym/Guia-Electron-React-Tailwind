import React from "react";
import { useState } from "react"

export default function PurchaseForm() {
  const [formData, setFormData] = useState({
    provider: "",
    material: "",
    weight: "",
    pricePerKg: "",
    totalPrice: "0",
  })

  const [errors, setErrors] = useState({})
  const [processedPurchases, setProcessedPurchases] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const providers = ["Proveedor 1", "Proveedor 2", "Proveedor 3"]
  const materials = ["Material 1", "Material 2", "Material 3"]

  const validateForm = () => {
    const newErrors = {}
    if (!formData.provider) newErrors.provider = "Seleccione un proveedor"
    if (!formData.material) newErrors.material = "Seleccione un material"
    if (!formData.weight || formData.weight <= 0) newErrors.weight = "Ingrese un peso válido"
    if (!formData.pricePerKg || formData.pricePerKg <= 0) newErrors.pricePerKg = "Ingrese un precio válido"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => {
      const newData = { ...prev, [name]: value }
      if (name === "weight" || name === "pricePerKg") {
        const weight = name === "weight" ? value : prev.weight
        const price = name === "pricePerKg" ? value : prev.pricePerKg
        newData.totalPrice = (Number.parseFloat(weight || 0) * Number.parseFloat(price || 0)).toFixed(2)
      }
      return newData
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsLoading(true)

    try {
      const response = await fetch("/api/purchases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Error al procesar la compra")

      const result = await response.json()
      setProcessedPurchases((prev) => [...prev, result])
      setFormData({
        provider: "",
        material: "",
        weight: "",
        pricePerKg: "",
        totalPrice: "0",
      })
    } catch (error) {
      console.error("Error:", error)
      alert("Error al procesar la compra")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Compra de Material</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Formulario de Compra</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Proveedor</label>
                <select
                  name="provider"
                  value={formData.provider}
                  onChange={handleInputChange}
                  className={`w-full p-3 text-lg border rounded-lg appearance-none bg-white
                    ${errors.provider ? "border-red-500" : "border-gray-300"}
                    focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Seleccione un proveedor</option>
                  {providers.map((provider) => (
                    <option key={provider} value={provider}>
                      {provider}
                    </option>
                  ))}
                </select>
                {errors.provider && <p className="text-red-500 text-sm mt-1">{errors.provider}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Material</label>
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
                    <option key={material} value={material}>
                      {material}
                    </option>
                  ))}
                </select>
                {errors.material && <p className="text-red-500 text-sm mt-1">{errors.material}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Peso (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="El peso en kg"
                  className={`w-full p-3 text-lg border rounded-lg
                    ${errors.weight ? "border-red-500" : "border-gray-300"}
                    focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Precio por Kg</label>
                <input
                  type="number"
                  name="pricePerKg"
                  value={formData.pricePerKg}
                  onChange={handleInputChange}
                  placeholder="0"
                  className={`w-full p-3 text-lg border rounded-lg
                    ${errors.pricePerKg ? "border-red-500" : "border-gray-300"}
                    focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.pricePerKg && <p className="text-red-500 text-sm mt-1">{errors.pricePerKg}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Precio Total</label>
                <input
                  type="text"
                  value={`$${formData.totalPrice}`}
                  readOnly
                  className="w-full p-3 text-lg border border-gray-300 rounded-lg bg-gray-50 font-semibold"
                />
              </div>

              <div className="space-y-4 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg text-lg font-medium
                    hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                >
                  {isLoading ? "Procesando..." : "Procesar Compra"}
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
            <h3 className="text-xl font-semibold mb-6">Compras Procesadas</h3>
            {processedPurchases.length === 0 ? (
              <p className="text-gray-500">No hay compras procesadas.</p>
            ) : (
              <div className="space-y-4">
                {processedPurchases.map((purchase, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="font-medium">Proveedor: {purchase.provider}</p>
                    <p>Material: {purchase.material}</p>
                    <p>Peso: {purchase.weight} kg</p>
                    <p className="font-semibold text-blue-600">Total: ${purchase.totalPrice}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

