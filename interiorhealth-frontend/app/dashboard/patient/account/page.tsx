export default function PatientAccountPage() {
  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-green-700 mb-6">My Account</h2>
      <form className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Full Name</label>
          <input type="text" className="w-full border rounded px-4 py-2" placeholder="Your Name" defaultValue="Benjamin Alfayo" />
        </div>
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Email Address</label>
          <input type="email" className="w-full border rounded px-4 py-2" placeholder="you@example.com" defaultValue="patient@example.com" />
        </div>
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Phone Number</label>
          <input type="text" className="w-full border rounded px-4 py-2" placeholder="0700000000" defaultValue="0700000000" />
        </div>
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Password</label>
          <input type="password" className="w-full border rounded px-4 py-2" placeholder="••••••••" />
        </div>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-bold">Update Profile</button>
      </form>
    </div>
  );
}
