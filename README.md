# Aresei — React + Node.js Project

## Project Structure
```
aresei/
├── frontend/        ← React (Vite) — aresei.store + /arese route
├── backend/         ← Node.js + Express — Groq API proxy
├── vercel.json      ← Vercel deployment config
├── .gitignore       ← keeps .env and node_modules out of git
└── README.md
```

## Local Development

### 1. Install dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Set up environment variables
Create `backend/.env`:
```
GROQ_API_KEY=your_groq_key_here
PORT=3001
```

### 3. Run both servers
Terminal 1 — Backend:
```bash
cd backend
npm run dev
```

Terminal 2 — Frontend:
```bash
cd frontend
npm run dev
```

Frontend runs at http://localhost:5173
Backend runs at http://localhost:3001
Vite proxies `/api/*` → backend automatically.

## Deploy to Vercel

### 1. Push to GitHub (safe — .env is gitignored)
```bash
git add .
git commit -m "initial react + backend setup"
git push
```

### 2. Import to Vercel
- Go to vercel.com → New Project → Import your GitHub repo
- Set **Root Directory** to `/` (leave default)
- Add environment variable:
  - Name: `GROQ_API_KEY`
  - Value: `your_groq_key_here`

### 3. Deploy
Vercel auto-detects and builds both frontend and backend.

## Routes
- `/`       → Home (aresei.store main site)
- `/arese`  → Arese AI chatbot page
- `/api/chat` → Backend endpoint (Groq proxy)
- `/api/health` → Health check
