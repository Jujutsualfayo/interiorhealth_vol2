"use client";
import React, { useState } from "react";

const catalog = [
  {
    group: "Malaria",
    items: [
      { name: "Coartem", description: "Antimalarial tablet", price: 350 },
      { name: "Fansidar", description: "Antimalarial tablet", price: 300 },
      { name: "Quinine Injection", description: "Severe malaria treatment", price: 500 },
    ],
  },
  {
    group: "Pain Relief",
    items: [
      { name: "Panadol", description: "Paracetamol tablet", price: 50 },
      { name: "Brufen", description: "Ibuprofen tablet", price: 80 },
      { name: "Diclofenac", description: "Pain relief tablet", price: 100 },
    ],
  },
  {
    group: "Antibiotics",
    items: [
      { name: "Amoxil", description: "Amoxicillin capsule", price: 200 },
      { name: "Augmentin", description: "Broad spectrum antibiotic", price: 600 },
      { name: "Ciprofloxacin", description: "Antibiotic tablet", price: 250 },
    ],
  },
  {
    group: "Reproductive Health",
    items: [
      { name: "Femiplan", description: "Contraceptive pill", price: 150 },
      { name: "Depo Provera", description: "Contraceptive injection", price: 300 },
      { name: "Condoms", description: "Pack of 3", price: 50 },
    ],
  },
  {
    group: "Basic Amenities",
    items: [
      { name: "Soap", description: "Bar soap for hygiene", price: 80 },
      { name: "Sanitary Pads", description: "Pack of 8 pads", price: 120 },
      { name: "Toothpaste", description: "100g tube", price: 90 },
    ],
  },
];

export default function DrugsPage() {
  const [selectedGroup, setSelectedGroup] = useState(catalog[0].group);

  const currentItems = catalog.find((g) => g.group === selectedGroup)?.items || [];

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Order Medication & Products</h2>
      <div className="flex gap-4 mb-8 flex-wrap">
        {catalog.map((g) => (
          <button
            key={g.group}
            className={`px-4 py-2 rounded font-semibold border transition ${selectedGroup === g.group ? "bg-green-600 text-white" : "bg-white text-green-700 border-green-600"}`}
            onClick={() => setSelectedGroup(g.group)}
          >
            {g.group}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentItems.map((item) => (
          <div key={item.name} className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
            <div className="font-bold text-lg text-gray-800 mb-2">{item.name}</div>
            <div className="text-gray-600 mb-2">{item.description}</div>
            <div className="text-green-700 font-bold mb-4">KES {item.price}</div>
            <button className="mt-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-bold">Order</button>
          </div>
        ))}
      </div>
    </div>
  );
}
