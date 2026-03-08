import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://sovm.onrender.com/api/users/register", { name, email, password });
      setUser(res.data);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Error desconocido");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} required />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Registrar</button>
    </form>
  );
}

export default Register;