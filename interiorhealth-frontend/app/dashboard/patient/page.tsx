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
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="p-10">
          <h1 className="text-3xl font-bold text-green-700 mb-4">How can we help you today?</h1>
          <p className="text-gray-600 mb-8 text-lg">We're here to support your health. Please choose an option below:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Actionable Buttons */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
              <span className="text-4xl mb-4">🤒</span>
              <div className="text-lg font-semibold text-green-700 mb-2">I'm feeling unwell</div>
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-bold mb-2">Request Help</button>
              <p className="text-gray-500 text-sm">Get quick assistance from a health worker.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
              <span className="text-4xl mb-4">👨‍⚕️</span>
              <div className="text-lg font-semibold text-green-700 mb-2">Talk to a Doctor</div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-bold mb-2">Start Chat</button>
              <p className="text-gray-500 text-sm">Connect with a medical professional now.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
              <span className="text-4xl mb-4">💊</span>
              <div className="text-lg font-semibold text-green-700 mb-2">Order Medication</div>
              <a href="/dashboard/patient/drugs" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-bold mb-2">Order Now</a>
              <p className="text-gray-500 text-sm">Browse and order from our drug catalog.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
              <span className="text-4xl mb-4">💡</span>
              <div className="text-lg font-semibold text-green-700 mb-2">Health Tips</div>
              <a href="/dashboard/patient/health-tips" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-bold mb-2">View Tips</a>
              <p className="text-gray-500 text-sm">Get advice for a healthier lifestyle.</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-green-700 mb-4">Recent Activity</h2>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <ul className="text-gray-600 text-sm list-disc list-inside">
                <li>Order #1234 placed</li>
                <li>Payment of KES 500 successful</li>
                <li>Order #1233 delivered</li>
              </ul>
            </div>
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
        </div>
      </div>
    </AuthGate>
  );
}
