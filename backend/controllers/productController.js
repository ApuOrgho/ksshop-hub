import fs from "fs-extra";
import path from "path";

const PRODUCTS_PATH = path.resolve("backend/storage/products.json");

export async function getProducts(req, res) {
  const products = await fs.readJson(PRODUCTS_PATH).catch(() => []);
  res.json(products);
}

export async function getProduct(req, res) {
  const products = await fs.readJson(PRODUCTS_PATH).catch(() => []);
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: "Not found" });
  res.json(product);
}

export async function createProduct(req, res) {
  const products = await fs.readJson(PRODUCTS_PATH).catch(() => []);
  const product = { ...req.body, id: Date.now().toString() };
  products.push(product);
  await fs.writeJson(PRODUCTS_PATH, products);
  res.json(product);
}

export async function updateProduct(req, res) {
  const products = await fs.readJson(PRODUCTS_PATH).catch(() => []);
  const idx = products.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  products[idx] = { ...products[idx], ...req.body };
  await fs.writeJson(PRODUCTS_PATH, products);
  res.json(products[idx]);
}

export async function deleteProduct(req, res) {
  let products = await fs.readJson(PRODUCTS_PATH).catch(() => []);
  products = products.filter((p) => p.id !== req.params.id);
  await fs.writeJson(PRODUCTS_PATH, products);
  res.json({ success: true });
}

export async function getPopular(req, res) {
  const products = await fs.readJson(PRODUCTS_PATH).catch(() => []);
  res.json(products.filter((p) => p.popular));
}

export async function getRecent(req, res) {
  const products = await fs.readJson(PRODUCTS_PATH).catch(() => []);
  res.json(products.slice(-10));
}

export async function getUpcoming(req, res) {
  const products = await fs.readJson(PRODUCTS_PATH).catch(() => []);
  res.json(products.filter((p) => p.upcoming));
}

export async function searchProducts(req, res) {
  const { q, category } = req.query;
  let products = await fs.readJson(PRODUCTS_PATH).catch(() => []);
  if (q)
    products = products.filter((p) =>
      p.name.toLowerCase().includes(q.toLowerCase())
    );
  if (category) products = products.filter((p) => p.category === category);
  res.json(products);
}
