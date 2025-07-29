import express from "express";
import {
  register,
  login,
  profile,
  logout,
  requireAuth,
} from "../controllers/authController.js";
import { validateRegister, validateLogin } from "../middlewares/validation.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post(
  "/register",
  upload.single("profilePhoto"),
  validateRegister,
  register
);
router.post("/login", validateLogin, login);
router.get("/profile", requireAuth, profile);
router.post("/logout", logout);

export default router;
