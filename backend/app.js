import { fileURLToPath } from "url";
import path from "path";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import xss from "xss-clean";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
// import orderRoutes from "./routes/orders.js"; // Uncomment when implemented

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Security Middlewares
app.use(helmet()); // Set security headers
app.use(xss()); // Prevent XSS attacks
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || true,
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" })); // Limit JSON body size
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// Rate limiter
app.use(
  "/api/",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later.",
  })
);

// Static for profile photos
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
// app.use("/api/orders", orderRoutes); // Uncomment when implemented

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

export default app;
