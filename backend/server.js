require("dotenv").config();
const express = require("express");
const cors = require("cors");
const agentRoutes = require("./routes/agent");
const { isLiveModeAvailable } = require("./services/claude");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    liveMode: isLiveModeAvailable(),
  });
});

app.use("/api/agent", agentRoutes);

// Fallback 404
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`DevAgent backend running on http://localhost:${PORT}`);
  console.log(`Live Claude API mode: ${isLiveModeAvailable() ? "ENABLED" : "DISABLED (mock/demo mode)"}`);
});
