import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { cart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleUserClick = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: "#fffb00",
      color: "white"
    }}>
      {/* Logo */}
      <Link to="/" style={{ textDecoration: "none", color: "white", fontWeight: "bold", fontSize: "20px" }}>
        Loop Market
      </Link>

      {/* Enlaces del lado derecho */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {/* Carrito */}
        <Link to="/cart" style={{ color: "white", textDecoration: "none", position: "relative" }}>
          Carrito 🛒
          {totalItems > 0 && (
            <span style={{
              position: "absolute",
              top: "-5px",
              right: "-10px",
              backgroundColor: "red",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: "12px",
            }}>{totalItems}</span>
          )}
        </Link>

        {/* Botón dinámico de usuario */}
        <button
          onClick={handleUserClick}
          style={{
            padding: "6px 12px",
            backgroundColor: "#28a745",
            border: "none",
            borderRadius: "5px",
            color: "white",
            cursor: "pointer"
          }}
        >
          {user ? user.name : "Identifícate"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;