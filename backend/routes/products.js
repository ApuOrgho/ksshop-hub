import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();
const productsFile = path.join(__dirname, "../storage/products.json");

function getDefaultProducts() {
  return [
    {
      id: 1,
      name: "Men's Classic T-Shirt",
      category: "Men",
      price: 499,
      size: ["S", "M", "L", "XL"],
      image: "/uploads/mens-tshirt.jpg",
    },
    {
      id: 2,
      name: "Women's Summer Dress",
      category: "Women",
      price: 899,
      size: ["S", "M", "L"],
      image: "/uploads/womens-dress.jpg",
    },
    {
      id: 3,
      name: "Bluetooth Headphones",
      category: "Electronics",
      price: 1599,
      size: [],
      image: "/uploads/headphones.jpg",
    },
    {
      id: 4,
      name: "Men's Running Shoes",
      category: "Men",
      price: 1299,
      size: ["7", "8", "9", "10"],
      image: "/uploads/mens-shoes.jpg",
    },
    {
      id: 5,
      name: "Women's Handbag",
      category: "Women",
      price: 1199,
      size: [],
      image: "/uploads/handbag.jpg",
    },
  ];
}

function ensureValidProductsFile() {
  let products;
  try {
    const data = fs.readFileSync(productsFile, "utf8");
    products = JSON.parse(data);
    if (!Array.isArray(products) || products.length === 0) throw new Error();
  } catch {
    products = getDefaultProducts();
    fs.writeFileSync(productsFile, JSON.stringify(products, null, 2), "utf8");
  }
  return products;
}

router.get("/", (req, res) => {
  const products = ensureValidProductsFile();
  res.json({ products });
});

export default router;
