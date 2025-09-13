"use client";

import { useState } from "react";
import api from "@/services/api";
import AuthGate from "@/components/AuthGate";

export default function PatientDashboard() {
  const config = {
    public_key: "FLWPUBK_TEST-42fdd6fa880919189b9c653c358a96ef-X",
    tx_ref: "IH_" + Date.now(),
    amount: 100,
    currency: "KES",
    payment_options: "card, mobilemoney",
    customer: {
      email: "patient@example.com",
      phone_number: "0700000000",
      name: "Benjamin Alfayo",
    },
    customizations: {
      title: "Interior Health App",
      description: "Drug Order Payment",
      logo: "https://yourdomain.com/logo.png",
    },
  };

  // Mpesa payment modal state
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);
    try {
      const res = await api.post("/payments/initiate-payment/", {
        phone,
        amount,
      });
      setFeedback(res.data.message || "STK push initiated. Check your phone to complete payment.");
    } catch (err: any) {
      setFeedback(err?.response?.data?.error || "Payment failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <AuthGate allowedRoles={["patient"]}>
      <div className="min-h-screen bg-blue-50 flex flex-col">
        <header className="bg-white shadow-md p-6">
          <h1 className="text-3xl font-bold text-blue-700">Patient Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Welcome to your health space, stay informed and in control.
          </p>
        </header>

        <main className="flex-1 p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* View Medications */}
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">🩺 View Medications</h2>
              <p className="text-gray-600">Browse available drugs and read their descriptions.</p>
              <a
                href="#"
                className="inline-block mt-4 text-blue-600 hover:underline font-medium"
              >
                Explore Medications →
              </a>
            </div>

            {/* Place Order - Add Payment Button Here */}
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">🛒 Place Order</h2>
              <p className="text-gray-600">Easily order the medicines you need from our inventory.</p>
              <button
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => setShowModal(true)}
              >
                Pay with Mpesa
              </button>
            </div>

            {/* Mpesa Payment Modal */}
            {showModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
                  <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowModal(false)}
                  >
                    &times;
                  </button>
                  <h3 className="text-xl font-bold mb-4 text-green-700">Mpesa Payment</h3>
                  <form onSubmit={handlePayment} className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        placeholder="e.g. 0700123456"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Amount (KES)</label>
                      <input
                        type="number"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        placeholder="e.g. 500"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "Pay Now"}
                    </button>
                  </form>
                  {feedback && (
                    <div className="mt-4 text-center text-sm text-blue-700">
                      {feedback}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Track Delivery */}
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">🚚 Track Delivery</h2>
              <p className="text-gray-600">Monitor the status and location of your current orders.</p>
              <a
                href="#"
                className="inline-block mt-4 text-blue-600 hover:underline font-medium"
              >
                Track Now →
              </a>
            </div>
          </div>

          {/* Health Tip */}
          <section className="mt-12 bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-2xl font-bold text-green-600 mb-2">💡 Health Tip</h3>
            <p className="text-gray-700">
              Stay hydrated, take your medication as prescribed, and don’t skip meals.
              A healthy routine is key to recovery.
            </p>
          </section>
        </main>
      </div>
    </AuthGate>
  );
}
