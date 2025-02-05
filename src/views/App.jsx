import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login.jsx";
import PurchasePage from "./purchase.jsx";
import SalePage from "./sale.jsx";
import ScalePage from "./scale.jsx";
import AdminClientsPage from "./clients.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/purchase" element={<PurchasePage />} />
        <Route path="/sale" element={<SalePage />} />
        <Route path="/scale" element={<ScalePage />} />
        <Route path="/admin/clients" element={<AdminClientsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
