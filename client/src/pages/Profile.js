import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const res = await axios.get("http://localhost:5000/api/orders", {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, [user]);

  
  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Debes iniciar sesión para ver tu perfil</h2>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Perfil de {user?.name || "Usuario"}</h2>
      <p><strong>Email:</strong> {user?.email}</p>
      <button
        onClick={logout}
        style={{ marginTop: "15px", padding: "10px 15px", backgroundColor: "red", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
      >
        Cerrar Sesión
      </button>

      <h3 style={{ marginTop: "30px" }}>Mis Órdenes</h3>
      {orders.length === 0 ? (
        <p>No tienes órdenes todavía.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order._id}>
              Orden #{order._id} - Total: ${order.total} - Productos: {order.products.map(p => `${p.product?.name || "Producto"} x${p.quantity}`).join(", ")}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Profile;