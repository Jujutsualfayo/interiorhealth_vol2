"use client";
import React, { useState } from "react";

export default function RequestDrugPage() {
  const [drugName, setDrugName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/request-drug", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ drug_name: drugName, quantity, notes }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Drug request submitted!");
        setDrugName("");
        setQuantity("");
        setNotes("");
      } else {
        setMessage(data.detail || "Error submitting request.");
      }
    } catch (err) {
      setMessage("Network error.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Request Drug</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Drug Name</label>
            <input
              type="text"
              value={drugName}
              onChange={e => setDrugName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-700"
              placeholder="Enter drug name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-700"
              placeholder="Enter quantity"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-700"
              placeholder="Additional notes"
              rows={3}
            />
          </div>
          <button disabled={loading} className="w-full py-2 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 transition">
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-gray-200">{message}</p>}
      </div>
    </div>
  );
}
