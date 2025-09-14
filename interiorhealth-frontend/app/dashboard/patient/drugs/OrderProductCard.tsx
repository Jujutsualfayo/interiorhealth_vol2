"use client";

import React, { useState } from "react";
import api from "@/services/api";
import type { InventoryItem } from "@/app/lib/types";

export default function OrderProductCard({ item }: { item: InventoryItem }) {
  const [quantity, setQuantity] = useState<number>(1);
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleOrder = async () => {
    if (!address.trim()) {
      setError("Please enter your delivery address.");
      setMessage(null);
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      await api.post("/api/orders/create/", {
        items: [{ drug: item.id, quantity }],
        address,
      });
      setMessage("Order placed successfully.");
    } catch (err: unknown) {
      const msg =
        err && typeof err === "object" && "response" in err && (err as any).response?.data?.error
          ? (err as any).response.data.error
          : err instanceof Error
          ? err.message
          : "Failed to place order.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col">
      <div className="font-medium text-lg text-slate-800 mb-2">{item.name}</div>
      <div className="text-slate-500 mb-2">{item.description}</div>
      <div className="text-slate-700 font-semibold mb-4">KES {item.price}</div>

      <div className="flex items-center gap-2 mb-4">
        <label htmlFor={`quantity-${item.id}`} className="text-slate-600 text-sm">Qty:</label>
        <input
          id={`quantity-${item.id}`}
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-16 border rounded px-2 py-1 text-slate-700"
        />
      </div>

      <div className="mb-4">
        <label htmlFor={`address-${item.id}`} className="text-slate-600 text-sm block mb-1">Location/Address</label>
        <input
          id={`address-${item.id}`}
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border rounded px-2 py-2 text-slate-700"
          placeholder="Enter your delivery location or address"
        />
      </div>

      <button
        className="mt-auto bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 font-medium transition"
        onClick={handleOrder}
        disabled={loading}
      >
        {loading ? "Ordering..." : "Order"}
      </button>

      {message && <p className="text-green-600 text-sm mt-2">{message}</p>}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
