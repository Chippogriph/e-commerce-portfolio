import { db } from "../db/connection.js";

export function getAllProducts(req, res) {
  const today = new Date();

  try {
    const products = db.prepare("SELECT * FROM products").all();

    const productsWithIsNew = products.map((product) => {
      const publishedDate = new Date(product.publishedDate);
      const diffInDays = Math.floor(
        (today.getTime() - publishedDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      return {
        ...product,
        isNew: diffInDays <= 7,
      };
    });

    res.json(productsWithIsNew);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}

export const getProductBySlug = (req, res) => {
  const { slug } = req.params;

  try {
    const product = db
      .prepare("SELECT * FROM products WHERE slug = ?")
      .get(slug);
    if (!product)
      return res.status(404).json({ message: "Produkt hittades inte" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Serverfel", details: error.message });
  }
};

export const removeProduct = (req, res) => {
  const { id } = req.params;

  const product = db.prepare("SELECT * FROM products WHERE id = ?").get(id);
  if (!product) {
    return res.status(404).json({ error: "Produkt inte hittad" });
  }

  db.prepare("DELETE FROM products WHERE id = ?").run(id);
  const updatedProducts = db.prepare("SELECT * FROM products").all();
  res.json(updatedProducts);
};
