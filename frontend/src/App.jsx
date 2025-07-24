import MathCard from "./components/MathCard";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState("");

  const loadHistory = () => {
    axios.get("http://127.0.0.1:8000/history").then((res) => setHistory(res.data));
  };

  const deleteEntry = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/history/${id}`);
    loadHistory();
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const filtered = history.filter((item) =>
    item.operation.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{
                   minHeight: "100vh",
                    width: "100%",
                    padding: "40px 20px",
                    display: "flex",
                    justifyContent: "center",   // centrează pe orizontală
                    alignItems: "flex-start",   // aliniere sus
                    backgroundColor: "#f9fafb",
                    boxSizing: "border-box",
                }}>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "30px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.05)",

        }}
      >
        <h1 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "30px", color: "#111827" }}>
          🧮 Math Microservice UI
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <MathCard title="Putere" endpoint="pow" fields={["x", "y"]} onSuccess={loadHistory} />
          <MathCard title="Factorial" endpoint="factorial" fields={["x"]} onSuccess={loadHistory} />
          <MathCard title="Fibonacci" endpoint="fibonacci" fields={["x"]} onSuccess={loadHistory}/>
        </div>

        <div
          style={{
            marginBottom: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <input
            type="text"
            placeholder="🔍 Caută operație..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "1rem",
              color: "#111827",
              backgroundColor: "#ffffff",
            }}
          />
        </div>

        <div style={{ overflowX: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: "#e5e7eb" }}>
              <tr>
                <th style={thStyle}>⏰ Timp</th>
                <th style={thStyle}>⚙️ Operație</th>
                <th style={thStyle}>📥 Input</th>
                <th style={thStyle}>📤 Rezultat</th>
                <th style={thStyle}>🗑️ Ștergere</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} style={{ textAlign: "center", backgroundColor: "#fff", color: "#111827" }}>
                  <td style={tdStyle}>{new Date(item.timestamp).toLocaleString()}</td>
                  <td style={tdStyle}>{item.operation}</td>
                  <td style={tdStyle}>{item.input_data}</td>
                  <td style={tdStyle}>{item.result}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => deleteEntry(item.id)}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#ef4444",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Șterge
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ padding: "12px", color: "#9ca3af", textAlign: "center" }}>
                    Nicio înregistrare găsită.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const thStyle = {
  padding: "12px",
  fontWeight: "bold",
  fontSize: "1rem",
  borderBottom: "1px solid #d1d5db",
  color: "#111827",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #e5e7eb",
};

export default App;
