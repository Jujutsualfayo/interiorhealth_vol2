"use client";

import React, { useState, useEffect } from "react";
import OrderProductCard from "./OrderProductCard";
import api from "@/services/api";

type InventoryItem = {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  [key: string]: any;
};

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get("/api/drugs/patients/inventory/");
        let data = res.data;
        // If backend returns no products, use static demo data
        if (!data || data.length === 0) {
          data = [
            {
              id: 1,
              name: "Paracetamol",
              description: "Pain relief tablet",
              category: "drug",
              price: 50.00,
            },
            {
              id: 2,
              name: "Amoxicillin",
              description: "Antibiotic capsule",
              category: "drug",
              price: 120.00,
            },
            {
              id: 3,
              name: "Surgical Mask",
              description: "Disposable mask",
              category: "supply",
              price: 10.00,
            },
            {
              id: 4,
              name: "Glucose Meter",
              description: "Blood sugar device",
              category: "device",
              price: 2500.00,
            },
            {
              id: 5,
              name: "Vitamin C",
              description: "Supplement tablet",
              category: "drug",
              price: 80.00,
            },
          ];
        }
        setInventory(data);
        if (data.length > 0) {
          setSelectedCategory(data[0].category);
        }
      } catch (err: any) {
        setError("Could not fetch inventory.");
      }
      setLoading(false);
    };
    fetchInventory();
  }, []);

  // Group items by category
  const categories = Array.from(new Set(inventory.map((item: InventoryItem) => item.category)));
  const currentItems = inventory.filter((item: InventoryItem) => item.category === selectedCategory);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Order Products & Inventory</h2>
      {loading && <p>Loading inventory...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <>
          <div className="flex gap-4 mb-8 flex-wrap">
            {categories.map((cat: string) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded font-semibold border transition ${selectedCategory === cat ? "bg-green-600 text-white" : "bg-white text-green-700 border-green-600"}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentItems.map((item: InventoryItem) => (
              <OrderProductCard key={item.id} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
