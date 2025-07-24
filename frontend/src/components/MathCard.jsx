import { useState } from "react";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

export default function MathCard({ title, endpoint, fields, onSuccess }) {
  const [input, setInput] = useState({});
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`http://127.0.0.1:8000/${endpoint}`, input);
      setResult(res.data.result);
      if (onSuccess) onSuccess(); 
    } catch (err) {
      console.error(err);
      setResult("Eroare");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        padding: "20px",
        width: "100%",
        maxWidth: "300px",
        transition: "transform 0.2s ease-in-out",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <h3 style={{ marginBottom: "12px", fontSize: "1.2rem", color: "#111827", fontWeight: "600", textAlign: "center" }}>
        {title}
      </h3>

      {fields.map((f) => (
        <input
          key={f}
          name={f}
          placeholder={f}
          type="number"
          onChange={handleChange}
          style={{
            padding: "10px",
            marginBottom: "10px",
            width: "100%",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            fontSize: "1rem",
            color: "#111827",
            backgroundColor: "#ffffff",
          }}
        />
      ))}

      <button
        onClick={handleSubmit}
        style={{
          marginTop: "5px",
          width: "100%",
          padding: "10px",
          backgroundColor: "#111827",
          color: "#ffffff",
          border: "none",
          borderRadius: "8px",
          fontSize: "1rem",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Calculează
      </button>

      {result !== null && (
        <div
          style={{
            marginTop: "12px",
            fontSize: "1rem",
            color: "#111827",
            textAlign: "center",
            fontWeight: "500",
          }}
        >
          Rezultat: {result}
        </div>
      )}
    </div>
  );
}
