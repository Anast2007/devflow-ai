# DevAgent – AI Software Developer

An agentic AI system that turns a natural-language software requirement into a full solution by
running it through four specialized agents:

```
Requirement → Planner → Developer → Reviewer → Tester → Final Solution
```

Built as a 3-hour MVP: React + Vite + Tailwind frontend, Node.js + Express backend, Claude API
for the AI agents, with a built-in demo/mock mode so it always works even without an API key.

---

## 1. Folder Structure

```
devagent/
├── backend/
│   ├── agents/
│   │   ├── planner.js      # Planner Agent: understanding, steps, approach, components
│   │   ├── developer.js    # Developer Agent: generates code + explanation + files
│   │   ├── reviewer.js     # Reviewer Agent: syntax/logic/edge cases/quality review
│   │   └── tester.js       # Tester Agent: generates test cases
│   ├── routes/
│   │   └── agent.js        # POST /api/agent/run — orchestrates the 4 agents in sequence
│   ├── services/
│   │   ├── claude.js       # Thin wrapper around the Anthropic SDK
│   │   └── mock.js         # Demo/mock responses used when the API is unavailable
│   ├── server.js           # Express app entry point
│   ├── package.json
│   ├── .env.example        # Sample environment configuration
│   └── (.env)              # You create this — see Configuration below
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx        # Left navigation (Dashboard / New Task / History / Settings)
│   │   │   ├── Dashboard.jsx      # Overview + stats + pipeline diagram
│   │   │   ├── NewTask.jsx        # Requirement form, examples, triggers the agent run
│   │   │   ├── AgentProgress.jsx  # Visual "Planning → Development → Review → Testing → Done"
│   │   │   ├── ResultView.jsx     # Tabbed Plan / Code / Review / Tests / Final Solution
│   │   │   ├── TaskHistory.jsx    # Past tasks (stored in localStorage)
│   │   │   └── Settings.jsx       # Connection + live/demo mode status
│   │   ├── api/agent.js    # fetch() calls to the backend
│   │   ├── App.jsx         # View routing + localStorage persistence
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js      # Includes a dev proxy: /api → http://localhost:5000
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
└── README.md
```

---

## 2. How the Agentic Workflow Works

A single request from the UI (`POST /api/agent/run`) runs all four agents **in sequence** on the
backend, each one a plain, independent JavaScript function:

1. **Planner Agent** (`agents/planner.js`) — reads the requirement + language, asks Claude for a
   Problem Understanding / Development Steps / Algorithm / Required Components plan.
2. **Developer Agent** (`agents/developer.js`) — takes the plan and generates the complete source
   code, an explanation, and a suggested file list.
3. **Reviewer Agent** (`agents/reviewer.js`) — takes the generated code and reviews it for syntax
   issues, logical errors, edge cases, code quality, and suggested improvements.
4. **Tester Agent** (`agents/tester.js`) — takes the code and generates test cases with input,
   expected output, and edge cases.

`routes/agent.js` calls these four functions one after another and assembles the final JSON
response (`plan`, `code`, `review`, `tests`, `finalSolution`).

**Demo / mock mode:** every agent function tries the real Claude API first
(`services/claude.js`). If the API key is missing, invalid, or the request fails for any reason,
that agent automatically falls back to a canned response from `services/mock.js`, and the response
includes `"demoMode": true`. This means the whole app — UI, progress states, tabs, history — can
always be demonstrated, live API or not.

On the frontend, `NewTask.jsx` fires one call to the backend and, in parallel, animates the
`AgentProgress` stepper (Planning → Development → Code Review → Testing → Completed) so the user
sees the pipeline "thinking" through each stage.

---

## 3. Installation

You need Node.js 18+ installed.

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

---

## 4. Running the Application

Open two terminals.

**Terminal 1 — backend (http://localhost:5000):**
```bash
cd backend
npm start
```

**Terminal 2 — frontend (http://localhost:5173):**
```bash
cd frontend
npm run dev
```

Then open **http://localhost:5173** in your browser. The Vite dev server proxies all `/api/*`
requests to the backend on port 5000 (see `frontend/vite.config.js`), so no CORS setup is needed
in development.

---

## 5. Configuring the Claude API

1. Copy the example environment file:
   ```bash
   cd backend
   cp .env.example .env
   ```
2. Open `backend/.env` and set your key:
   ```
   ANTHROPIC_API_KEY=sk-ant-...
   CLAUDE_MODEL=claude-sonnet-4-6
   PORT=5000
   FORCE_MOCK_MODE=false
   ```
3. Restart the backend (`npm start`).

**Notes:**
- If `ANTHROPIC_API_KEY` is left blank or invalid, DevAgent automatically runs in **demo/mock
  mode** — the UI works exactly the same, but responses are canned instead of AI-generated.
- Set `FORCE_MOCK_MODE=true` to force demo mode even with a valid key (useful for demos without
  burning API credits).
- The API key is never hardcoded and never sent to the frontend — it's only read server-side via
  `.env`.

---

## 6. Testing the Complete Workflow

1. Start both servers (see section 4).
2. Open the app and go to **New Task**.
3. Click one of the three example chips (e.g. "Second largest in array") to auto-fill the
   requirement and language, or type your own.
4. Click **Build Solution** and watch the progress bar move through Planning → Development →
   Code Review → Testing → Completed.
5. Review the result in the tabs: **Plan / Code / Review / Tests / Final Solution**.
6. Go to **Task History** — your task is saved (via `localStorage`) and can be reopened anytime.
7. Go to **Settings** to confirm whether you're in Live or Demo mode.
8. To specifically test the fallback path, leave `ANTHROPIC_API_KEY` blank (or set
   `FORCE_MOCK_MODE=true`) and re-run a task — you should see a "Demo mode" badge on the result
   and in the sidebar.

### Quick backend-only test (no browser)
```bash
curl -X POST http://localhost:5000/api/agent/run \
  -H "Content-Type: application/json" \
  -d '{"requirement":"Create a Java program to check whether a string is a palindrome.","language":"Java"}'
```

---

## Scope notes

This MVP intentionally excludes authentication, a database, Docker/Kubernetes, RAG/vector search,
voice, GitHub automation, and complex multi-agent frameworks, per the project brief. Task history
is stored in browser `localStorage` only.
