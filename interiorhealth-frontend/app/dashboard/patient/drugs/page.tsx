"use client";

import React, { useState, useEffect } from "react";
import OrderProductCard from "./OrderProductCard";
import api from "@/services/api";
import type { InventoryItem } from "@/app/lib/types";

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
        console.log("API response:", res);
        const data = res.data as InventoryItem[];
        // Only use backend data; no static demo data fallback
        if (!data || data.length === 0) {
          setInventory([]);
          setSelectedCategory("");
          setLoading(false);
          return;
        }
        setInventory(data);
        if (data.length > 0 && data[0].category) {
          setSelectedCategory(String(data[0].category));
        }
      } catch (err: unknown) {
        if (
          typeof err === "object" &&
          err !== null &&
          "response" in err &&
          (err as { response?: { status?: number } }).response?.status === 401
        ) {
          setError("You must be logged in as a patient to view inventory.");
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Could not fetch inventory.");
        }
      }
      setLoading(false);
    };
    fetchInventory();
  }, []);

  // Group items by category
  const categories = Array.from(new Set(inventory.map((item: InventoryItem) => item.category).filter((c) => !!c))) as string[];
  const currentItems = inventory.filter((item: InventoryItem) => (item.category || "") === selectedCategory);

  return (
    <div className="min-h-screen w-full bg-white">
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
    </div>
  );
}
