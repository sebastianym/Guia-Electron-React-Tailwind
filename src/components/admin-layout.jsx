import React, { useState } from "react";
import {
  Users,
  UserPlus,
  Truck,
  Package,
  ShoppingCart,
  Store,
  LogOut,
} from "lucide-react";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="bg-white shadow-lg w-64 min-h-screen flex-shrink-0">
        <div className="p-4 bg-gray-900 text-white flex justify-between items-center">
          <h1 className="text-xl font-bold">ASORESCATAR (admin)</h1>
        </div>

        <nav className="p-4 space-y-2">
          <button
            href="/admin/users"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <Users className="h-5 w-5" />
            <span>Administrar Usuarios</span>
          </button>

          <button
            href="/admin/clients"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <UserPlus className="h-5 w-5" />
            <span>Administrar Clientes</span>
          </button>

          <button
            href="/admin/providers"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <Truck className="h-5 w-5" />
            <span>Administrar Proveedores</span>
          </button>

          <button
            href="/admin/materials"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <Package className="h-5 w-5" />
            <span>Administrar Materiales</span>
          </button>

          <button
            href="/admin/sales"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <Store className="h-5 w-5" />
            <span>Administrar Ventas</span>
          </button>

          <button
            href="/admin/purchases"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Administrar Compras</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
