import React, { useEffect } from "react";
import Layout from "../components/layout.jsx";
import PurchaseForm from "../components/purchase-form.jsx";

export default function PurchasePage() {
  useEffect(() => {
    fetch("http://localhost:3002/api/materials")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);
  return (
    <Layout>
      <PurchaseForm />
    </Layout>
  );
}
