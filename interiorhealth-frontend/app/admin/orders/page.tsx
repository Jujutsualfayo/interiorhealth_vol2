'use client'

import { useEffect, useState } from 'react'
import axios from '@/lib/axios'

interface OrderItem {
  drug_name: string
  quantity: number
  price: string
}

interface Order {
  id: number
  patient_email: string
  status: string
  total_amount: string
  created_at: string
  items: OrderItem[]
}

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    try {
      const res = await axios.get('/api/orders/admin/all/')
      setOrders(res.data)
    } catch (err) {
      console.error('Error fetching orders', err)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (orderId: number, newStatus: string) => {
    try {
      await axios.put(`/api/orders/admin/${orderId}/update/`, { status: newStatus })
      fetchOrders() // refresh after update
    } catch (err) {
      console.error('Error updating order status', err)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  if (loading) return <p>Loading orders...</p>

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Order Management</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="border p-4 mb-4 rounded">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Patient:</strong> {order.patient_email}</p>
            <p><strong>Status:</strong>
              <select
                value={order.status}
                onChange={e => updateStatus(order.id, e.target.value)}
                className="ml-2 border px-2 py-1 rounded"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="delivered">Delivered</option>
              </select>
            </p>
            <p><strong>Ordered At:</strong> {new Date(order.created_at).toLocaleString()}</p>
            <p><strong>Total:</strong> KES {order.total_amount}</p>
            <ul className="mt-2">
              {order.items.map((item, i) => (
                <li key={i} className="text-sm">
                  {item.quantity} x {item.drug_name} @ KES {item.price}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  )
}

export default AdminOrdersPage
