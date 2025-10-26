import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// Simple test route
app.get("/", (req, res) => {
  res.send("✅ AI Backend is running successfully!");
});

// AI endpoint
app.post("/api/ask", async (req, res) => {
  const { text } = req.body;
  const HF_API_KEY = process.env.HF_API_KEY;

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/gpt2", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: text }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch AI response" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
