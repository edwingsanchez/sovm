import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://sovm.onrender.com/api/users/login", { email, password });
      setUser(res.data);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Error desconocido");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          style={{ padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          Iniciar Sesión
        </button>
      </form>

      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <p>¿No tienes cuenta?</p>
        <Link
          to="/register"
          style={{ padding: "8px 15px", backgroundColor: "#28a745", color: "white", borderRadius: "5px", textDecoration: "none", display: "inline-block", marginTop: "5px" }}
        >
          Crear Cuenta
        </Link>
      </div>
    </div>
  );
}

export default Login;