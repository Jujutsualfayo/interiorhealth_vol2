import React, { useState } from "react";
import axios from "@/lib/axios";

export default function TrackOrderWidget() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<any | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setOrder(null);
    try {
      // Fetch all orders for the logged-in patient
      const res = await axios.get("/api/orders/my-orders/");
      const orders = res.data;
      // Find order by entered ID
      const found = orders.find((o: any) => String(o.id) === orderId.trim());
      if (found) {
        setOrder(found);
      } else {
        setError("Order not found. Please check your Order ID.");
      }
    } catch (err: any) {
      setError("Could not fetch orders. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-6 relative overflow-hidden">
      {/* World Map SVG Background */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover opacity-30">
          <image href="https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg" x="0" y="0" width="600" height="300" />
          {/* Animated delivery track */}
          <path id="trackPath" d="M100,200 Q300,50 500,200" stroke="#2563eb" strokeWidth="4" fill="none" />
          <circle>
            <animateMotion dur="4s" repeatCount="indefinite">
              <mpath xlinkHref="#trackPath" />
            </animateMotion>
            <animate attributeName="r" values="10;14;10" dur="2s" repeatCount="indefinite" />
            <animate attributeName="fill" values="#22d3ee;#2563eb;#22d3ee" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
      <div className="relative z-10">
        <h2 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-400">Track Your Order</h2>
        <form onSubmit={handleTrack} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter Order ID"
            value={orderId}
            onChange={e => setOrderId(e.target.value)}
            className="px-4 py-2 border rounded w-full dark:bg-gray-800 dark:text-white"
          />
          <button
            type="submit"
            className="bg-blue-700 text-white px-4 py-2 rounded font-bold hover:bg-blue-800"
            disabled={loading}
          >
            {loading ? "Tracking..." : "Track"}
          </button>
        </form>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {order && (
          <div className="bg-blue-50 dark:bg-gray-800 rounded-lg p-4 mt-2">
            <div className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Order #{order.id}</div>
            <div className="text-gray-700 dark:text-gray-200 mb-1">Status: {order.status}</div>
            <div className="text-gray-700 dark:text-gray-200 mb-1">Address: {order.address}</div>
            <div className="text-gray-700 dark:text-gray-200 mb-1">Total Amount: {order.total_amount}</div>
            <div className="text-gray-700 dark:text-gray-200 mb-1">Created: {new Date(order.created_at).toLocaleString()}</div>
            <div className="text-gray-700 dark:text-gray-200 mb-1">Items:</div>
            <ul className="list-disc ml-6">
              {order.items.map((item: any) => (
                <li key={item.id}>
                  {item.drug_name || item.item_name} x {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
