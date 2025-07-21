'use client';

import { useEffect, useState } from 'react';

interface Drug {
  id: number;
  name: string;
  price: string;
}

interface OrderItem {
  drug: Drug;
  quantity: number;
}

interface Order {
  id: number;
  items: OrderItem[];
  created_at: string;
}

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/orders/my-orders/', { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch orders');
        return res.json();
      })
      .then((data) => setOrders(data))
      .catch(() => setError('Could not load orders.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && orders.length === 0 && <p>You have no orders yet.</p>}

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Order #{order.id}</h2>
            <p className="text-sm text-gray-500 mb-2">
              Placed on {new Date(order.created_at).toLocaleString()}
            </p>
            <ul className="pl-4 list-disc">
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.drug.name} – Quantity: {item.quantity} – Price: KSh {item.drug.price}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
