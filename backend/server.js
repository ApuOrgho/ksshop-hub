// Simple Express backend for user registration
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory user store (replace with DB in production)
const users = [];

app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }
  if (users.find((u) => u.email === email)) {
    return res.status(409).json({ error: "Email already registered." });
  }
  // Save user (no password hashing for demo)
  users.push({ name, email, password });
  res.json({ success: true, message: "User registered successfully." });
});

app.listen(5000, () => {
  console.log("Backend server running on http://localhost:5000");
});
app.get("/api/products", (req, res) => {
  res.json([
    { id: 1, name: "Sample Product 1", price: 100 },
    { id: 2, name: "Sample Product 2", price: 200 },
  ]);
});
