# 🧮 Math Microservice – Microservice for Mathematical Operations

This project is a full-stack application consisting of a **FastAPI backend** and a **React frontend**, working together to provide a modern and functional interface for basic math operations:

- Exponentiation (power)
- Factorial
- Fibonacci sequence (n-th number)

The app features persistent history, input-based result caching, individual record deletion, and a clean responsive UI.

---

## 📦 Technologies Used

| Component   | Technologies |
|-------------|--------------|
| Backend     | Python 3.11, FastAPI, SQLAlchemy, SQLite, Pydantic |
| Frontend    | React, Vite, Axios |
| DevOps      | PEP8, flake8, Modular OOP |

---

## ✅ Core Features

- `POST /pow`: calculates x to the power of y
- `POST /factorial`: calculates factorial of a number
- `POST /fibonacci`: calculates the n-th Fibonacci number
- `GET /history`: retrieves all operations
- `DELETE /history/{id}`: deletes an operation
- Caching logic: previously submitted inputs return instantly from DB

---

## 🧪 LOCAL RUN (Manual, without Docker)

---

### ▶️ 1. Run Backend (FastAPI)

1. Open a terminal in the `backend/` directory
2. Create and activate a virtual environment:

```bash
python -m venv venv
venv\Scripts\activate        # on Windows
# or:
source venv/bin/activate      # on Linux/macOS
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Start the FastAPI server:

```bash
uvicorn main:app --reload
```

✔️ Open: http://localhost:8000/docs

---

### ▶️ 2. Run Frontend (React + Vite)

1. Open a second terminal in the `frontend/` directory

```bash
cd frontend
```

2. Install packages:

```bash
npm install
```

3. Start the React app:

```bash
npm run dev
```

✔️ Open: http://localhost:5173

---

## 🧱 Project Structure

```
math_microservice/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── requirements.txt
│   ├── routers/
│   │   └── math.py
│   ├── models/
│   │   ├── orm.py
│   │   └── schemas.py
│   └── services/
│       └── cache.py
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── components/MathCard.jsx
│   ├── vite.config.js
│   └── package.json
└── README.md


## ✅ Code Quality

- ✅ PEP8 compliant (`flake8`)
- ✅ Modular structure: `routers/`, `models/`, `services/`
- ✅ `async` functions and clean caching logic
- ✅ OOP: reusable `CacheService`
