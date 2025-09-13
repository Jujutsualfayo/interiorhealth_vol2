import React from "react";

export default function HealthTipsPage() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Health Tips</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>Drink plenty of water every day.</li>
        <li>Take your medication as prescribed.</li>
        <li>Eat balanced meals and avoid skipping.</li>
        <li>Get enough sleep and rest.</li>
        <li>Contact your health worker if you have any concerns.</li>
      </ul>
    </div>
  );
}
