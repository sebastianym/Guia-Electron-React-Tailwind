import React from "react";
import { useState } from "react";
import { ShoppingCart, Store, Scale } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`bg-white shadow-lg w-64 min-h-screen flex-shrink-0`}>
        <div className="p-4 bg-gray-900 text-white">
          <h1 className="flex text-xl font-bold justify-center">ASORESCATAR</h1>
        </div>

        <nav className="p-4 space-y-2">
          <button
            onClick={() => navigate("/purchase")}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Compra de Material</span>
          </button>

          <button
            onClick={() => navigate("/sale")}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <Store className="h-5 w-5" />
            <span>Venta de Material</span>
          </button>

          <button
            onClick={() => navigate("/scale")}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <Scale className="h-5 w-5" />
            <span>Servicio de Báscula</span>
          </button>
          
          <button
            onClick={() => navigate("/admin/clients")}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <Scale className="h-5 w-5" />
            <span>Servicio de Báscula</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
