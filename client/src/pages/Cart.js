import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function Cart() {
  const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleQuantityChange = (item, delta) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity <= 0) removeFromCart(item.product._id);
    else addToCart(item.product, delta);
  };

  const handleCheckout = async () => {
    if (!user) {
      alert("Iniciar sesión pa' pagar");
      return;
    }

    try {
      const orderProducts = cart.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      }));

      await axios.post(
        "http://localhost:5000/api/orders",
        { products: orderProducts, total },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      alert("Gracias por tu dinero, te amo");
      clearCart();
    } catch (err) {
      console.error(err);
      alert("Errol");
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Tu carrito está vacío 🛒</h2>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <h2>Mi Carrito</h2>
      {cart.map((item) => (
        <div key={item.product._id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #ccc", padding: "15px 0", gap: "10px" }}>
          <img src={item.product.image || "https://via.placeholder.com/80"} alt={item.product.name} style={{ width: "80px", height: "80px", objectFit: "cover" }} />
          <div style={{ flex: 1 }}>
            <h3>{item.product.name}</h3>
            <p>${item.product.price} x {item.quantity} = ${item.product.price * item.quantity}</p>
          </div>
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <button onClick={() => handleQuantityChange(item, -1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => handleQuantityChange(item, 1)}>+</button>
            <button onClick={() => removeFromCart(item.product._id)} style={{ color: "red" }}>Eliminar</button>
          </div>
        </div>
      ))}
      <h3 style={{ textAlign: "right", marginTop: "20px" }}>Total: ${total}</h3>
      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <button onClick={handleCheckout} style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Ir a pagar
        </button>
      </div>
    </div>
  );
}

export default Cart;