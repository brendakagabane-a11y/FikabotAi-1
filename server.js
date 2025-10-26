import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

// ✅ Allow frontend access from any origin (like GitHub Pages)
app.use(cors());
app.use(express.json());

// ✅ Root route for quick check
app.get("/", (req, res) => {
  res.send("✅ FikaBot AI Backend is running successfully!");
});

// ✅ AI endpoint that connects to Hugging Face API
app.post("/api/ask", async (req, res) => {
  const { text } = req.body;
  const HF_API_KEY = process.env.HF_API_KEY;

  if (!HF_API_KEY) {
    return res.status(500).json({ error: "Missing Hugging Face API key." });
  }

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/gpt2", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: text }),
    });

    // Check if Hugging Face responded correctly
    if (!response.ok) {
      const errText = await response.text();
      return res.status(500).json({ error: "AI API request failed", details: errText });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching from Hugging Face:", error);
    res.status(500).json({ error: "Server error. Try again later." });
  }
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 FikaBot backend running on port ${PORT}`));
