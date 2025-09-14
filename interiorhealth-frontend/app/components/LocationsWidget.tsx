import React from "react";

const LOCATIONS = ["Siaya", "Makueni", "Kakamega", "Nairobi", "Kisumu", "Nakuru"];

export default function LocationsWidget() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 text-green-700 dark:text-green-400">Available Locations</h2>
      <ul className="space-y-2">
        {LOCATIONS.map((loc) => (
          <li key={loc} className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
            <span className="inline-block w-3 h-3 bg-green-500 rounded-full" />
            <span className="font-semibold">{loc}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
