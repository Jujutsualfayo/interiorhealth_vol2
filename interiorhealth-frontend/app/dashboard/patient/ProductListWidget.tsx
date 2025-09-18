"use client";
import Link from "next/link";

const products = [
  { name: "Paracetamol Tablets", price: 200, type: "Medical" },
  { name: "Amoxicillin Capsules", price: 350, type: "Medical" },
  { name: "Insulin Injections", price: 1200, type: "Medical" },
  { name: "Blood Pressure Monitor", price: 2500, type: "Medical" },
  { name: "Asthma Inhaler", price: 800, type: "Medical" },
  { name: "Bandages & Dressings", price: 150, type: "Medical" },
  { name: "Thermometer", price: 400, type: "Medical" },
  { name: "Hand Sanitizer", price: 180, type: "Non-Medical" },
  { name: "Face Masks", price: 100, type: "Non-Medical" },
  { name: "Reusable Water Bottle", price: 600, type: "Non-Medical" },
  { name: "Vitamin Supplements", price: 900, type: "Non-Medical" },
  { name: "Personal Hygiene Kits", price: 700, type: "Non-Medical" },
  { name: "Healthy Snacks", price: 250, type: "Non-Medical" },
];

export default function ProductListWidget() {
  return (
    <Link href="/dashboard/patient/drugs">
      <div className="bg-green-900 rounded-2xl shadow-xl p-8 border border-green-950 w-full cursor-pointer hover:bg-green-800 transition">
        <span className="text-4xl mb-4 block text-center">💊</span>
        <div className="text-lg font-medium text-green-200 mb-2 text-center">Inventory</div>
        <p className="text-green-200 text-sm text-center mb-4">Click to view and order products</p>
      </div>
    </Link>
  );
}
