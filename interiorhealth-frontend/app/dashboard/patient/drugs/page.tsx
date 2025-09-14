"use client";

import React, { useState, useEffect } from "react";
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
        const res = await api.get("/drugs/patients/inventory/");
        setInventory(res.data);
        // Default to first category
        if (res.data.length > 0) {
          setSelectedCategory(res.data[0].category);
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
              <div key={item.id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
                <div className="font-bold text-lg text-gray-800 mb-2">{item.name}</div>
                <div className="text-gray-600 mb-2">{item.description}</div>
                <div className="text-green-700 font-bold mb-4">KES {item.price}</div>
                <button className="mt-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-bold">Order</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
