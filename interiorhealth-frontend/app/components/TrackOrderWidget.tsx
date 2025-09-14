"use client";
import React, { useState } from "react";
import api from "@/services/api";
import type { Order } from "@/app/lib/types";

export default function TrackOrderWidget() {
  const [orderId, setOrderId] = useState<string>("");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleTrack(e: React.FormEvent) {
    e.preventDefault();

    if (!orderId.trim()) {
      setError("Please enter an order ID");
      setOrder(null);
      return;
    }

    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      // Direct request for a specific order
      const res = await api.get(`/api/orders/${orderId}/`);
      if (!res || !res.data) throw new Error("Invalid response from server");

      setOrder(res.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message.includes("404") ? "Order not found" : err.message);
      } else {
        setError("Network error");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <form onSubmit={handleTrack} className="flex gap-2">
        <input
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter Order ID"
          className="border p-2 rounded flex-1"
        />
        <button
          type="submit"
          className="btn px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Searching..." : "Track"}
        </button>
      </form>

      {error && <div className="mt-3 text-red-600">{error}</div>}

      {order && (
        <div className="mt-4 space-y-2">
          <div>
            <strong>Order ID:</strong> {order.id}
          </div>
          <div>
            <strong>Status:</strong> {order.status}
          </div>
          <div>
            <strong>Address:</strong> {order.address}
          </div>
          <div>
            <strong>Total:</strong> {order.total_amount}
          </div>
          <div>
            <strong>Items:</strong>
            <ul className="list-disc ml-6">
              {order.items.map((it) => (
                <li key={String(it.id)}>
                  {it.inventory_item.name} x {it.quantity} — {it.price}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
