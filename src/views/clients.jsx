import React, { useEffect } from "react";
import ClientsPage from "../components/admin-client.jsx";
import AdminLayout from "../components/admin-layout.jsx";

export default function AdminClientsPage() {
  return (
    <AdminLayout>
      <ClientsPage />
    </AdminLayout>
  )
}

