"use client";
import React, { useState } from "react";

export default function AddPatientPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/healthworker-add-patient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first_name: firstName, last_name: lastName, email }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Patient added successfully!");
        setFirstName("");
        setLastName("");
        setEmail("");
      } else {
        setMessage(data.detail || "Error adding patient.");
      }
    } catch {
      setMessage("Network error.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Add Patient (CHE)</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-700"
              placeholder="Enter first name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-700"
              placeholder="Enter last name"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Contact (Email)</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-700"
              placeholder="Enter contact email"
              required
            />
          </div>
          <button disabled={loading} className="w-full py-2 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 transition">
            {loading ? "Adding..." : "Submit"}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-gray-200">{message}</p>}
      </div>
    </div>
  );
}
