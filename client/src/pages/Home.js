// src/pages/Home.js
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";

function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error al obtener productos:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px", fontStyle: "italic" }}>Nuestros Productos</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px"
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ffffff",
              borderRadius: "8px",
              padding: "15px",
              fontStyle: "saens-serif",
              textAlign: "center",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                height: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <img
                src={product.image || "/img/productos/placeholder.png"}
                alt={product.name}
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  objectFit: "contain",
                  margin: "10px",
                }}
              />
            </div>

            <h3 style={{ margin: "10px 0" }}>{product.name}</h3>
            <p style={{ fontWeight: "bold", marginBottom: "10px" }}>${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              style={{
                padding: "10px",
                backgroundColor: "#FFCE12",
                color: "black",
                
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                fontStyle: "saens-serif",
              }}>
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;