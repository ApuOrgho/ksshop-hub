// JWT middleware for protected routes
export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import fs from "fs-extra";
import sharp from "sharp";
import path from "path";

const USERS_PATH = path.resolve("backend/storage/users.json");
const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export async function register(req, res) {
  try {
    const { email, phone, fullName, password, address } = req.body;
    const users = await fs.readJson(USERS_PATH).catch(() => []);
    // Uniqueness already checked in validation middleware
    let profilePhoto = null;
    if (req.file) {
      const filename = `${Date.now()}_${req.file.originalname}`;
      const outPath = path.join("uploads", filename);
      await sharp(req.file.buffer)
        .resize(200, 200)
        .jpeg({ quality: 80 })
        .toFile(outPath);
      profilePhoto = `/uploads/${filename}`;
    }
    const hash = await bcrypt.hash(password, 10);
    const user = {
      id: Date.now(),
      email,
      phone,
      fullName,
      password: hash,
      address,
      profilePhoto,
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    await fs.writeJson(USERS_PATH, users, { spaces: 2 });
    res
      .status(201)
      .json({ success: true, user: { ...user, password: undefined } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function login(req, res) {
  try {
    const { emailOrPhone, password } = req.body;
    const users = await fs.readJson(USERS_PATH).catch(() => []);
    const user = users.find(
      (u) => u.email === emailOrPhone || u.phone === emailOrPhone
    );
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ success: true, token, user: { ...user, password: undefined } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function profile(req, res) {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: "No token" });
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json(decoded);
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}

export function logout(req, res) {
  // For stateless JWT, logout is handled on client by removing token
  res.json({ message: "Logged out" });
}
