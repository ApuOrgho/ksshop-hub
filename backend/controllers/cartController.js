import fs from "fs-extra";
import path from "path";

const CARTS_PATH = path.resolve("backend/storage/carts.json");
const ORDERS_PATH = path.resolve("backend/storage/orders.json");

export async function getCart(req, res) {
  const { user } = req.query;
  const carts = await fs.readJson(CARTS_PATH).catch(() => []);
  const cart = carts.find((c) => c.user === user) || { user, items: [] };
  res.json(cart);
}

export async function addToCart(req, res) {
  const { user, product, quantity } = req.body;
  let carts = await fs.readJson(CARTS_PATH).catch(() => []);
  let cart = carts.find((c) => c.user === user);
  if (!cart) {
    cart = { user, items: [] };
    carts.push(cart);
  }
  const idx = cart.items.findIndex((i) => i.product === product);
  if (idx > -1) cart.items[idx].quantity += quantity;
  else cart.items.push({ product, quantity });
  await fs.writeJson(CARTS_PATH, carts);
  res.json(cart);
}

export async function removeFromCart(req, res) {
  const { user } = req.body;
  const { productId } = req.params;
  let carts = await fs.readJson(CARTS_PATH).catch(() => []);
  let cart = carts.find((c) => c.user === user);
  if (cart) {
    cart.items = cart.items.filter((i) => i.product !== productId);
    await fs.writeJson(CARTS_PATH, carts);
  }
  res.json(cart || {});
}

export async function checkout(req, res) {
  const { user, items } = req.body;
  let orders = await fs.readJson(ORDERS_PATH).catch(() => []);
  orders.push({ user, items, date: new Date() });
  await fs.writeJson(ORDERS_PATH, orders);
  // Clear cart
  let carts = await fs.readJson(CARTS_PATH).catch(() => []);
  let cart = carts.find((c) => c.user === user);
  if (cart) cart.items = [];
  await fs.writeJson(CARTS_PATH, carts);
  res.json({ success: true });
}
