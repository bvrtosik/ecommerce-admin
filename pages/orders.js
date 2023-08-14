import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        axios.get('/api/orders').then(response => {
          setOrders(response.data);
        });
      }, []);
  return (
    <Layout>
      <h1>Zamówienia</h1>
      <table className="basic mt-2">
        <thead>
          <tr>
            <td>Zamówiono(data)</td>
            <td>Odbiorca</td>
            <td>Produkty</td>
            <td>Opłacono</td>
          </tr>
        </thead>
        <tbody>
            {orders.length > 0 && orders.map(order => (
                <tr>
                    <td>{order.createdAt.replace('T', ' ').substring(0,19)}</td>
                    <td>{order.name} <br /> {order.email} <br /> {order.city} {order.postCode} <br /> {order.street} {order.numberHome}</td>
                    <td>{order.line_items.map(l => (
                        <>
                        {l.price_data?.product_data.name} - {l.quantity} szt.<br />
                        </>
                    ))}</td>
                    <td className={order.paid ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{order.paid ? '✔️ Opłacone' : '❌ Nie opłacone'}</td>
                </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
