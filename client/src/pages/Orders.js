import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function Orders() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const res = await axios.get("http://localhost:5000/api/orders", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Error al obtener órdenes:", err);
      }
    };
    fetchOrders();
  }, [user]);

  if (!user) return <p>Debes iniciar sesión para ver tus órdenes.</p>;

  if (orders.length === 0) return <p>No tienes órdenes todavía.</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto", padding: "20px" }}>
      <h2>Mis Órdenes</h2>
      {orders.map((order) => (
        <div key={order._id} style={{ borderBottom: "1px solid #ccc", padding: "15px 0" }}>
          <p><strong>Orden ID:</strong> {order._id}</p>
          <p><strong>Total:</strong> ${order.total}</p>
          <p><strong>Productos:</strong></p>
          <ul>
            {order.products.map((p) => (
              <li key={p.product._id}>{p.product.name} x {p.quantity}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Orders;