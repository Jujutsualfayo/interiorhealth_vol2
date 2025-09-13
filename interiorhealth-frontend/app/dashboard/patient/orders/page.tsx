export default function PatientOrdersPage() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-green-700 mb-6">My Orders</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Example order cards - replace with real data */}
        {[1,2,3].map(order => (
          <div key={order} className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-lg text-gray-800">Order #{1230 + order}</span>
              <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">Delivered</span>
            </div>
            <div className="text-gray-600 mb-2">Placed: 2025-09-0{order}</div>
            <div className="text-gray-800 font-bold mb-2">KES {500 * order}</div>
            <ul className="list-disc list-inside text-gray-700 text-sm mb-2">
              <li>Drug A x1</li>
              <li>Drug B x2</li>
            </ul>
            <button className="mt-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Track Delivery</button>
          </div>
        ))}
      </div>
    </div>
  );
}
