import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!user) return alert("Debes iniciar sesión");
    try {
      const orderData = {
        products: cart.map(item => ({ product: item.product._id, quantity: item.quantity })),
        totalPrice: total
      };
      await axios.post("https://sovm.onrender.com/api/orders", orderData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setCart([]);
      alert("Compra realizada con éxito");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error al procesar la orden");
    }
  };

  if (cart.length === 0) return <p>Tu carrito está vacío</p>;

  return (
    <div>
      <h2>Checkout</h2>
      {cart.map(item => (
        <div key={item.product._id}>
          <h3>{item.product.name}</h3>
          <p>Cantidad: {item.quantity}</p>
          <p>Subtotal: ${item.product.price * item.quantity}</p>
        </div>
      ))}
      <h3>Total: ${total}</h3>
      <button onClick={handleCheckout} style={{ marginTop: "20px" }}>Confirmar Compra</button>
    </div>
  );
}

export default Checkout;