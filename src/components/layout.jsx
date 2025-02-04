import React from "react";
import { useState } from "react"
import { ShoppingCart, Store, Scale } from "lucide-react"

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`bg-white shadow-lg w-64 min-h-screen flex-shrink-0`}>
        <div className="p-4 bg-gray-900 text-white">
          <h1 className="text-xl font-bold">ASORESCATAR (USER)</h1>
        </div>

        <nav className="p-4 space-y-2">
          <a
            href="/compra"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Compra de Material</span>
          </a>

          <a
            href="/venta"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <Store className="h-5 w-5" />
            <span>Venta de Material</span>
          </a>

          <a
            href="/bascula"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <Scale className="h-5 w-5" />
            <span>Servicio de Báscula</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}

