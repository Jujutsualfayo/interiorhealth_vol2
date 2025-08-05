"use client";

import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
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

  const handleFlutterPayment = useFlutterwave(config);

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
                onClick={() =>
                  handleFlutterPayment({
                    callback: (response) => {
                      console.log("Payment response:", response);
                      closePaymentModal(); // closes the modal programmatically
                      alert("Payment complete! Transaction: " + response.transaction_id);
                    },
                    onClose: () => {
                      console.log("Payment closed.");
                    },
                  })
                }
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Pay Now →
              </button>
            </div>

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
