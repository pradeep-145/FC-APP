import React, { useEffect, useState } from 'react';
import AdminNav from './AdminNav';
import axios from 'axios';

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/history');
        if (response.data.success) {
          setOrderHistory(response.data.orders);
        }
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };
    fetchOrderHistory();
  }, []);

  return (
    <>
      <AdminNav />
      <div className="max-w-screen-md mx-auto px-4 pt-20">
        <h2 className="text-3xl font-bold text-center mb-6">Order History</h2>
        <div className="overflow-x-auto border-2 rounded-lg">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-left text-sm sm:text-base">
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Items</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Ordered At</th>
              </tr>
            </thead>
            <tbody>
              {orderHistory.map((order, index) => {
                const totalPrice = order.order.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                );
                return (
                  <tr
                    key={order.id}
                    className={`text-sm sm:text-base ${
                      index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                    }`}
                  >
                    <td className="px-4 py-2">{order.id}</td>
                    <td className="px-4 py-2">
                      <ul className="list-disc pl-5">
                        {order.order.map((item) => (
                          <li key={item.id}>
                            {item.name} x {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-2">₹{totalPrice}</td>
                    <td className="px-4 py-2">{new Date(order.createdAt).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OrderHistory;
