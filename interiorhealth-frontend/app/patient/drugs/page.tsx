'use client';

import { useEffect, useState } from 'react';

interface Drug {
  id: number;
  name: string;
  description: string;
  price: string;
}

interface OrderItem {
  drug: number;
  quantity: number;
}

export default function DrugsPage() {
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [quantities, setQuantities] = useState<{ [drugId: number]: number }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/drugs/', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setDrugs(data))
      .catch(() => setMessage('Failed to load drugs.'));
  }, []);

  const handleQuantityChange = (drugId: number, value: number) => {
    setQuantities((prev) => ({ ...prev, [drugId]: value }));
  };

  const handlePlaceOrder = async () => {
    const items: OrderItem[] = Object.entries(quantities)
      .filter(([, quantity]) => quantity > 0)
      .map(([drugId, quantity]) => ({
        drug: parseInt(drugId),
        quantity,
      }));

    if (items.length === 0) {
      setMessage('Please select at least one drug.');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const res = await fetch('/api/orders/create/', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      if (res.ok) {
        setMessage('Order placed successfully!');
        setQuantities({});
      } else {
        const error = await res.json();
        setMessage(error.detail || 'Order failed.');
      }
    } catch  {
      setMessage('An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Available Drugs</h1>
      {message && <p className="text-center text-sm text-red-500 mb-2">{message}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {drugs.map((drug) => (
          <div key={drug.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{drug.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{drug.description}</p>
            <p className="font-bold text-green-700 mb-2">KSh {drug.price}</p>

            <input
              type="number"
              min="0"
              value={quantities[drug.id] || 0}
              onChange={(e) => handleQuantityChange(drug.id, parseInt(e.target.value))}
              className="border rounded px-2 py-1 w-20"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={isSubmitting}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {isSubmitting ? 'Placing Order...' : 'Place Order'}
      </button>
    </div>
  );
}

