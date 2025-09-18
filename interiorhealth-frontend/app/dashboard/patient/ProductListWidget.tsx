"use client";
import Link from "next/link";


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
