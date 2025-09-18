"use client";
import React from "react";

export default function DocumentationPage() {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded shadow-md border border-green-100">
      <h1 className="text-2xl font-bold text-green-700 mb-4">Kenyan Law & Compliance: Buying and Selling Medicines</h1>
      <p className="mb-4 text-gray-700">
        As a licensed provider, InteriorHealth strictly adheres to all Kenyan laws and regulations regarding the sale and distribution of medicines. We are committed to ensuring that our platform operates in full compliance with the Pharmacy and Poisons Act, the Kenya Medical Practitioners and Dentists Board, and all other relevant authorities.
      </p>
      <h2 className="text-xl font-semibold text-green-600 mb-2">Key Legal Points</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-700">
        <li>Only registered pharmacists and licensed facilities may dispense prescription medicines.</li>
        <li>All medicines sold must be approved by the Pharmacy and Poisons Board.</li>
        <li>Patient confidentiality and data protection are strictly enforced.</li>
        <li>Counterfeit and unregistered medicines are strictly prohibited.</li>
        <li>All transactions are logged and auditable for regulatory review.</li>
      </ul>
      <h2 className="text-xl font-semibold text-green-600 mb-2">Our Commitment</h2>
      <p className="mb-4 text-gray-700">
        InteriorHealth is dedicated to educating our clients and partners about safe, legal, and ethical practices in medicine distribution. We regularly update our compliance policies and provide training to our staff.
      </p>
      <h2 className="text-xl font-semibold text-green-600 mb-2">Learn More</h2>
      <p className="mb-2 text-gray-700">
        For more information, visit:
      </p>
      <ul className="list-disc pl-6 text-blue-700">
        <li><a href="https://pharmacyboardkenya.org/" target="_blank" rel="noopener noreferrer">Pharmacy and Poisons Board</a></li>
        <li><a href="https://www.kmpdc.go.ke/" target="_blank" rel="noopener noreferrer">Kenya Medical Practitioners and Dentists Board</a></li>
      </ul>
    </div>
  );
}
