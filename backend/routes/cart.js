import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  checkout,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/cart", getCart);
router.post("/cart", addToCart);
router.delete("/cart/:productId", removeFromCart);
router.post("/checkout", checkout);

export default router;
