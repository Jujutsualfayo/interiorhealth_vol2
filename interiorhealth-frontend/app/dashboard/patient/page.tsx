"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import AuthGate from "@/components/AuthGate";
import LocationsWidget from "../../components/LocationsWidget";
import TrackOrderWidget from "../../components/TrackOrderWidget";

export default function PatientDashboard() {
  // Illness categories (static for now)
  const illnessCategories = [
    "All",
    "Chronic",
    "Headache",
    "Diabetes",
    "Hypertension",
    "Asthma",
    "Mental Health",
    "Infectious Disease",
    "Pediatrics",
    "Dermatology",
    "Other"
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");
  // Doctor search/chat modal state
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [doctorSearch, setDoctorSearch] = useState("");
  const [doctorResults, setDoctorResults] = useState<import('@/app/lib/types').Doctor[]>([]);
  const [doctorLoading, setDoctorLoading] = useState<boolean>(false);
  const [doctorError, setDoctorError] = useState<string | null>(null);

  // Open modal when Find a Doctor is clicked
  const handleOpenDoctorModal = () => {
    setShowDoctorModal(true);
    setDoctorResults([]);
    setDoctorSearch("");
    setDoctorError(null);
  };

  // Search doctors API call
  const handleDoctorSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setDoctorLoading(true);
    setDoctorError(null);
    try {
      // Send both search text and category to API
      const params = new URLSearchParams();
      if (doctorSearch) params.append("q", doctorSearch);
      if (selectedCategory && selectedCategory !== "All") params.append("category", selectedCategory);
      const res = await api.get(`/doctors/search/?${params.toString()}`);
      setDoctorResults(res.data.results || []);
    } catch (err: any) {
      setDoctorError(err instanceof Error ? err.message : "Could not fetch doctors. Try again.");
    }
    setDoctorLoading(false);
  };

  // Start chat with doctor
  const handleStartChat = (doctorId: string) => {
    router.push(`/dashboard/chat/${doctorId}`);
    setShowDoctorModal(false);
  };
  const router = useRouter();
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

  // Request Help handler
  const [helpLoading, setHelpLoading] = useState(false);
  const [helpError, setHelpError] = useState<string | null>(null);

  const handleRequestHelp = async () => {
    setHelpLoading(true);
    setHelpError(null);
    try {
      const res = await api.post("/patients/request-help/");
      if (!res.data || !res.data.health_worker_id) {
        throw new Error("No health worker assigned. Please try again later.");
      }
      const hwId = res.data.health_worker_id;
      router.push(`/dashboard/healthworker/${hwId}`);
    } catch (err: any) {
      if (err?.response?.data?.error) {
        setHelpError(`Server error: ${err.response.data.error}`);
      } else if (err.message && err.message.includes('Network')) {
        setHelpError("Network error. Please check your connection.");
      } else {
        setHelpError(err.message || "Could not connect to a health worker. Try again.");
      }
    }
    setHelpLoading(false);
  };

  return (
    <AuthGate allowedRoles={["patient"]}>

      <div className="min-h-screen bg-gray-100 flex flex-col">
        <div className="p-8 md:p-12 lg:p-16">
          <h1 className="text-3xl font-semibold text-slate-800 mb-4">How can we help you today?</h1>
          <p className="text-slate-600 mb-8 text-lg">We're here to support your health. Please choose an option below:</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {/* Virtual Clinic Widget */}
            <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center md:col-span-2">
              <span className="text-5xl mb-4">🏥</span>
              <div className="text-xl font-medium text-slate-700 mb-2">Virtual Clinic</div>
              <button
                className="bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-slate-700 font-medium mb-2 text-lg transition"
                onClick={handleOpenDoctorModal}
              >
                Find a Doctor
              </button>
              <button
                className="bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 font-medium mb-2 text-base transition"
                onClick={handleRequestHelp}
                disabled={helpLoading}
              >
                {helpLoading ? "Connecting..." : "Request Help"}
              </button>
              {helpError && <p className="text-red-500 text-sm mt-2">{helpError}</p>}
              <p className="text-slate-500 text-base text-center mt-2">Search for a doctor, request help, or start a chat with a medical professional all in one place.</p>
            </div>
            {/* Inventory Widget */}
            <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center">
              <span className="text-4xl mb-4">🧪</span>
              <div className="text-lg font-medium text-slate-700 mb-2">Inventory</div>
              <a href="/dashboard/patient/drugs" className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 font-medium mb-2 transition">View Products</a>
              <p className="text-slate-500 text-sm text-center">Browse and order from our inventory: medical drugs, health supplies, and more.</p>
            </div>
            {/* Health Tips Widget */}
            <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center">
              <span className="text-4xl mb-4">💡</span>
              <div className="text-lg font-medium text-slate-700 mb-2">Health Tips</div>
              <a href="/dashboard/patient/health-tips" className="bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 font-medium mb-2 transition">View Tips</a>
              <p className="text-slate-500 text-sm text-center">Get advice for a healthier lifestyle.</p>
            </div>
          </div>


          {/* Locations Widget */}
          <LocationsWidget />

          {/* Track Order Widget */}
          <TrackOrderWidget />

          {/* Recent Activity */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Recent Activity</h2>
            <div className="bg-white rounded-2xl shadow-md p-6">
              <ul className="text-slate-600 text-sm list-disc list-inside">
                <li>Order #1234 placed</li>
                <li>Payment of KES 500 successful</li>
                <li>Order #1233 delivered</li>
              </ul>
            </div>
          </div>

          {/* Mpesa Payment Modal */}
          {/* Doctor Search/Chat Modal */}
          {showDoctorModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowDoctorModal(false)}
                >
                  &times;
                </button>
                <h3 className="text-xl font-bold mb-4 text-green-700">Find a Doctor</h3>
                <form onSubmit={handleDoctorSearch} className="flex flex-col md:flex-row gap-2 mb-4">
                  <input
                    type="text"
                    value={doctorSearch}
                    onChange={e => setDoctorSearch(e.target.value)}
                    className="border rounded px-3 py-2 w-full"
                    placeholder="Search by name, specialty..."
                  />
                  <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="border rounded px-3 py-2 w-full md:w-auto"
                  >
                    {illnessCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    disabled={doctorLoading}
                  >
                    {doctorLoading ? "Searching..." : "Search"}
                  </button>
                </form>
                {doctorError && <p className="text-red-500 text-sm mb-2">{doctorError}</p>}
                <div>
                  {doctorResults.length === 0 && !doctorLoading ? (
                    <p className="text-gray-500 text-sm">No doctors found. Try searching above.</p>
                  ) : (
                    <ul className="divide-y">
                      {doctorResults.map((doc: any) => (
                        <li key={doc.id} className="py-3 flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-green-700">{doc.name}</div>
                            <div className="text-gray-600 text-sm">{doc.specialty}</div>
                          </div>
                          <button
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm font-bold"
                            onClick={() => handleStartChat(doc.id)}
                          >
                            Start Chat
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}
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
